import { View, Text, StyleSheet } from "react-native";
import { DateTimeUtils } from "plasma-fhir-app-utils";

export interface IAgeViewProps { dob?: string };
export default function AgeView(props: IAgeViewProps) {
    // Check if data is available...
    if (!props.dob) { return <View />; }

    const dob = new Date(props.dob + "T00:00:00");    // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
    const age = DateTimeUtils.getAgeFromDOB(dob);
    return <Text style={styles.AgeView_age}>{age + "y"}</Text>
}

const styles = StyleSheet.create({
    AgeView_age: { }
});