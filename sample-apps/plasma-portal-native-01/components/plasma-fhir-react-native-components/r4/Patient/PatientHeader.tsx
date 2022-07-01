import { View, Text } from "react-native";
import { Patient } from "fhir/r4";
import { HumanNameView } from "../HumanName/HumanNameView";
import { AddressView } from "../Address/AddressView";
import SexAgeDOB from "./SexAgeDOB";
import { PlasmaThemeContext } from "../../theme";

export interface IPatientHeaderProps { patient?: Patient };
export default function PatientHeader(props: IPatientHeaderProps) {
    // Check if data is available...
    if (!props.patient) { return <View />; }
    if (!props.patient.name) { return <View />; }

    return (
        <PlasmaThemeContext.Consumer>
            {(theme) => (
                <View style={theme.theme.PatientHeader_container}>
                    <View>
                        <HumanNameView humanName={props.patient.name[0]} />

                        <View style={theme.theme.PatientHeader_sexAgeDOB}>
                            <SexAgeDOB patient={props.patient} />
                        </View>

                        <View style={theme.theme.PatientHeader_patientId}>
                            <View>
                                <Text style={theme.theme.PatientHeader_patientIdText}>{props.patient.id}</Text>
                            </View>
                        </View>

                        <View style={theme.theme.PatientHeader_address}>
                            <Text style={theme.theme.PatientHeader_addressText}>Address</Text>
                        </View>
                        {props.patient.address?.map((addr, idx: number) => { 
                            return <AddressView key={`AddressView_${idx}`} address={addr} />; 
                        })}
                    </View>
                </View>
            )}
        </PlasmaThemeContext.Consumer>
    );
}