import React from 'react'
import { useTable } from "react-table"
import '../../../styles/table.css'

const Table = ({ columns, data, year, month, getDayInfo, tasks }) => {
    // you can get the react table functions by using the hook useTable

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable ({
        columns,
        data,
        year, month, getDayInfo, tasks //custom
    });

    return (
        <div>
        <table id="table" {...getTableProps()}>

            <thead className="theader">
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => {
                    const {render, getHeaderProps} = column
                    return (
                        <th {...getHeaderProps()}>{render("Header")}</th>
                    )
                    })}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>

                {rows.map((row, i) => {
                prepareRow(row);
                return (
                    <tr className="notfirst" {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return (
                            <td className={`cells ${cell.value ? '' : 'hidden'}`} {...cell.getCellProps()}>
                                {cell.render("Cell")}
                            </td>
                        )
                    })}
                    </tr>
                );
                })}
            </tbody>

        </table>
        </div>
    );
};

export default Table