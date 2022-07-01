import { View, Text, StyleSheet } from "react-native";
import { AllergyIntolerance } from "fhir/r4";
import CodeableConceptView from "../CodeableConcept/CodeableConceptView";
import DateView from "../DateTime/DateView";

export interface IAllergyIntoleranceViewProps { allergyIntolerance?: AllergyIntolerance; }
export const AllergyIntoleranceView: React.FC<IAllergyIntoleranceViewProps> = (props) => {
    if (!props.allergyIntolerance) { return <View />; }
    if (!props.allergyIntolerance.code) { return <View />; }
    if (!props.allergyIntolerance.code.coding) { return <View />; }
    if (!props.allergyIntolerance.code.coding[0]) { return <View />; }

    return (
        <View style={styles.AllergyIntoleranceView_container}>
            <View>
                <View style={styles.AllergyIntoleranceView_code}>
                    <CodeableConceptView codeableConcept={props.allergyIntolerance.code} />
                </View>
                <Text style={styles.AllergyIntoleranceView_recordedDate}>
                    <Text>Added: </Text>
                    <DateView date={props.allergyIntolerance.recordedDate} />
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    AllergyIntoleranceView_container: { },
    AllergyIntoleranceView_code: { },
    AllergyIntoleranceView_recordedDate: { }
});

export default AllergyIntoleranceView;