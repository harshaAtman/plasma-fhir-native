import { View, Text, StyleSheet } from "react-native";
import { Patient } from "fhir/r4";
import { DateTimeUtils } from "plasma-fhir-app-utils";
import { PlasmaThemeContext } from "../../theme";

// TODO: I don't like that I can't make the components outside of the function very easily.
// TODO: Also I don't like having to use ! to ensure it's not null.

export interface ISexAgeDOBProps { patient?: Patient };
export default function SexAgeDOB(props: ISexAgeDOBProps) {
    // Check if data is available...
    if (!props.patient) { return <View />; }

    // If patient has DOB, build that element...
    let dob = (props.patient.birthDate) ? new Date(props.patient.birthDate + "T00:00:00") : null;   // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
    let age = (props.patient.birthDate) ? DateTimeUtils.getAgeFromDOB(dob!) : null;

    return (
        <PlasmaThemeContext.Consumer>
            {(theme) => (
                <View style={theme.theme.SexAgeDOB_container}>
                    <Text>
                        <Text style={theme.theme.SexAgeDOB_gender}>{props!.patient!.gender}</Text>
                        {(props.patient && props.patient.birthDate)
                            ? <Text><Text>{', '}</Text>
                                <Text style={theme.theme.SexAgeDOB_age}>{age + "y"}</Text><Text>{', '}</Text>
                                <Text style={theme.theme.SexAgeDOB_dob}>{dob!.toLocaleDateString()}</Text>
                            </Text> : null
                        }
                    </Text>
                </View>
            )}
        </PlasmaThemeContext.Consumer>
    );
}