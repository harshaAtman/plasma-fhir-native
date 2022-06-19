import React, { useCallback } from "react";
import { Coding } from "fhir/r4";

export interface ICodingSelectorProps { 
    codes: Coding[];
    selectedCode: Coding | null;
    onChange: (value: Coding) => void;
}

export default function CodingSelector(props: ICodingSelectorProps) {
    const options = props.codes.map((code: Coding, idx: number) => {
        const text = code.display;
        return (<option key={`CodingOption_${idx}`}  value={code.code}>{text}</option>);
    });

    const onChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = props.codes.find((code: Coding) => code.code === event.target.value);
        if (value) { props.onChange(value); }
    }, [props, props.codes, props.onChange]);

    return (
        <select onChange={onChange} value={props.selectedCode?.code} className="CodingSelector">
            {options}
        </select>
    );
}