import React from "react";
import { Patient } from "fhir/r4";
import { HumanNameView, AddressView } from "..";
import SexAgeDOB from "./SexAgeDOB";

export interface IPatientHeaderProps { patient?: Patient };
export default function PatientHeader(props: IPatientHeaderProps) {
    // Check if data is available...
    if (!props.patient) { return <div />; }
    if (!props.patient.name) { return <div />; }

    return (
        <div className="PatientHeader_container">
            <div>
                <HumanNameView humanName={props.patient.name[0]} />

                <div className="PatientHeader_sexAgeDOB">
                    <SexAgeDOB patient={props.patient} />
                </div>

                <div className="PatientHeader_patientId">
                    <div>
                        <label>{props.patient.id}</label>
                    </div>
                </div>

                <div className="PatientHeader_address">
                    <label>Address</label>
                </div>
                {props.patient.address?.map((addr, idx: number) => { 
                    return <AddressView key={`AddressView_${idx}`} address={addr} />; 
                })}

            </div>
        </div>
    );
}