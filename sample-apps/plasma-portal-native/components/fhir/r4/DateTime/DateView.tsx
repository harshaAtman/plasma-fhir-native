import React from "react";

// TODO: Check format here: https://www.hl7.org/fhir/datatypes.html#date

export interface IDateViewProps { date?: string }
export default function DateView(props: IDateViewProps) {
    // Check if data is available...
    if (!props.date) { return <div />; }

    // Format display value...
    const date = new Date(props.date + "T00:00:00");    // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
    const display = (isNaN(date as any)) ? "Unknown" : date.toLocaleDateString();

    return <span className="DateView_container">{display}</span>;
}