import { View, Text, StyleSheet } from "react-native";
import { AllergyIntolerance } from "fhir/r2";

export interface IAllergyIntoleranceViewProps { allergyIntolerance?: AllergyIntolerance; }
export const AllergyIntoleranceView: React.FC<IAllergyIntoleranceViewProps> = (props) => {
    if (!props.allergyIntolerance) { return <View />; }
    if (!props.allergyIntolerance.reaction) { return <View />; }

    const recordedDate = (props.allergyIntolerance.recordedDate)
        ? (new Date(props.allergyIntolerance.recordedDate)).toLocaleDateString()
        : "Unknown";

    return (
        <View style={styles.AllergyIntoleranceView_container}>
            <View>
                <View style={styles.AllergyIntoleranceView_code}>
                    {props.allergyIntolerance.substance.text}
                </View>
                <Text style={styles.AllergyIntoleranceView_recordedDate}>
                    Added: {recordedDate}
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