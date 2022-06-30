import React from 'react';
import Client from 'fhirclient/lib/Client';

//
// Manages the "fhirclient" instance.
// Use "useContext(FHIRClientContext)" in a component that is wrapped with FHIRClientContextWrapper to access it.
//

// Context interface...
export interface IFHIRClientContext {
    client: Client | null,
    setClient(client: Client | null): void;

    patientId: string | null;
    setPatientId(patientId: string | null): void;
}

// Define context...
export const defaultContext: IFHIRClientContext = {
    client: null,
    setClient(client: Client | null) { 
        console.log("setting client", client);
        this.client = client; 
    },

    patientId: null,
    setPatientId(patientId: string) { this.patientId = patientId; }
}

// Create the context...
export const FHIRClientContext = React.createContext(defaultContext);