import React, { useContext } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { FHIRClientHelper, FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";
import { FHIRClientContext } from "../../components/plasma-fhir-react-native-client-context";
import { FHIRr4 } from "./../../components/plasma-fhir-react-native-components";
import useDataLoadScreen from "./../../hooks/useDataLoadScreen";

export default function LabsScreen() {
    const context = useContext(FHIRClientContext);
    const { 
        data: labs, isDataLoaded, hasErrorLoading, errorMessage,
        elLoadingSpinner, elErrorMessage
    } = useDataLoadScreen<PlasmaFHIR.Observation>({
        context: context,
        getData: FHIRClientHelper.getLabs
    });

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Labs</Text>

            {/* Error Message */}
            {elErrorMessage}

            {/* Loading Spinner */}
            {elLoadingSpinner}

            {/* Labs */}
            {/* TODO: Want a table, but using this for now */}
            {isDataLoaded && !hasErrorLoading ? 
            <View>
                <View style={styles.row}>
                    <Text style={{ fontWeight: "bold" }}>Effective Date</Text>
                    <Text style={{ fontWeight: "bold" }}>Code</Text>
                    <Text style={{ fontWeight: "bold" }}>Value</Text>
                </View>
            {
                labs.map((lab: PlasmaFHIR.Observation, idx: number) => { 
                    return (
                        <View key={"LabView_" + idx.toString()}>
                            <View style={[styles.row, { backgroundColor: (idx%2==0) ? "#ECE9E8" : "white" }]}>
                                <Text>{(lab.effectiveDateTime) ? (new Date(lab.effectiveDateTime)).toLocaleDateString() : ""}</Text>
                                {<FHIRr4.CodeableConceptView codeableConcept={lab.code} />}
                                {<FHIRr4.ObservationValueView value={lab} />}
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
        textAlign: "left"
    },

    row: {
        borderBottomColor: "gray", 
        borderBottomWidth: 1, 
        padding: 15,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    }
});