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
    defaultElement: JSX.Element;
    onAuthenticated: (client: Client | null, code: string, clientId: string, state: string, accessToken: string) => void;
}

export const FHIRClientLauncher: React.FC<IFHIRClientLauncherProps> = (props) => {
    const smartAuth = useSmartOnFhirAuth();
    const fhirClientContext = useContext(FHIRClientContext);

    const clientId = props.authParams.clientId || "";
    const scope = "launch launch/patient patient.read patient.search observation.read observation.search";
    const state = "1234";
    const baseUrl = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4";
    const audUrl = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4";

    useEffect(() => {
        // If client is already initialized, just return...
        if (fhirClientContext.client) { return; }

        // Otherwise, try to authenticate user...
        smartAuth.authenticate(clientId, AuthSession.getRedirectUrl(), scope, state, baseUrl, audUrl).then((authData) => {
            if (!authData) { return; }

            const client = authData.client;
            if (!client) { return; }

            // Initialize...
            //console.log("Initializing client...");
            //fhirClientContext.setClient(client);
            //if (client.getPatientId()) { fhirClientContext.setPatientId(client.getPatientId()); }
            //else if (client.patient && client.patient.id) { fhirClientContext.setPatientId(client.patient.id); }

            // Notify that authentication occurred...
            props.onAuthenticated(client, authData.code, authData.clientId, authData.state, authData.accessToken);
        }).catch((error) => {
            console.error(error);
        });
    });

    return props.defaultElement;
}