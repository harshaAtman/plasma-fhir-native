import React, { useContext } from 'react';
//import { FHIRr4 } from "plasma-fhir-react-components";

import { FHIRClientHelper, FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";
import { FHIRClientContext } from "plasma-fhir-react-client-context";
//import { useTable, useSortBy, Column, useRowState } from "react-table";
import useDataLoadScreen from "./../../hooks/useDataLoadScreen";

const getVitalCategory = (vitalCode: PlasmaFHIR.CodeableConcept) => {
    const vitalKey: string = vitalCode.coding ? (vitalCode.coding[0].code || '') : (vitalCode.text || '');
    const vitalDisplay: string = PlasmaFHIR.CodeableConcept.getDisplayText(vitalCode, true);
    
    return {
        'vitalKey': vitalKey,
        'vitalDisplay': vitalDisplay,
    };
}

export default function VitalsScreen() {
    const context = useContext(FHIRClientContext);
    const { 
        data: vitalsData, isDataLoaded, hasErrorLoading, errorMessage,
        elLoadingSpinner, elErrorMessage
    } = useDataLoadScreen<PlasmaFHIR.Observation>({
        context: context,
        getData: FHIRClientHelper.getVitals
    });

    // TODO: Figure out how to use react-table datetime sorting
    const sortDate = React.useMemo(() => {
        return (rowA: any, rowB: any, columnId: string, desc: boolean) => { 
            const sa = rowA.values[columnId];
            const sb = rowB.values[columnId];
            const da = new Date(sa);
            const db = new Date(sb);

            return da.getTime() - db.getTime();
        };
    }, []);

    const data = React.useMemo(() => {
        console.log(vitalsData)
        const vitalsSortedByDateAndEncounter =  vitalsData.sort((a, b) => {
            const da = a.effectiveDateTime ? new Date(a.effectiveDateTime).getTime() : 0;
            const db = b.effectiveDateTime ? new Date(b.effectiveDateTime).getTime() : 0;

            const ea = a.encounter?.reference || '';
            const eb = b.encounter?.reference || '';

            return da === db ? eb.localeCompare(ea) : db - da;
        });

        const vitalsGroupedByEncounter: PlasmaFHIR.Observation[][] = vitalsSortedByDateAndEncounter.reduce((vitalGroups: PlasmaFHIR.Observation[][], vital) => {
            if (vitalGroups.length === 0) {
                vitalGroups.push([vital]);
                return vitalGroups;
            }
            
            const curEncounterReference = vital.encounter?.reference || '';
            const prevEncounterReference = vitalGroups[vitalGroups.length - 1][0].encounter?.reference || '';
            if (curEncounterReference === prevEncounterReference) {
                vitalGroups[vitalGroups.length - 1].push(vital);
            } else {
                vitalGroups.push([vital]);
            }

            return vitalGroups;
        }, []);

        const rows = vitalsGroupedByEncounter.map(vitalsByEncounter => {
            // NOTE: when there are multiple measurements for the same vital in one encounter, only the last measurement will be displayed
            const vitalCells = vitalsByEncounter.reduce((row: {[key: string]: JSX.Element | string}, vital) => {
                let elValue = <></>;
                if (vital.valueQuantity)    { elValue = <FHIRr4.ObservationValueView value={vital} />; }
                if (vital.component)        { elValue = <FHIRr4.ObservationComponentView observation={vital} />; }
                const {vitalKey} =  getVitalCategory(vital.code);
                row[vitalKey] = elValue;
                return row;
            }, {});

            return {
                measurementDate: (vitalsByEncounter[0].effectiveDateTime) ? (new Date(vitalsByEncounter[0].effectiveDateTime)).toLocaleDateString() : "",
                ...vitalCells,
            };
        });

        return rows;
    }, [vitalsData]);

    const columns: Column<TableColumns>[] = React.useMemo(() => { 
        // Get all vital codes from patient's chart
        const vitalCategories: {[key: string]: string} = vitalsData.reduce(
            (vitalCategories: {[key: string]: string}, current) => {
                // TODO: make code processing logic a helper function
                if (!current.code.coding && !current.code.text) { return vitalCategories; }
                const {vitalKey, vitalDisplay} = getVitalCategory(current.code)
                if (! (vitalKey in vitalCategories)) {
                    vitalCategories[vitalKey] = vitalDisplay;
                }
                return vitalCategories;
            }, {}
        );
        const colsForVitals = Object.entries(vitalCategories).map(([vitalKey, vitalDisplay]) => {
            return {
                Header: vitalDisplay,
                accessor: vitalKey,
                canSort: false,
            };
        });
        return [
            { Header: 'Measurement Date', accessor: 'measurementDate', sortType: sortDate },
            ...colsForVitals,
        ];
    }, [vitalsData]);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">Vitals</h1>
            <div className="pt-5" />

            {/* Error Message */}
            {elErrorMessage}

            {/* Loading Spinner */}
            {elLoadingSpinner}

            {/* Labs */}
            {isDataLoaded && !hasErrorLoading ? 
            <div className="g-4">
                <Table columns={columns} data={data} />
            </div> : null}
            
        </div>
    );
}

type TableColumns = { 
    measurementDate: string;
    [key: string]: JSX.Element | string;
};

/** Props for the table component */
interface ITableProps {
    columns: Column<TableColumns>[];
    data: TableColumns[];
}

function Table({ columns, data }: ITableProps) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);

    return (
        <table {...getTableProps()} className="LabsTable">
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column: any) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        <span>{column.isSorted ? column.isSortedDesc ? ' ▾' : ' ▴' : ''}</span>
                    </th>
                    ))}
                </tr>
                ))}
            </thead>


            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                    </tr>
                )
                })}
            </tbody>
        </table>
    );
}