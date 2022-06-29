import React, { useContext } from 'react';
import { FHIRr4 } from "plasma-fhir-react-components";

import { FHIRClientHelper, FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";
import { FHIRClientContext } from "plasma-fhir-react-client-context";
import { Card } from "@mantine/core";
import useDataLoadScreen from "./../../hooks/useDataLoadScreen";

export default function ImmunizationScreen() {
    const context = useContext(FHIRClientContext);
    const { 
        data: immunizationData, isDataLoaded, hasErrorLoading, errorMessage,
        elLoadingSpinner, elErrorMessage
    } = useDataLoadScreen<PlasmaFHIR.Immunization>({
        context: context,
        getData: FHIRClientHelper.getImmunizations
    });

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold pb-5">Immunizations</h1>

            {/* Error Message */}
            {elErrorMessage}

            {/* Loading Spinner */}
            {elLoadingSpinner}

            {/* Immunizations */}
            {isDataLoaded && !hasErrorLoading ? 
            <div className="g-4">
                {
                    immunizationData.map((immunization, idx) => { 
                        return (
                            <Card style={{ marginTop: "10px" }} key={`ImmunizationCard_${idx}`} shadow="sm" className="border">
                                <FHIRr4.ImmunizationView immunization={immunization} />
                            </Card>
                        );
                    })
                }
            </div> : null}
        </div>
    );
}