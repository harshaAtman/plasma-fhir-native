import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import { Coding, CodeableConcept } from 'fhir/r4';
import CodingView from "../Coding/CodingView";

export enum CodeableConceptViewDisplayMode {
  normal = "normal",
  inline = "inline"
}

export interface ICodeableConceptViewProps { 
  codeableConcept?: CodeableConcept,
  displayMode?: CodeableConceptViewDisplayMode
  style?: StyleProp<ViewStyle | TextStyle>;
};

export default function CodeableConceptView(props: ICodeableConceptViewProps) {
    // Default values...
    const displayMode = props.displayMode ?? CodeableConceptViewDisplayMode.normal;

    // Check if data is available...
    if (!props.codeableConcept) { return <View />; }
    if (!props.codeableConcept.coding && !props.codeableConcept.text) { return <View />; }

    const getCodings = (coding: Coding | Coding[]) => {

      // Convert to array if not an array...
      if (!Array.isArray(coding)) { coding = [coding]; }

      // Get list of CodingViews...
      const elCoding = coding.map((coding: Coding, idx: number, array: Coding[]) => {
          // For inline, we separate everything by a comma...
          if (displayMode === CodeableConceptViewDisplayMode.inline) {
            return (
              <View key={idx} style={styles.CodeableConceptView_codingElementContainer}>
                  <CodingView coding={coding} />
                  {idx < array.length - 1 ? <Text>, </Text> : null}
              </View>
            );
          // For normal, everything is on a new line...
          } else {
            return (
              <View key={idx} style={styles.CodeableConceptView_codingElementContainer}>
                  <CodingView coding={coding} />
              </View>
            );
          }
      });

      return elCoding;
    }

    const getText = (text: string) => {
      const isInlineMode = displayMode === CodeableConceptViewDisplayMode.inline;
      return (
        <View style={styles.CodeableConceptView_codingElementContainer}>
            <Text>{text}</Text>
        </View>
      );
    }

    let display = <></>;
    if (props.codeableConcept.text) { display = <Text>{getText(props.codeableConcept.text)}</Text>; }
    else if (props.codeableConcept.coding) { display = <>{getCodings(props.codeableConcept.coding)}</>; }
    
    return (
        <View style={[styles.CodeableConceptView_container, props.style]}>
            {display}
        </View>
    );
}

const styles = StyleSheet.create({
  CodeableConceptView_codingElementContainer: { },
  CodeableConceptView_container: { }
});