import { fhirclient } from "fhirclient/lib/types";
import Client from "fhirclient/lib/Client";
import { ready, authorize, init } from "fhirclient/lib/smart";
import { SMART_KEY } from "fhirclient/lib/settings";
import { AbortController } from "fhirclient";

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

/**
 * Adapter to use fhirclient with React Native / Expo AuthSession.
 */
export class ReactNativeExpoAdapter implements fhirclient.Adapter {
    public options: fhirclient.BrowserFHIRSettings;
    private url: string;
    private storage: ReactNativeExpoStorage;

    /**
     * @param url The URL returned from the Expo AuthSession
     */
    constructor(url: string, clientState: fhirclient.ClientState) {
        this.options = { replaceBrowserHistory: false, fullSessionStorageSupport: false };
        this.url = url;
        this.storage = new ReactNativeExpoStorage();

        // "authorize" sets stroage.get(SMART_KEY) to a random string.
        // This then gets pulled in the "ready" function and will crash if not there.
        // But we aren't calling authorize because Expo is handling that for us.
        // So just set this so it won't crash.
        if (url) {
            const objUrl = this.getUrl();
            const key = objUrl.searchParams.get("state") || "";
            this.storage.set(SMART_KEY, key);
            this.storage.set(key, clientState);
        }
    }

    getUrl(): URL {
        return new URL(this.url);
    }

    redirect(to: string): void | Promise<any> {
        // Redirection is handled by Expo's AuthSession...
    }
    
    getStorage(): fhirclient.Storage {
        return this.storage;
    }

    relative(path: string): string {
        // Not needed
        throw new Error("relative: Method not implemented.");
    }

    btoa(str: string): string {
        return global.Buffer.from(str).toString("base64");
    }

    atob(str: string): string {
        return global.Buffer.from(str, "base64").toString("ascii");
    }

    getAbortController(): { new(): AbortController; prototype: AbortController; } {
        return AbortController;
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