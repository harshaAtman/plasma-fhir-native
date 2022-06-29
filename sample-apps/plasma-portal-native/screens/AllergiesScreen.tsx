import { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FHIRClientHelper, FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";
import { RootStackParamList } from '../types';
import { FHIRClientContext } from "../components/FHIRClientContext";
import { useDataLoadScreen } from "../hooks";

export default function AllergiesScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'AllergiesScreen'>) {
    const fhirClientContext = useContext(FHIRClientContext);  

    /*
    const { 
        data: allergyIntolerance, isDataLoaded, hasErrorLoading, errorMessage,
        elLoadingSpinner, elErrorMessage
    } = useDataLoadScreen<PlasmaFHIR.AllergyIntolerance>({
        context: fhirClientContext,
        getData: FHIRClientHelper.getAllergyIntolerance
    });
    */

    useEffect(() => {
        if (!fhirClientContext.client) { return; }


        const accessToken = fhirClientContext.client.getState("tokenResponse.access_token");
        console.log("Token: ", accessToken);
        //const url = `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/AllergyIntolerance?clinical-status=active` + 
        const url = `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation?category=vital-signs` + 
            `&patient=${fhirClientContext.client.patient.id}`;

        fetch(url, {
            method: "GET",
            mode: "cors",
            headers: { 
                Authorization: `Bearer ${accessToken}`,
                accept: "application/json" 
            }
        })
        .then((response) => { console.log(JSON.stringify(response)); response.json() })
        .then((data) => {

            console.log("GOT THE DATA", data);
            //https://fhir.ssmhc.com/Fhir/api/FHIR/R4/AllergyIntolerance?clinical-status=active&patient=ez8XQ-2cY7Qmh4xy5BE2F4WpI6PMYwrHEdWbm0o3RCTA3

        });


        console.log("try to get allergies");
        fhirClientContext.client.patient.request(`AllergyIntolerance`, { flat: true }).then((value: any) => {

            console.log("got allergies");
            console.log(value);

            // Filter out those "OperationOutcome" results...
            //return tValue.filter((x: T) => { return x.resourceType === resourceName; });
        }).catch((error) => {
            console.log("*** ERROR", error);
            console.log(error.stack);
        });

    }, []);

    return (
        <View>
            <Text>
                Allergies
            </Text>

            {/* Error Message */}
            {/*{elErrorMessage}*/}
        </View>
    );
}