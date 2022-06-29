import React from "react";
import { FHIRClientProvider } from "./FHIRClientProvider";

//
// Wrap a component with FHIRClientContextWrapper to give it access to the "fhirclient" instance.
//

export interface IFHIRClientContextWrapperProps { 
    renderError?: (errorMessage: any) => JSX.Element;      // If you want to display an error, provide a function to render it
}
export const FHIRClientContextWrapper: React.FC<IFHIRClientContextWrapperProps> = (props) => {
    return (
        <FHIRClientProvider renderError={props.renderError}>
            {props.children}
        </FHIRClientProvider>
    );
}