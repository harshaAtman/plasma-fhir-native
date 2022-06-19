import React, { useEffect } from "react";
import * as AuthSession from 'expo-auth-session';
import FHIR from "fhirclient";
import { fhirclient } from "fhirclient/lib/types";
import { useSmartOnFhirAuth } from '../hooks';
import Client from "fhirclient/lib/Client";

//
// Launches a FHIR app with oauth2.
//

export interface IFHIRClientLauncherProps {
    authParams: fhirclient.AuthorizeParams;
    defaultElement: JSX.Element;
    onAuthenticated: (client: Client | null) => void;
}

export const FHIRClientLauncher: React.FC<IFHIRClientLauncherProps> = (props) => {
    const smartAuth = useSmartOnFhirAuth();

    const clientId = props.authParams.clientId || "";
    const scope = "launch launch/patient patient.read patient.search observation.read observation.search";
    const state = "1234";
    const baseUrl = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4";
    const audUrl = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4";

    useEffect(() => {
        smartAuth.authenticate(clientId, AuthSession.getRedirectUrl(), scope, state, baseUrl, audUrl).then((client: Client | null) => {
            // This should redirect or something I guess (?)
            console.log("Authenticated");
            console.log(client)

            // QUERY FOR PATIENT DATA...
            if (client && client.patient.id) {
                client.patient.read().then((patientData: any) => {
                    console.log("Patient Data", patientData);
                });
            }


            props.onAuthenticated(client);
        });


        /*
        const fhirClient = await smartAuth.authenticate(config.clientId, 
            AuthSession.getRedirectUrl(),
            "launch launch/patient patient.read patient.search observation.read observation.search",
            "1234",
            BASE_URL,
            BASE_URL);
        */


        //FHIR.oauth2.authorize(props.authParams);
    });

    return props.defaultElement;
}