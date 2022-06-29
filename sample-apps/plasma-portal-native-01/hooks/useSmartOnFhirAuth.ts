import { useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as smart from "../fhirclient-js/smart";
//import NodeAdapter from "../fhirclient-js/adapters/NodeAdapter";
//import { fhirclient } from "../fhirclient-js/types";
//import Client from "../fhirclient-js/Client";
//import { oauth2 } from "fhirclient";
import { ready, authorize, init } from "../fhirclient-js/smart";

//import * as smart from "fhirclient/lib/smart";
import NodeAdapter from "fhirclient/lib/adapters/NodeAdapter";
import { fhirclient } from "fhirclient/lib/types";
import Client from "fhirclient/lib/Client";
//import { ready, authorize, init } from "fhirclient/lib/smart";

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

        /*
        // ERM: TODO:
         
        oauth2.ready() calls completeAuth() and gives the adapter ("env")
        "env" is our adapter.
        "state" is retrieved from env.getStorage().get(key).
        Then "state" is slightly modified inside completeAuth().


        Issues with calling oauth2.ready():
            - Can't find variable: location

        Other issues:
            Calling "authorize" sets the "state" in the adapter.storage (and a bunch of other stuff)
            We then retrieve this state in ready() and fail if it's not there.
            I don't call authorize() because Expo is handling that for me.
            Therefore, my state is never actually set
        */

        const clientState: fhirclient.ClientState = {
            serverUrl: baseUrl,
            clientId: clientId,
            redirectUri: redirectUrl,
            scope: scope,
            authorizeUri: authEndpoint,
            tokenUri: tokenEndpoint,
            tokenResponse: tokenResponse,

            completeInTarget: true
        };
        const env = new ReactNativeExpoAdapter(authResult.url, clientState);
        

        /*
        // ERM: TESTING 01...
        // Testing calling "ready" like the browser version
        console.log("useSmartOnFhirAuth :: Attempting to call ready()");
        oauth2.ready().then(async (client) => {
            console.log("useSmartOnFhirAuth :: ready() returned");
        }).catch((error) => { 
            console.log("Error in oauth2.ready()", error);
            console.trace()
        });
        */

        /* 
        // ERM: TESTING 02...
        // Testing using my own adapter and calling ready on that
        // This is pretty close, but I want to try init
        console.log("useSmartOnFhirAuth :: Attempting to call ready()");
        const myAdapter = new ReactNativeExpoAdapter(authResult.url, clientState);
        const mySmart = myAdapter.getSmartApi();
        mySmart.ready().then(async (client) => {
            console.log("useSmartOnFhirAuth :: ready() returned");
            //console.log(client);
            console.log("---");
        }).catch((error) => { 
            console.log("Error in oauth2.ready()", error);
            console.trace();
        });
        /* */
        

        // ERM: TESTING 03
        console.log("useSmartOnFhirAuth :: Attempting to call ready()");
        const myAdapter = new ReactNativeExpoAdapter(authResult.url, clientState);
        const mySmart = myAdapter.getSmartApi();
        const myClient = await mySmart.ready();
        
        console.log("useSmartOnFhirAuth :: ready() returned");
        console.log(myClient);
        console.log("---");
        



        // TODO: ERM: REMOVE THIS
        const client = new Client(env, clientState);
        /*
        client.patient.read().then((patient) => {
            //console.log(patient);
            //console.log("Got patient"); 
        });

        client.patient.request("Immunization").then((immunizations) => {
            console.log("Got immunizations", immunizations);
        });

        client.request("Immunization?patient=" + client.patient.id).then((immunizations) => {
            console.log("Got immunizations (good one)");
        });
        */


        console.log("useSmartOnFhirAuth :: Almost done");

        
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


export class ReactNativeExpoStorage implements fhirclient.Storage {
    private data: Map<string, any>;

    constructor() {
        this.data = new Map<string, any>();
    }

    public set(key: string, value: any): Promise<any>
    {
        this.data.set(key, value);
        return Promise.resolve(value);
    }

    public get(key: string): Promise<any> {
        return Promise.resolve(this.data.get(key));
    }

    public unset(key: string): Promise<boolean> {
        this.data.delete(key);
        return Promise.resolve(true);
    }
}

export class ReactNativeExpoAdapter implements fhirclient.Adapter {
    public options: fhirclient.BrowserFHIRSettings;
    private url: string;
    private clientState: fhirclient.ClientState;
    private storage: ReactNativeExpoStorage;

    /**
     * @param url The URL returned from the Expo AuthSession
     */
    constructor(url: string, clientState: fhirclient.ClientState) {
        this.options = { replaceBrowserHistory: false, fullSessionStorageSupport: false };
        this.url = url;
        this.clientState = clientState;
        this.storage = new ReactNativeExpoStorage();

        // "authorize" sets stroage.get("SMART_KEY") to a random string.
        // This then gets pulled in the "ready" function and will crash if not there.
        // But we aren't calling authorize because Expo is handling that for us.
        // So just set this so it won't crash.
        const objUrl = this.getUrl();
        const key = objUrl.searchParams.get("state") || "";
        this.storage.set("SMART_KEY", key);
        this.storage.set(key, clientState);

        // Define parent.postMessage so it won't crash...
        if (global.parent === undefined) {
            global.parent = {
                postMessage: () => {} 
            } as any;
        }
    }

    getUrl(): URL {
        return new URL(this.url);
    }

    redirect(to: string): void | Promise<any> {
        // Redirection is handled by Expo's AuthSession...
    }
    
    // ERM: TODO: Copy the comments for each function from NodeAdapter please
    getStorage(): fhirclient.Storage {
        return this.storage;
    }

    relative(path: string): string {
        throw new Error("relative: Method not implemented.");
    }

    btoa(str: string): string {
        const nodeAdapter = new NodeAdapter({ 
            request: null as any,
            response: null as any,
        });
        return nodeAdapter.btoa(str);
    }

    atob(str: string): string {
        const nodeAdapter = new NodeAdapter({ 
            request: null as any,
            response: null as any,
        });
        return nodeAdapter.atob(str);
    }

    getAbortController(): { new(): AbortController; prototype: AbortController; } {
        throw new Error("getAbortController: Method not implemented.");
    }

    getSmartApi(): fhirclient.SMART {
        return {
            ready    : (...args: any[]) => ready(this, ...args),
            authorize: options => authorize(this, options),
            init     : options => init(this, options),
            client   : (state: string | fhirclient.ClientState) => new Client(this, state),
            options  : this.options
        };
    }
}