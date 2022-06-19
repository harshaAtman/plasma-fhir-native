import { View, Text, StyleSheet } from "react-native";
import { Coding } from "fhir/r4";

export interface ICodingViewProps { coding?: Coding };
export default function CodingView(props: ICodingViewProps) {
    // Check if data is available...
    if (!props.coding) { return <View />; }

    let display = "";
    if (props.coding.display) { display = props.coding.display; }
    else if (props.coding.code) { display = props.coding.code; }

    return <Text style={styles.CodingView_container}>{display}</Text>;
}

const styles = StyleSheet.create({
    CodingView_container: { }
});