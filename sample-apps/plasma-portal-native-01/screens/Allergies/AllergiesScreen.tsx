import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FHIRClientHelper, FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";
import { FHIRClientContext } from "../../components/plasma-fhir-react-native-client-context";
import { FHIRr4, FHIRdstu2 } from "./../../components/plasma-fhir-react-native-components";
import useDataLoadScreen from "./../../hooks/useDataLoadScreen";

export default function AllergiesScreen() {
    const context = useContext(FHIRClientContext);
    const { 
        data: allergyIntolerance, isDataLoaded, hasErrorLoading, errorMessage,
        elLoadingSpinner, elErrorMessage
    } = useDataLoadScreen<PlasmaFHIR.AllergyIntolerance>({
        context: context,
        getData: FHIRClientHelper.getAllergyIntolerance
    });

    // Determine which FHIR release version we're using...
    const [fhirVersion, setFhirVersion] = useState<number>(0);
    useEffect(() => {
        const fhirClient = context.client;
        if (fhirClient) {
            fhirClient.getFhirRelease().then((value: number) => {
                setFhirVersion(value);
            });
        }
    }, [setFhirVersion]);    

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                🤧 Allergies
            </Text>

            {/* Error Message */}
            {elErrorMessage}

            {/* Loading Spinner */}
            {elLoadingSpinner}

            {/* Allergies */}
            {isDataLoaded && !hasErrorLoading ? 
            <View>
            {
                allergyIntolerance.map((allergy, idx) => { 
                    return (
                        <View key={"AllergyIntoleranceItem_" + idx.toString()}>
                            {fhirVersion === 2 ? <FHIRdstu2.AllergyIntoleranceView allergyIntolerance={allergy as any} /> : null}

                            {fhirVersion === 4
                                ? <View>
                                    <View>
                                        <FHIRr4.AllergyIntoleranceView allergyIntolerance={allergy} />
                                        {allergy.reaction ? allergy.reaction.map((reaction, idx) => {
                                            return <FHIRr4.AllergyIntoleranceReactionView reaction={reaction} />
                                        }) : null}                                        
                                    </View>
                                </View>
                                : null
                            }                            
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