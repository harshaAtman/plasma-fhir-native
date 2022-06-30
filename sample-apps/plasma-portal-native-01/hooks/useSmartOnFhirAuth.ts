import { useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as smart from "fhirclient/lib/smart";
import { fhirclient } from "fhirclient/lib/types";
import Client from "fhirclient/lib/Client";
import { ReactNativeExpoAdapter } from "./ReactNativeExpoAdapter";

// Get the endpoints from the given URL...
const getEndpoints = async function(baseUrl: string): Promise<fhirclient.OAuthSecurityExtensions> {
    // All it uses is getAbortController, so don't worry about the adapter being empty...
    const env = new ReactNativeExpoAdapter("", {} as any);
    return await smart.getSecurityExtensions(env, baseUrl);
}

// Gets the authentication URL by appending all parameters to the query string...
const getAuthUrl = function(authEndpoint: string, clientId: string, redirectUrl: string, audUrl: string, state: string, scope: string): string {
    return `${authEndpoint}?` + 
    `client_id=${clientId}` + 
    `&redirect_uri=${redirectUrl}` + 
    `&aud=${audUrl}` + 
    `&state=${state}` + 
    `&response_type=code` + 
    `&scope=${encodeURIComponent(scope)}`;
}

// Gets an access token using the authorization code...
async function getAccessToken(tokenEndpoint: string, code: string, redirectUrl: string, clientId: string): Promise<AccessTokenRequestResponse> {
    // buildTokenRequest only uses btoa and these properties, so it's ok to pass like this...
    const state: fhirclient.ClientState = {
        redirectUri: redirectUrl,
        tokenUri: tokenEndpoint,
        clientId: clientId
    } as any;
    const env = new ReactNativeExpoAdapter("", state);

    const requestOptions = smart.buildTokenRequest(env, code, state);
    return await fetch(tokenEndpoint, requestOptions)
        .then(x => x.json());
}

export default function useSmartOnFhirAuth() {

    interface IOnAuthenticate {
        client: Client | null;
        code: string;
        clientId: string;
        redirectUrl: string;
        scope: string;
        state: string;
        accessToken: string;
    }

    const authenticate = async function(clientId: string, redirectUrl: string, scope: string, state: string, baseUrl: string, audUrl: string): Promise<IOnAuthenticate | null> {

        //
        // QUERY FOR "authentication_endpoint" AND "token_endpoint"...
        //
        const endPoints = await getEndpoints(baseUrl);
        const authEndpoint = endPoints.authorizeUri;
        const tokenEndpoint = endPoints.tokenUri;

        //
        // CONSTRUCT THE AUTH URL
        //
        //const expoRedirectUrl = AuthSession.getRedirectUrl();   //  "https://auth.expo.io/@username/{slug}";
        const authUrl = getAuthUrl(authEndpoint, clientId, redirectUrl, audUrl, state, scope);

        //
        // USE AuthSession TO AUTHENTICATE USER...
        //
        const authResult = await AuthSession.startAsync({ authUrl: authUrl });

        //
        // IF NOT SUCCESSFUL (E.G. ERROR OR CANCEL), EXIT...
        //
        if (authResult.type !== "success") {
            if (authResult.type === "error") { 
                console.error(authResult.params.error); 
            }
            return null;
        }

        //
        // QUERY FOR ACCESS TOKEN...
        //
        const tokenResponse: AccessTokenRequestResponse = await getAccessToken(tokenEndpoint, authResult.params.code, redirectUrl, clientId);

        //
        // IF FAILURE, EXIT...
        //
        if (tokenResponse.error) {
            console.error(tokenResponse.error, tokenResponse.error_description);
            return null;
        }

        //
        // BUILD CLIENT STATE (since we aren't calling authorize())...
        //
        const clientState: fhirclient.ClientState = {
            serverUrl: baseUrl,
            clientId: clientId,
            redirectUri: redirectUrl,
            scope: scope,
            authorizeUri: authEndpoint,
            tokenUri: tokenEndpoint,
            tokenResponse: tokenResponse,
            completeInTarget: true        // This is needed to prevent crashes or a pending promise
        };
        
        /**
         * NOTE:
         * We aren't calling the authorize() method because that's handled by AuthSession.
         * However, the authorize() function does quite a few things, including setting the "state" in the storage.
         */
         const env = new ReactNativeExpoAdapter(authResult.url, clientState);
         const smart = env.getSmartApi();
         const client = await smart.ready();

        return {
            client: client,
            code: authResult.params.code,
            clientId: clientId,
            redirectUrl: redirectUrl,
            scope: scope,
            state: state,
            accessToken: tokenResponse.access_token,
        }
    }

  return { authenticate };
}

// This is the response we will get back from fetching the token...
interface AccessTokenRequestResponse extends fhirclient.TokenResponse {
    // Properties defined by spec...
    access_token: string;
    token_type: "Bearer";
    expires_in: number;
    scope: string;
    patient: string;
    state: string;

    id_token?: string;          // Not present on Epic
    refresh_token?: string;     // Not present on Epic
    "__epic.dstu2.patient"?: string;

    // Error-only properties...
    error?: string;
    error_description?: string;
};