import { View, Text, StyleSheet } from "react-native";
import { HumanName } from 'fhir/r4';

export interface IHumanNameViewProps { humanName?: HumanName };
export function HumanNameView(props: IHumanNameViewProps) {
    // Check if data is available...
    if (!props.humanName) { return <View />; }

    return (
        <View style={styles.HumanNameView_container}>
            <Text style={styles.HumanNameView_formattedName}>{formatName(props.humanName)}</Text>
        </View>
    );
}

function formatName(name?: HumanName): string {
    // Check if name exists...
    if (!name) { return "Unknown"; }

    // If text is available, use that...
    if (name.text) { return name.text; }
    
    // Get all name pieces...
    let pieces = [];
    if (name.prefix)    { pieces.push(Array.isArray(name.prefix) ? name.prefix.join(" ") : name.prefix); }
    if (name.given)     { pieces.push(Array.isArray(name.given) ? name.given.join(" ") : name.given); }
    if (name.family)    { pieces.push(Array.isArray(name.family) ? name.family.join(" ") : name.family); }

    // Format all pieces...
    let sName = pieces.join(" ").trim();
    return sName;
}

const styles = StyleSheet.create({
    HumanNameView_container: { },
    HumanNameView_formattedName: { }
});

export default HumanNameView;