import React from "react";
import { Range } from "fhir/r4";
import { FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";

export interface IRangeViewProps { range?: Range }
export default function RangeView(props: IRangeViewProps) {
    // Check if data is available...
    if (!props.range) { return <div />; }

    // Format display value...
    let display = PlasmaFHIR.Range.toString(props.range);
    return <span className="RangeView_container">{display}</span>;
}