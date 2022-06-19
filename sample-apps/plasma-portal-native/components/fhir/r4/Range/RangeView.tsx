import { View, Text, StyleSheet } from "react-native";
import { Range } from "fhir/r4";
import { FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";

export interface IRangeViewProps { range?: Range }
export default function RangeView(props: IRangeViewProps) {
    // Check if data is available...
    if (!props.range) { return <View />; }

    // Format display value...
    let display = PlasmaFHIR.Range.toString(props.range);
    return <Text style={styles.RangeView_container}>{display}</Text>;
}

const styles = StyleSheet.create({
    RangeView_container: { }
});