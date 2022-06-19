import React from "react";
import { Observation } from "fhir/r4";
import { CodeableConceptView } from "..";
import ObservationValueView from "./ObservationValueView";

export interface IObservationComponentViewProps { observation?: Observation };
export default function ObservationComponentView(props: IObservationComponentViewProps) {
    console.log(props.observation);

    // Check if data is available...
    if (!props.observation) { return <div />; }

    // If there is a "component" property, add those into elComponents...
    let elComponents: any = [];
    if (props.observation.component) {
        elComponents = props.observation.component.map((component, index) => {
            const key="ObservationComponentView_" + index;
    
            if (component.code) { 
                return (
                    <div key={key}>
                        <CodeableConceptView codeableConcept={component.code} />
                        <ObservationValueView value={component} />
                    </div>
                );
            }
            
            return <div key={key}><ObservationValueView value={component} /></div>;
        });
    }

    // If there is a "code" property, add that...
    let elCode = null;
    if (props.observation.code) {
        elCode = <CodeableConceptView codeableConcept={props.observation.code} />;
    }

    // If there is a "value", add that...
    let elValue = <ObservationValueView value={props.observation} />;

    return (
        <div className="ObservationComponentView_container">
            {elComponents}
            {elCode}
            {elValue}
        </div>
    );
}