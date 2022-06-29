import { View, Text, StyleSheet } from "react-native";
import { Immunization } from "fhir/r4";
import { CodeableConceptView } from "..";

export interface IImmunizationViewProps { immunization?: Immunization; }
export const ImmunizationView: React.FC<IImmunizationViewProps> = (props) => {
    if (!props.immunization) { return <View />; }
    if (!props.immunization.vaccineCode) { return <View />; }

    return (
        <View style={styles.ImmunizationView_container}>
            <View>
                <View style={styles.ImmunizationView_vaccineCode}>
                    <CodeableConceptView codeableConcept={props.immunization.vaccineCode} />
                </View>
                <Text style={styles.ImmunizationView_status}>
                    Status: {props.immunization.status}
                </Text>
                {
                    props.immunization.occurrenceDateTime && <Text style={styles.ImmunizationView_occurrenceDateTime}>
                        Date: {new Date(props.immunization.occurrenceDateTime).toLocaleDateString()}
                    </Text>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    ImmunizationView_container: { },
    ImmunizationView_vaccineCode: { },
    ImmunizationView_status: { },
    ImmunizationView_occurrenceDateTime: { }
});

export default ImmunizationView;