import React, { useContext } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Card } from '@rneui/base';
import { FHIRr4 } from '../../components/plasma-fhir-react-native-components';
import { FHIRClientHelper, FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";
import { FHIRClientContext } from "../../components/plasma-fhir-react-native-client-context";
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
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Immunizations</Text>

            {/* Error Message */}
            {elErrorMessage}

            {/* Loading Spinner */}
            {elLoadingSpinner}

            {/* Immunizations */}
            {isDataLoaded && !hasErrorLoading ? 
            <View>
                {
                    immunizationData.map((immunization, idx) => { 
                        return (
                            <Card containerStyle={{ marginTop: 10 }} key={`ImmunizationCard_${idx}`} shadow="sm" className="border">
                                <FHIRr4.ImmunizationView immunization={immunization} />
                            </Card>
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