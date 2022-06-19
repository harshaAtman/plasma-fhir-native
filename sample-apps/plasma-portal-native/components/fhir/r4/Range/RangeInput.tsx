import React, { useState, useCallback } from "react";
import { Range } from "fhir/r4";
import { FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";

// TODO: Extend this so we can pass in all the other input props
// TODO: Make other components use the "plasma-fhir-app-utils" library for formatting and stuff

export interface IRangeInputProps { 
    placeholder?: string;

    value?: Range | undefined;
    onChange?: (text: string, value: Range | undefined) => void;
}

const RangeInput: React.FC<IRangeInputProps> = (props: IRangeInputProps) => {
    const [rangeValue, setRangeValue] = useState<PlasmaFHIR.Range | undefined>(props.value);
    const [rangeText, setRangeText] = useState<string>((props.value) ? PlasmaFHIR.Range.toString(props.value) : "");

    const onChange = useCallback((e) => {
        const s = e.target.value;

        // Try to parse the range. If we can, then update the value and reformat.
        // If we can't, erase the value and leave the format as-is.
        const range = PlasmaFHIR.Range.fromString(s);   // Can be undefined
        const text = (range) ? PlasmaFHIR.Range.toString(range) : s;

        // Update state...
        setRangeValue(range);
        setRangeText(text);

        // Call client onChange...
        if (props.onChange) { props.onChange(text, range); }

    }, [props.onChange, setRangeValue, setRangeText])

    return (
        <input type="text" className="RangeInput" 
            placeholder={props.placeholder ?? ""} 
            value={rangeText}
            onChange={onChange}
        />
    );
}

export default RangeInput;