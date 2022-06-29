import { useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as smart from "./../fhirclient-js/smart";
import NodeAdapter from "./../fhirclient-js/adapters/NodeAdapter";
import { fhirclient } from "./../fhirclient-js/types";
import Client from "./../fhirclient-js/Client";

// Get the endpoints from the given URL...
const getEndpoints = async function(baseUrl: string): Promise<fhirclient.OAuthSecurityExtensions> {
    return await smart.SmartUtil.getSecurityExtensions(baseUrl);
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
    const btoa = (s: string) => { return global.Buffer.from(s).toString("base64"); }
    const requestOptions = smart.SmartUtil.buildTokenRequest(btoa, code, redirectUrl, tokenEndpoint, clientId);

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

        // TODO:
        // Need to initialize and set "state" throughout the routine
        //Object.assign(state, extensions);
        //await storage.set(stateKey, state);

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


        // TODO: REMOVE THIS
        const client = new Client(env, clientState);
        client.patient.read().then((patient) => {
            //console.log(patient);
            console.log("Got patient"); 
        });

        client.patient.request("Immunization").then((immunizations) => {
            console.log("Got immunizations", immunizations);
        });

        client.request("Immunization?patient=" + client.patient.id).then((immunizations) => {
            console.log("Got immunizations (good one)");
        });

        
        //return new Client(env, clientState);

        return {
            client: new Client(env, clientState),
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

export class ReactNativeExpoAdapter extends NodeAdapter {
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
