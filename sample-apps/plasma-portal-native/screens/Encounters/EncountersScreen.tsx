import React, { useContext } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { FHIRClientHelper, FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";
import { FHIRClientContext } from "../../components/plasma-fhir-react-native-client-context";
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
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Encounters</Text>

            {/* Error Message */}
            {elErrorMessage}

            {/* Loading Spinner */}
            {elLoadingSpinner}

            {/* Encounters */}
            {/* TODO: Want a table, but using this for now */}
            {isDataLoaded && !hasErrorLoading ? 
            <View>
                <View style={styles.row}>
                    <Text style={{ fontWeight: "bold" }}>Date</Text>
                    <Text style={{ fontWeight: "bold" }}>Type</Text>
                    <Text style={{ fontWeight: "bold" }}>Reason</Text>
                </View>

            {
                encounters.map((encounter: PlasmaFHIR.Encounter, idx: number) => { 
                    return (
                        <View key={"EncounterView_" + idx.toString()}>
                            <View style={[styles.row, { backgroundColor: (idx%2==0) ? "#ECE9E8" : "white" }]}>
                                {(encounter.period && encounter.period.start) ? <FHIRr4.DateView date={encounter.period.start} /> : <Text>{"Unknown"}</Text>}
                                {(encounter.type && encounter.type.length > 0) ? <FHIRr4.CodeableConceptView codeableConcept={encounter.type[0]} /> : <Text>{"Unknown"}</Text>}
                                {<Text>N/A</Text>}
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
    container: { padding: 0 },
    
    header: { 
        fontSize: 36, 
        fontWeight: "bold", 
        paddingVertical: 4, 
        textAlign: "center"
    },

    row: {
        borderBottomColor: "gray", 
        borderBottomWidth: 1, 
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between"
    }
});