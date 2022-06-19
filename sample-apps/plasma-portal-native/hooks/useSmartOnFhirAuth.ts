import { useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as smart from "fhirclient/lib/smart";
import NodeAdapter from "fhirclient/lib/adapters/NodeAdapter";
import { fhirclient } from "fhirclient/lib/types";
import Client from "fhirclient/lib/Client";
import FHIR from "fhirclient";

/**
 * Suggestions for PR:
 * 
 * 1. smart.ts

import { AbortController } from "abortcontroller-polyfill/dist/cjs-ponyfill";

// Modified (getSecurityExtensions)
export function getSecurityExtensions(env: fhirclient.Adapter, baseUrl = "/"): Promise<fhirclient.OAuthSecurityExtensions>
{
    const abortController = env.getAbortController();
    return getSecurityExtensionsNoAdapter(baseUrl, abortController);
}

export function getSecurityExtensionsNoAdapter(baseUrl = "/", abortController = AbortController): Promise<fhirclient.OAuthSecurityExtensions>
{
    const abortController1 = new abortController();
    const abortController2 = new abortController();

    return any([{
        controller: abortController1,
        promise: getSecurityExtensionsFromWellKnownJson(baseUrl, {
            signal: abortController1.signal
        })
    }, {
        controller: abortController2,
        promise: getSecurityExtensionsFromConformanceStatement(baseUrl, {
            signal: abortController2.signal
        })
    }]);
}



- Don't use "fetch" for the token response -- try to use the actual library


 */

// Get the endpoints from the given URL...
const getEndpoints = async function(baseUrl: string): Promise<fhirclient.OAuthSecurityExtensions> {
    // TODO: We are only using this for the AbortController
    const fhirAdapter = new ReactNativeExpoAdapter();
    return await smart.getSecurityExtensions(fhirAdapter, baseUrl);    
    
    // After changes...
    // return await smart.getSecurityExtensionsNoAdapter(baseUrl);
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
    // Use fhirclient function to build the token request options...
    const requestOptions = smart.buildTokenRequest(new ReactNativeExpoAdapter(), code, {
        redirectUri: redirectUrl,
        tokenUri: tokenEndpoint,
        clientId: clientId
    } as any);

    return await fetch(tokenEndpoint, requestOptions)
        .then(x => x.json());
}

export default function useSmartOnFhirAuth() {

    const authenticate = async function(clientId: string, redirectUrl: string, scope: string, state: string, baseUrl: string, audUrl: string): Promise<Client | null> {

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

        const env = new ReactNativeExpoAdapter();
        const clientState: fhirclient.ClientState = {
            serverUrl: baseUrl,
            clientId: clientId,
            redirectUri: redirectUrl,
            scope: scope,
            authorizeUri: authEndpoint,
            tokenUri: tokenEndpoint,
            tokenResponse: tokenResponse,
        };
        
        return new Client(env, clientState);
    }

  return { authenticate };
}

class ReactNativeExpoAdapter extends NodeAdapter {
    constructor() {
        super({ 
            request: null as any, 
            response: null as any,
        });
    }
}

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
