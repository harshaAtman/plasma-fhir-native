import { useContext, useEffect, useState } from 'react';
import { FHIRr4 } from "plasma-fhir-react-components";

import { FHIRClientContext } from "plasma-fhir-react-client-context";
import { Patient } from 'fhir/r4';
import { Card } from "@mantine/core";
import { FHIRClientHelper } from "plasma-fhir-app-utils";

interface IPatientScreenProps { };
function PatientScreen(props: IPatientScreenProps) {
    const context = useContext(FHIRClientContext);    
    const [patientData, setPatientData] = useState<Patient | undefined>(undefined);
    const [isPatientDataLoaded, setIsPatientDataLoaded] = useState<boolean>(false);

    // Load patient data...
    useEffect(() => {
        // If we already loaded, exit...
        if (isPatientDataLoaded) { return; }

        // Get FHIR client...
        const fhirClient = context.client;
        if (!fhirClient) { return; }

        // Read patient resource...
        fhirClient.patient.read().then((value: Patient) => {
            console.log("patient", value);
            setIsPatientDataLoaded(true);
            setPatientData(value);
        });

        // Load Observations::Smoking Status...
        FHIRClientHelper.getSmokingStatus(fhirClient).then((value: any) => {
            console.log("Observations::SmokingStatus", value);
            if (!value) { return; }
        });

    }, [isPatientDataLoaded]);

    return (
        <div className="p-5">
            {/* Loading Spinner */}
            {!isPatientDataLoaded ? 
            <div style={{ position: "absolute", paddingTop: "20px", left: "50%"}}>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black inline" viewBox="0 0 24 24">
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div> : null}

            <h1 className="text-2xl font-bold pb-5">Patient Summary</h1>

            {/* Patient Header */}
            {isPatientDataLoaded ? 
            <div className="g-4">
                <Card>
                    <FHIRr4.PatientHeader patient={patientData} />
                </Card>
            </div> : null}

        </div>
    )
}

export default PatientScreen;