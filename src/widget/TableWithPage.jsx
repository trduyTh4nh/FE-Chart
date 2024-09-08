/* eslint-disable react/prop-types */
"use client"
import { useState } from "react";
import { useTable } from "react-table";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TableWithPageComponent = ({ columns, data }) => {

 
    const tableInstance = useTable({ columns, data })
    const [currentPage, setCurrentPage] = useState(0)

    const itemsPerPage = 5


    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

    const pageCount = Math.ceil(rows.length / itemsPerPage)



    // currentPerpage là 0 * itemperpage là 5 => = 0
    // => vậy thì slice(0, __)
    // currentPage + 1 là 0 + 1 * itemPerPage là 5  => - 5
    // => currentItem sẽ bằng slice(0, 5) nghĩa là lấy 5 phần tử đầu tiên của mảng 
    const currentItem = rows.slice(currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    console.log("currentItem", currentItem)
    console.log("rows", rows)
    console.log("columns", columns)

    const handlePageClick = (event) => {
        setCurrentPage(event.selected)
    }

    return (
        <>
            <table
                {...getTableProps()}
                className="w-full border-collapse text-left"
            >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        // eslint-disable-next-line react/jsx-key
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                // eslint-disable-next-line react/jsx-key
                                <th
                                    {...column.getHeaderProps()}
                                    className="bg-teal-300 text-white p-3 border border-gray-300 text-center"
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {currentItem.map((row) => {
                        prepareRow(row);
                        return (
                            // eslint-disable-next-line react/jsx-key
                            <tr {...row.getRowProps()} className="text-black">
                                {row.cells.map((cell, index) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <td
                                        {...cell.getCellProps()}
                                        className="p-3 bg-white border border-gray-300"
                                        style={{ textAlign: index === 0 ? "left" : "center" }}
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
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
                    previousClassName={`px-1 bg- py-1  rounded ${currentPage === 0 ? " opacity-50 bg-gray-400" : "bg-orange-400"} `}
                    nextClassName={`px-1 bg- py-1  rounded ${currentPage + 1 === pageCount ? " opacity-50 bg-gray-400" : "bg-orange-400"}`}
                />
            </div>
        </>
    );

}


export default TableWithPageComponent