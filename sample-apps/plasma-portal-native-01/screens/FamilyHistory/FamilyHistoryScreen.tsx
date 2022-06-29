import React, { useContext } from "react";
import { useTable, useSortBy, Column } from "react-table";
import { FHIRr4 } from "plasma-fhir-react-components";

import { FHIRClientContext } from "plasma-fhir-react-client-context";
import { FHIRClientHelper, FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";
import useDataLoadScreen from "./../../hooks/useDataLoadScreen";

export default function FamilyHistoryScreen() {
    const context = useContext(FHIRClientContext);
    const { 
        data: familyMemberHistory, isDataLoaded, hasErrorLoading, errorMessage,
        elLoadingSpinner, elErrorMessage
    } = useDataLoadScreen<PlasmaFHIR.FamilyMemberHistory>({
        context: context,
        getData: FHIRClientHelper.getFamilyMemberHistory
    });

    const sortCode = React.useMemo(() => {
        return (rowA: any, rowB: any, columnId: string, desc: boolean) => { 
            const cca = rowA.values[columnId].props.codeableConcept;
            const ccb = rowB.values[columnId].props.codeableConcept;
            return PlasmaFHIR.CodeableConcept.sortByDisplayText(cca, ccb);
        };
    }, []);

    const data = React.useMemo(() => {
        return familyMemberHistory.map((familyMemberHistory, idx) => {
            const sConditions = (familyMemberHistory.condition)
                ? familyMemberHistory.condition.map((c) => { return c.code.text; }).join(", ")
                : "";

            return {
                relationship: <FHIRr4.CodeableConceptView codeableConcept={familyMemberHistory.relationship} />,
                name: familyMemberHistory.name || "",
                sex: familyMemberHistory?.sex?.text || "",
                age: familyMemberHistory?.ageAge?.value?.toString() || "",
                conditions: sConditions
            };
        });
    }, [familyMemberHistory]);

    const columns: Column<TableColumns>[] = React.useMemo(() => { 
        return [
            { Header: 'Relationship', accessor: 'relationship', sortType: sortCode },
            { Header: 'Name', accessor: 'name', sortType: "string" },
            { Header: 'Sex', accessor: 'sex', sortType: "string" },
            { Header: 'Age', accessor: 'age', sortType: "string" },
            { Header: 'Conditions', accessor: 'conditions', sortType: "string" },
        ];
    }, [sortCode]);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold pb-5">Family History</h1>

            {/* Error Message */}
            {elErrorMessage}

            {/* Loading Spinner */}
            {elLoadingSpinner}

            {/* Family Member History Table */}
            {isDataLoaded && !hasErrorLoading ?
                <Table columns={columns} data={data} />
                : null
            }
        </div>
    );
}

/** 
 * Definition of columns for the table 
 * Property names should match the "accessor" in the table columns
*/
type TableColumns = { 
    relationship: JSX.Element;
    name: string;
    sex: string;
    age: string;
    conditions: string;
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
        <table {...getTableProps()} className="FamilyHistoryTable">
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