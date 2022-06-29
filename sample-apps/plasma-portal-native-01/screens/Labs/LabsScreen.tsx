import React, { useContext } from "react";
import { useTable, useSortBy, Column } from "react-table";
import { FHIRr4 } from "plasma-fhir-react-components";

import { FHIRClientHelper, FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";
import { FHIRClientContext } from "plasma-fhir-react-client-context";
import useDataLoadScreen from "./../../hooks/useDataLoadScreen";

export default function LabsScreen() {
    const context = useContext(FHIRClientContext);
    const { 
        data: labs, isDataLoaded, hasErrorLoading, errorMessage,
        elLoadingSpinner, elErrorMessage
    } = useDataLoadScreen<PlasmaFHIR.Observation>({
        context: context,
        getData: FHIRClientHelper.getLabs
    });

    const sortCode = React.useMemo(() => {
        return (rowA: any, rowB: any, columnId: string, desc: boolean) => { 
            const cca = rowA.values[columnId].props.codeableConcept;
            const ccb = rowB.values[columnId].props.codeableConcept;
            return PlasmaFHIR.CodeableConcept.sortByDisplayText(cca, ccb);
        };
    }, []);

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
        return labs.map((lab, idx) => {
            return {
                effectiveDate: (lab.effectiveDateTime) ? (new Date(lab.effectiveDateTime)).toLocaleDateString() : "",
                code: <FHIRr4.CodeableConceptView codeableConcept={lab.code} />,
                value: <FHIRr4.ObservationValueView value={lab} />
            };
        });
    }, [labs]);

    const columns: Column<TableColumns>[] = React.useMemo(() => { 
        return [
            { Header: 'Effective Date', accessor: 'effectiveDate', sortType: sortDate },
            { Header: 'Code', accessor: 'code', sortType: sortCode },
            { Header: 'Value', accessor: 'value', canSort: false }
        ];
    }, [sortDate, sortCode]);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">Labs</h1>
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

/** 
 * Definition of columns for the table 
 * Property names should match the "accessor" in the table columns
*/
type TableColumns = { 
    effectiveDate: string;
    code: JSX.Element;
    value: JSX.Element;
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