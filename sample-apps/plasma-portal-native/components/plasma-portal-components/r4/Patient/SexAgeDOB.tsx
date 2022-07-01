import { View, Text, StyleSheet } from "react-native";
import { Patient } from "fhir/r4";
import { DateTimeUtils } from "plasma-fhir-app-utils";

export interface ISexAgeDOBProps { patient?: Patient };
export default function SexAgeDOB(props: ISexAgeDOBProps) {
    // Check if data is available...
    if (!props.patient) { return <View />; }

    // If patient has DOB, build that element...
    let elAgeDOB = null;
    if (props.patient.birthDate) {
        const dob = new Date(props.patient.birthDate + "T00:00:00");    // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        const age = DateTimeUtils.getAgeFromDOB(dob);
        elAgeDOB = (
            <Text><Text>{', '}</Text>
                <Text style={styles.SexAgeDOB_age}>{age + "y"}</Text><Text>{', '}</Text>
                <Text style={styles.SexAgeDOB_dob}>{dob.toLocaleDateString()}</Text>
            </Text>
        );
    }
    
    // Get patient's sex...
    const elSex = <Text style={styles.SexAgeDOB_gender}>{props.patient.gender}</Text>;

    return (
        <View style={styles.SexAgeDOB_container}>
            <Text>
                {elSex}
                {elAgeDOB}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    SexAgeDOB_age: { },
    SexAgeDOB_dob: { },
    SexAgeDOB_gender: { textTransform: "capitalize"  },
    SexAgeDOB_container: { },
});