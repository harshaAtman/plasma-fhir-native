import { View, Text, StyleSheet } from "react-native";
import { AllergyIntoleranceReaction, CodeableConcept } from "fhir/r4";
import CodeableConceptView from "../CodeableConcept/CodeableConceptView";
import AnnotationView from "../Annotation/AnnotationView";

// TODO: Show all annotations

export interface IAllergyIntoleranceReactionViewProps { reaction?: AllergyIntoleranceReaction; }
export const AllergyIntoleranceReactionView: React.FC<IAllergyIntoleranceReactionViewProps> = (props) => {
    if (!props.reaction) { return <View />; }

    // Manifestation(s)...
    const elManifestations = props.reaction.manifestation.map((manifestation: CodeableConcept, index: number) => {
        return (
            <View style={styles.AllergyIntoleranceReactionView_manifestation} key={`AllergyIntoleranceReactionView_manifestation_${index}`}>
                <CodeableConceptView key={index} codeableConcept={manifestation} />
            </View>
        );
    });

    return (
        <View style={styles.AllergyIntoleranceReactionView_container}>
            {elManifestations}
            {props.reaction.description ? <Text style={styles.AllergyIntoleranceReactionView_description}>{props.reaction.description}</Text> : null}
            {props.reaction.severity ? <Text style={styles.AllergyIntoleranceReactionView_severity}>{props.reaction.severity}</Text> : null}
            {props.reaction.note ? <AnnotationView annotation={props.reaction.note[0]} /> : null} 
        </View>
    );
}

const styles = StyleSheet.create({
    AllergyIntoleranceReactionView_container: { paddingVertical: 5 },
    AllergyIntoleranceReactionView_manifestation: { },
    AllergyIntoleranceReactionView_description: { textTransform: "capitalize" },
    AllergyIntoleranceReactionView_severity: { textTransform: "capitalize" }
});

export default AllergyIntoleranceReactionView;