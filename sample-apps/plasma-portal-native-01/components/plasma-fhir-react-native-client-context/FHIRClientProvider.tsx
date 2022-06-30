import React, { useState, useEffect } from "react";
import Client from "fhirclient/lib/Client";
import { FHIRClientContext, defaultContext } from "./FHIRClientContext";

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
                {(context) => {
                    return props.children;
                }}
            </FHIRClientContext.Consumer>
        </FHIRClientContext.Provider>
    );
}