import React from "react";
import { Period } from "fhir/r4";
import { FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";

export interface IPeriodViewProps { period?: Period }
export default function PeriodView(props: IPeriodViewProps) {
    // Check if data is available...
    if (!props.period) { return <div />; }

    const display = PlasmaFHIR.Period.toString(props.period);
    return <span className="PeriodView_container">{display}</span>;
}