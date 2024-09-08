/* eslint-disable react/prop-types */
"use client"
import { useState } from "react";
import { useTable } from "react-table";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useEffect } from "react"
import { useDataForPage } from "@/hooks/useDataQueries";
const TableWithPageComponentV2 = ({ columns }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    // eslint-disable-next-line no-unused-vars
    const { data: dataPage, isLoading } = useDataForPage(currentPage, itemsPerPage);

    console.log("Data page", dataPage)
    const reArragangeDataPage = dataPage?.items.map((item) => {
        const newItem = Object.keys(item).reduce((acc, key) => {
            if (key === 'month') {
                acc.date = item[key]; 
            } else {
                acc[key] = item[key]; 
            }
            return acc;
        }, {});
    
        return newItem;
    });
    
    console.log("reArragangeDataPage: ", reArragangeDataPage)
    const tableInstance = useTable({ columns, data: reArragangeDataPage || [] });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
    // console.log("Rows: ", rows)
    // console.log("Column", columns)
    const pageCount = dataPage?.totalPages || 0;
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };
    return (
        <>
            <table
                {...getTableProps()}
                className="w-full border-collapse text-left"
            >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    className="bg-teal-300 text-white p-3 border border-gray-300 text-center"
                                    key={column.id}
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.length > 0 ? rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="text-black" key={row.id}>
                                    {row.cells.map((cell, index) => (
                                        <td
                                            {...cell.getCellProps()}
                                            className="p-3 bg-white border border-gray-300"
                                            style={{ textAlign: index === 0 ? "left" : "center" }}
                                            key={cell.id}
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        }) : (
                            <h1>Fake fetching!</h1>
                        )
                    }
                </tbody>
            </table>
            <div className="pagination flex justify-center py-4 bg-white">
                <ReactPaginate
                    previousLabel={<ChevronLeft color="white"></ChevronLeft>}
                    nextLabel={<ChevronRight color="white"></ChevronRight>}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"flex space-x-2"}
                    activeClassName={"text-orange-400"}
                    pageClassName={"px-3 py-1 rounded"}
                    activeLinkClassName={"text-orange-400 font-bold"}
                    previousClassName={`px-1 py-1 rounded ${currentPage === 0 ? "opacity-50 bg-gray-400" : "bg-orange-400"}`}
                    nextClassName={`px-1 py-1 rounded ${currentPage + 1 === pageCount ? "opacity-50 bg-gray-400" : "bg-orange-400"}`}
                />
            </div>
        </>
    );
}


export default TableWithPageComponentV2