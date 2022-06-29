import React, { useState } from "react";
import { FHIRClientContext, defaultContext } from "./FHIRClientContext";

export interface IFHIRClientProviderProps { 
    renderError?: (errorMessage: any) => JSX.Element;      // If you want to display an error, provide a function to render it
    children?: React.ReactNode;
}

export const FHIRClientProvider: React.FC<IFHIRClientProviderProps> = (props) => {
    // Return context...
    return (
        <FHIRClientContext.Provider value={defaultContext}>
            {props.children}
        </FHIRClientContext.Provider>
    );
}