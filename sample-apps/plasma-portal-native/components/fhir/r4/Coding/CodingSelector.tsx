import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Coding } from "fhir/r4";

export interface ICodingSelectorProps { 
    codes: Coding[];
    selectedCode: Coding | null;
    onChange: (value: Coding) => void;
}

export default function CodingSelector(props: ICodingSelectorProps) {
    const options = props.codes.map((code: Coding, idx: number) => {
        const text = code.display;
        return (<Picker.Item key={`CodingOption_${idx}`} label={text} value={code.code} />);
    });

    const onChange = useCallback((value, index) => {
        const val = props.codes.find((code: Coding) => code.code === value);
        if (val) { props.onChange(value); }
    }, [props, props.codes, props.onChange]);

    return (
        <Picker onValueChange={onChange} value={props.selectedCode?.code} style={styles.CodingSelector}>
            {options}
        </Picker>
    );
}

const styles = StyleSheet.create({
    CodingSelector: { } 
});