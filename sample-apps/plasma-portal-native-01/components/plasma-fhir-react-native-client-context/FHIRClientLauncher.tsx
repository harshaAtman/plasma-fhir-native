import React, { useEffect, useContext } from "react";
import * as AuthSession from 'expo-auth-session';
import useSmartOnFhirAuth from "../../hooks/useSmartOnFhirAuth";
import { fhirclient } from "fhirclient/lib/types";
import Client from "fhirclient/lib/Client";
import { FHIRClientContext } from "./FHIRClientContext";

//
// Launches a FHIR app with oauth2.
//

export interface IFHIRClientLauncherProps {
    authParams: fhirclient.AuthorizeParams;
    state: string;
    defaultElement: JSX.Element;
    onAuthenticated: (client: Client | null) => void;
    onCancelOrError: () => void;
}

export const FHIRClientLauncher: React.FC<IFHIRClientLauncherProps> = (props) => {
    const smartAuth = useSmartOnFhirAuth();
    const fhirClientContext = useContext(FHIRClientContext);

    useEffect(() => {
        // If client is already initialized, just return...
        if (fhirClientContext.client) { return; }

        // Get data necesary to perform the authentication...
        const state = props.state;
        const redirectUrl = AuthSession.getRedirectUrl();

        // Otherwise, try to authenticate user...
        smartAuth.authenticate(props.authParams, redirectUrl, state).then((authData) => {
            if (!authData || !authData.client) { 
                props.onCancelOrError();
                return; 
            }

            // Notify that authentication occurred...
            props.onAuthenticated(authData.client);
        }).catch((error) => {
            console.error(error);
        });
    });

    return props.defaultElement;
}