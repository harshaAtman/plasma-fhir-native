import { useContext, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from "react-native";
import { FHIRr4 } from '../../components/plasma-fhir-react-native-components';
import { FHIRClientContext } from "../../components/plasma-fhir-react-native-client-context";
import { Patient } from 'fhir/r4';
import { FHIRClientHelper, FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";

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
            //console.log("patient", value);
            setIsPatientDataLoaded(true);
            setPatientData(value);
        });

        // Load vitals...
        FHIRClientHelper.getVitals(fhirClient).then((value: PlasmaFHIR.Observation[]) => {
            console.log("vitals", value);
        });

    }, [isPatientDataLoaded]);

    return (
        <View style={{ padding: 5 }}>
            {/* Loading Spinner */}
            {!isPatientDataLoaded ? 
            <View style={{ position: "absolute", paddingTop: 20, left: "50%"}}>
                <ActivityIndicator />
            </View> : null}

            <Text style={{ paddingBottom: 5, fontWeight: "bold", fontSize: 24 }}>Patient Summary</Text>

            {/* Patient Header */}
            {isPatientDataLoaded ? 
            <View>
                <View>
                    <FHIRr4.PatientHeader patient={patientData} />
                </View>
            </View> : null}

            <Text style={{ paddingTop: 20 }}>Vitals have been loaded (check console)</Text>

        </View>
    )
}

export default PatientScreen;