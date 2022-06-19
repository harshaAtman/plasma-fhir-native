import React from "react";
import IValue from "./IValue";
import { DateView, CodeableConceptView, PeriodView, QuantityView, RangeView, RatioView } from "..";

export interface IObservationValueViewProps { value?: IValue };
export default function ObservationValueView(props: IObservationValueViewProps) {
    // Check if data is available...
    if (!props.value) { return <div />; }

    let elValue = null;
    if (props.value.valueQuantity)                  { elValue = <QuantityView quantity={props.value.valueQuantity} />; }
    else if (props.value.valueCodeableConcept)      { elValue = <CodeableConceptView codeableConcept={props.value.valueCodeableConcept} />; }
    else if (props.value.valueString)               { elValue = <span>{props.value.valueString}</span>; }
    else if (props.value.valueBoolean)              { elValue = <span>{props.value.valueBoolean}</span>; }
    else if (props.value.valueInteger)              { elValue = <span>{props.value.valueInteger}</span>; }
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
        <div className="ObservationValueView_container">
            {elValue}
        </div>
    );
}