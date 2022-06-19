import { View, Text, StyleSheet } from "react-native";
import { Quantity } from "fhir/r4";
import { FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";

export interface IQuantityViewProps { quantity?: Quantity };
export default function QuantityView(props: IQuantityViewProps) {
    // Check if data is available...
    if (!props.quantity) { return <View />; }

    const display = PlasmaFHIR.Quantity.toString(props.quantity);
    return <Text style={styles.QuantityView_container}>{display}</Text>;
}

const styles = StyleSheet.create({
    QuantityView_container: { }
});