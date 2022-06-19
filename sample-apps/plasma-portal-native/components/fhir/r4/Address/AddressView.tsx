import React from 'react';
import { Address } from "fhir/r4";
import { FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";

export interface IAddressViewProps { address?: Address };
export function AddressView(props: IAddressViewProps) {
    // Check if data is available...
    if (!props.address) { return <div />; }

    const elAddress = getAddressLineElement(props.address.line);
    const elCityStateZip = getCityStateZipElement(props.address);
    return (
        <div className="AddressView_container">
            {elAddress}
            {elCityStateZip}
        </div>
    );
}

// Returns a <div> containing the address lines
function getAddressLineElement(line?: string | string[]): JSX.Element {
    if (!line) { return <div />; }
    if (!Array.isArray(line)) { line = [line]; }
    
    const elLine = line.map((line: string, idx: number) => {
        return (
            <span key={idx} className="AddressView_addressLine">
                {line}
            </span>
        );
    });

    return <div className="AddressView_addressLineContainer">{elLine}</div>;
}

// Returns a <div> containing the city/state data...
function getCityStateZipElement(address: Address): JSX.Element
{
    return (
        <div className="AddressView_cityStateContainer">
            {PlasmaFHIR.Address.toString(address)}
        </div>
    );
}

export default AddressView;