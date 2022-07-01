import React, { useContext } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Client from 'fhirclient/lib/Client';
import { FHIRClientHelper, FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";
import { FHIRClientContext } from "../../components/plasma-fhir-react-native-client-context";
import useDataLoadScreen from "./../../hooks/useDataLoadScreen";
import { FHIRr4 } from "./../../components/plasma-fhir-react-native-components";

// TODO: For DSTU2, we don't want to pass in "problem-list-item". Don't pass in anything.

export default function ConditionsScreen() {
    const context = useContext(FHIRClientContext);
    const { 
        data: conditions, isDataLoaded, hasErrorLoading, errorMessage,
        elLoadingSpinner, elErrorMessage
    } = useDataLoadScreen<PlasmaFHIR.Condition>({
        context: context,
        getData: (fhirClient: Client) => FHIRClientHelper.getConditions(fhirClient, "problem-list-item")
    });

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Conditions</Text>

            {/* Error Message */}
            {elErrorMessage}

            {/* Loading Spinner */}
            {elLoadingSpinner}

            {/* Conditions */}
            {isDataLoaded && !hasErrorLoading ? 
            <View>
            {
                conditions.map((condition: PlasmaFHIR.Condition, idx: number) => { 
                    return (
                        <View key={"ConditionView_" + idx.toString()}>
                            <View>
                                <FHIRr4.ConditionView condition={condition} />
                            </View>
                        </View>
                    );
                })
            }
            </View> : null}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 5 },
    
    header: { 
        fontSize: 36, 
        fontWeight: "bold", 
        paddingVertical: 4, 
        textAlign: "center"
    },
});