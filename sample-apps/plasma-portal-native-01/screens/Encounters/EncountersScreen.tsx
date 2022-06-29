import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FHIRClientHelper, FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";
import { FHIRClientContext } from "plasma-fhir-react-client-context";
import { FHIRr4 } from "./../../components/plasma-fhir-react-native-components";
import useDataLoadScreen from "./../../hooks/useDataLoadScreen";

export default function EncountersScreen() {
    const context = useContext(FHIRClientContext);
    const { 
        data: encounters, isDataLoaded, hasErrorLoading, errorMessage,
        elLoadingSpinner, elErrorMessage
    } = useDataLoadScreen<PlasmaFHIR.Encounter>({
        context: context,
        getData: FHIRClientHelper.getEncounters
    });

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Encounters</Text>

            {/* Error Message */}
            {elErrorMessage}

            {/* Loading Spinner */}
            {elLoadingSpinner}

            {/* Encounters */}
            {/* TODO: Want a table, but using this for now */}
            {isDataLoaded && !hasErrorLoading ? 
            <View>
            {
                encounters.map((encounter: PlasmaFHIR.Encounter, idx: number) => { 
                    return (
                        <View key={"EncounterView_" + idx.toString()}>
                            <View>
                                <FHIRr4.PeriodView period={encounter.period} />
                            </View>
                        </View>
                    );
                })
            }
            </View> : null}
        </View>
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