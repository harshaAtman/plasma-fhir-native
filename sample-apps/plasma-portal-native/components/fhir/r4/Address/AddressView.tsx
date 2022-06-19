import { View, Text, StyleSheet } from "react-native";
import { Address } from "fhir/r4";
import { FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";

export interface IAddressViewProps { address?: Address };
export function AddressView(props: IAddressViewProps) {
    // Check if data is available...
    if (!props.address) { return <View />; }

    const elAddress = getAddressLineElement(props.address.line);
    const elCityStateZip = getCityStateZipElement(props.address);
    return (
        <View style={styles.AddressView_container}>
            {elAddress}
            {elCityStateZip}
        </View>
    );
}

// Returns a <div> containing the address lines
function getAddressLineElement(line?: string | string[]): JSX.Element {
    if (!line) { return <View />; }
    if (!Array.isArray(line)) { line = [line]; }
    
    const elLine = line.map((line: string, idx: number) => {
        return (
            <Text key={idx} style={styles.AddressView_addressLine}>
                {line}
            </Text>
        );
    });

    return <View style={styles.AddressView_addressLineContainer}>{elLine}</View>;
}

// Returns a <div> containing the city/state data...
function getCityStateZipElement(address: Address): JSX.Element
{
    return (
        <View style={styles.AddressView_cityStateContainer}>
            <Text>{PlasmaFHIR.Address.toString(address)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    AddressView_container: { },
    AddressView_addressLine: { },
    AddressView_addressLineContainer: { },
    AddressView_cityStateContainer: { } 
});

export default AddressView;