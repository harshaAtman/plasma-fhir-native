import React, { useState } from "react";
import { oauth2 } from "fhirclient";
import Client from "fhirclient/lib/Client";
import { FHIRClientContext } from "./FHIRClientContext";

export interface IFHIRClientProviderProps { 
    renderError?: (errorMessage: any) => JSX.Element;      // If you want to display an error, provide a function to render it
    children?: React.ReactNode;
}

export const FHIRClientProvider: React.FC<IFHIRClientProviderProps> = (props) => {
    const [error, setError] = useState<any>(null);
    const [client, setClient] = useState<Client | null>(null);
    const [patientId, setPatientId] = useState<string | null>(null);

    // If there is an error, just return that...
    if (error) { 
        console.error(error);
        return (props.renderError) 
            ? props.renderError(error.message)
            : null;
    }

    // Return context...
    return (
        <FHIRClientContext.Provider
            value={{
                client: client,
                setClient: setClient,
                patientId: patientId,
                setPatientId: setPatientId
            }}
        >
            <FHIRClientContext.Consumer>
                {({ client }) => {
                    // If client is initialized, return the children (element wrapped by FHIRClientContextWrapper)...
                    if (client) { return props.children; }

                    // Otherwise, try to initialize it...
                    oauth2.ready().then((client: Client) => {
                        setClient(client);
                        if (client.getPatientId()) { setPatientId(client.getPatientId()); }
                        else if (client.patient && client.patient.id) { setPatientId(client.patient.id); }
                    }).catch((error) => { setError(error); });
                }}                
            </FHIRClientContext.Consumer>
        </FHIRClientContext.Provider>
    );
}