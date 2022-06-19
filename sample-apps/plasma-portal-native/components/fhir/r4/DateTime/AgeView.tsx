import React from "react";
import { DateTimeUtils } from "plasma-fhir-app-utils";

export interface IAgeViewProps { dob?: string };
export default function AgeView(props: IAgeViewProps) {
    // Check if data is available...
    if (!props.dob) { return <div />; }

    const dob = new Date(props.dob + "T00:00:00");    // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
    const age = DateTimeUtils.getAgeFromDOB(dob);
    return <span className="AgeView_age">{age + "y"}</span>
}