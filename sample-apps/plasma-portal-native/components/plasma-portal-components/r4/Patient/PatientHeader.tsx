import { View, Text, StyleSheet } from "react-native";
import { Patient } from "fhir/r4";
import { HumanNameView } from "../HumanName/HumanNameView";
import { AddressView } from "../Address/AddressView";
import SexAgeDOB from "./SexAgeDOB";

export interface IPatientHeaderProps { patient?: Patient };
export default function PatientHeader(props: IPatientHeaderProps) {
    // Check if data is available...
    if (!props.patient) { return <View />; }
    if (!props.patient.name) { return <View />; }

    return (
        <View style={styles.PatientHeader_container}>
            <View>
                <HumanNameView humanName={props.patient.name[0]} />

                <View style={styles.PatientHeader_sexAgeDOB}>
                    <SexAgeDOB patient={props.patient} />
                </View>

                <View style={styles.PatientHeader_patientId}>
                    <View>
                        <Text>{props.patient.id}</Text>
                    </View>
                </View>

                <View style={styles.PatientHeader_address}>
                    <Text style={styles.PatientHeader_addressText}>Address</Text>
                </View>
                {props.patient.address?.map((addr, idx: number) => { 
                    return <AddressView key={`AddressView_${idx}`} address={addr} />; 
                })}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    PatientHeader_container: { },
    PatientHeader_sexAgeDOB: { },
    PatientHeader_patientId: { paddingBottom: 10 },
    PatientHeader_address: { },
    PatientHeader_addressText: { fontWeight: "bold", fontSize: 16 }
});