import { View, Text, StyleSheet } from "react-native";
import IValue from "./IValue";
import CodeableConceptView from "../CodeableConcept/CodeableConceptView";
import DateView from "../DateTime/DateView";
import PeriodView from "../Period/PeriodView";
import QuantityView from "../Quantity/QuantityView";
import RangeView from "../Range/RangeView";
import RatioView from "../Ratio/RatioView";

export interface IObservationValueViewProps { value?: IValue };
export default function ObservationValueView(props: IObservationValueViewProps) {
    // Check if data is available...
    if (!props.value) { return <View />; }

    let elValue = null;
    if (props.value.valueQuantity)                  { elValue = <QuantityView quantity={props.value.valueQuantity} />; }
    else if (props.value.valueCodeableConcept)      { elValue = <CodeableConceptView codeableConcept={props.value.valueCodeableConcept} />; }
    else if (props.value.valueString)               { elValue = <Text>{props.value.valueString}</Text>; }
    else if (props.value.valueBoolean)              { elValue = <Text>{props.value.valueBoolean}</Text>; }
    else if (props.value.valueInteger)              { elValue = <Text>{props.value.valueInteger}</Text>; }
    else if (props.value.valueRange)                { elValue = <RangeView range={props.value.valueRange} />; }
    else if (props.value.valueRatio)                { elValue = <RatioView ratio={props.value.valueRatio} />; }
    // TODO: valueSampledData
    // TODO: valueTime    
    else if (props.value.valueDateTime)             { elValue = <DateView date={props.value.valueDateTime} />; }
    else if (props.value.valuePeriod)               { elValue = <PeriodView period={props.value.valuePeriod} />; }
    // TODO: valueAttachment   
    else if (props.value.dataAbsentReason)          { elValue = <CodeableConceptView codeableConcept={props.value.dataAbsentReason} />; }
    else                                            { console.warn("ObservationValueView: No value found"); elValue = null; } // Hopefully we don't hit this case

    return (
        <View style={styles.ObservationValueView_container}>
            {elValue}
        </View>
    );
}

const styles = StyleSheet.create({
    ObservationValueView_container: { }
});