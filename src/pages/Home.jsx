"use client"
import { DatePickerWithRange } from "@/widget/Datepicker"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select"

import { ChartNoAxesCombined } from 'lucide-react';
import { Grid3X3 } from 'lucide-react';
import Chart from "../widget/Chart";
import TableComponent from "@/widget/Table";
import CatalogComponent from "@/widget/Catalog";
import { useEffect, useMemo, useState } from "react";
// eslint-disable-next-line no-unused-vars
import TableWithPageComponent from "@/widget/TableWithPage";
import { useDataCategory, useDataMain } from '../hooks/useDataQueries'
import TableWithPageComponentV2 from "@/widget/TableWithPageV2";


const Home = () => {

    // eslint-disable-next-line no-unused-vars
    // const data = useMemo(
    //     () => [
    //         { date: "10/08/2020", categoryA: "335.00", categoryB: "40.00", categoryC: "335.00" },
    //         { date: "31/07/2020", categoryA: "120.00", categoryB: "230.88", categoryC: "125.95" },
    //         { date: "21/07/2020", categoryA: "110.23", categoryB: "120.00", categoryC: "25.00" },
    //         { date: "11/07/2020", categoryA: "10.23", categoryB: "56.00", categoryC: "10.34" },
    //         { date: "01/07/2020", categoryA: "110.23", categoryB: "456.00", categoryC: "111.45" },
    //         { date: "05/09/2020", categoryA: "200.00", categoryB: "100.00", categoryC: "250.00" },
    //         { date: "15/09/2020", categoryA: "150.50", categoryB: "300.75", categoryC: "175.20" },
    //         { date: "25/09/2020", categoryA: "80.00", categoryB: "220.00", categoryC: "130.00" },
    //         { date: "10/10/2020", categoryA: "500.00", categoryB: "600.00", categoryC: "700.00" },
    //         { date: "20/10/2020", categoryA: "300.00", categoryB: "400.00", categoryC: "500.00" },
    //         { date: "30/10/2020", categoryA: "420.00", categoryB: "340.00", categoryC: "460.00" },
    //         { date: "05/11/2020", categoryA: "330.00", categoryB: "200.00", categoryC: "280.00" },
    //         { date: "15/11/2020", categoryA: "270.00", categoryB: "180.00", categoryC: "190.00" },
    //         { date: "25/11/2020", categoryA: "350.00", categoryB: "240.00", categoryC: "310.00" },
    //         { date: "10/12/2020", categoryA: "400.00", categoryB: "300.00", categoryC: "500.00" },
    //         { date: "20/12/2020", categoryA: "200.00", categoryB: "150.00", categoryC: "175.00" },
    //     ],
    //     []
    // );

    const columns = useMemo(() => [
        { Header: "Ngày", accessor: "date" },
    ], []);

    const columnsV2 = useMemo(() => [
        { Header: "Ngày", accessor: "date" },
    ], []);


    // eslint-disable-next-line no-unused-vars
    const [dataCatalog, setDataCatalog] = useState([])
    const [columnsData, setColumnsData] = useState([])
    const [isUseChart, setIsUseChart] = useState(true)
    const [dateSearch, setDateSearch] = useState()
    const [selectedCatalog, setSelectedCatalog] = useState('');
    const [searchParams, setSearchParams] = useState({ date: null, catalog: null });
    const [columnTable, setColumnTable] = useState([])

    const { data: categories, isLoading: isLoadingCategories } = useDataCategory();
    const { data: dataCate, isLoading: isLoadingDataCate } = useDataMain()

    useEffect(() => {
        // console.log(dataCate)
        if (!isLoadingDataCate && dataCate && dataCate.length > 0) {
            const mappedData = dataCate.map((cateItem) => ({
                date: cateItem.month,
                categoryA: cateItem.A.toString(),
                categoryB: cateItem.B.toString(),
                categoryC: cateItem.C.toString(),
            }));
            setDataCatalog(mappedData);
        }
        // console.log(dataCate)

    }, [dataCate, isLoadingDataCate]);

    useEffect(() => {
        // console.log(categories)
        if (categories && categories.length > 0) {
            const mappedDataCate = categories.map((cate) => ({
                Header: `Danh mục ${cate.name_cate}`,
                accessor: `category${cate.name_cate}`,
                color: cate.color
            }));
            columns.push(...mappedDataCate)

            const mappedDataCatev2 = categories.map((cate) => ({
                Header: `Danh mục ${cate.name_cate}`,
                accessor: `${cate.name_cate}`,
                color: cate.color
            }));

            console.log("columnsV2", columnsV2)
            columnsV2.push(...mappedDataCatev2)
        }


        setColumnTable(columnsV2)
        setColumnsData(columns);
    }, [categories, isLoadingCategories]);
    const handleSearch = () => {
        setSearchParams({
            date: dateSearch,
            catalog: selectedCatalog
        });

    }
    const handleDateChange = (date) => {
        setDateSearch(date);
    }
    const handleSelectCatalog = (value) => {
        setSelectedCatalog(value);
    };
    if (isLoadingCategories || isLoadingDataCate) {
        return <div>Loading...</div>;
    }
    return <div className="home p-8 flex flex-col gap-8 bg-[#DBDFE1]">
        <div className="wrap-home">
            <nav className=" bg-white rounded-sm">
                <div className="wrap-nav flex w-full justify-between items-center py-2 px-4 flex-wrap">
                    <div className="nav-left flex gap-8 flex-wrap">
                        <div className="nav-left-select">
                            <Select onValueChange={handleSelectCatalog}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue className="text-[#E87722] placeholder:text-[#E87722]" placeholder="Tất cả danh mục" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup >
                                        <SelectLabel>Danh mục</SelectLabel>
                                        <SelectItem value="ALL"><span className="text-[#E87722]">Tất cả danh mục</span></SelectItem>
                                        <SelectItem value="A"><span className="text-[#E87722]">Danh mục A</span></SelectItem>
                                        <SelectItem value="B"><span className="text-[#E87722]">Danh mục B</span></SelectItem>
                                        <SelectItem value="C"><span className="text-[#E87722]">Danh mục C</span></SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="nav-left-date">
                            <DatePickerWithRange onDateChange={handleDateChange} ></DatePickerWithRange>
                        </div>

                        <div className="nav-left-search">
                            <button onClick={handleSearch} className="bg-[#E87722] px-8 py-2 rounded-md text-white font-bold hover:opacity-80 duration-200 ease-linear">TRA CỨU</button>
                        </div>
                    </div>
                    <div className="nav-right flex gap-4">
                        <ChartNoAxesCombined onClick={() => setIsUseChart(true)} className="cursor-pointer duration-200 "
                            style={{ color: isUseChart ? "#E87722" : "black" }}
                        ></ChartNoAxesCombined>
                        <Grid3X3 onClick={() => setIsUseChart(false)} style={{ color: isUseChart ? "black" : "#E87722" }} className="cursor-pointer duration-200"></Grid3X3>
                    </div>
                </div>
            </nav>

            <div className="body flex flex-col gap-4 justify-center w-full mt-4">
                <div className="chart-body w-full flex flex-col justify-center items-center ">
                    {isUseChart ? (
                        <>
                            <div className="wrap-nav-chart w-full flex justify-end bg-white px-4 py-3 ">
                                <div className="nav-chart flex gap-6">
                                    {
                                        categories.map((cate, index) => (
                                            <div className="nav-chart-1 flex items-center gap-2" key={index}>
                                                <span>Danh mục {cate.name_cate}</span>
                                                <div className="chart-1-color w-4 h-4" style={{
                                                    backgroundColor: cate.color
                                                }}></div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <Chart dataChart={dataCate} chartSetup={categories} objFilter={searchParams} ></Chart></>
                    ) : <div className="container mx-auto">
                        {/* {columnsData &&   <TableWithPageComponent columns={columnsData} data={dataCatalog} />} */}
                        {columnsData && <TableWithPageComponentV2 columns={columnTable} />}
                    </div>}
                </div>
                <div className="table-body w-full justify-center flex">
                    <TableComponent dataTable={dataCate} dataCate={categories} ></TableComponent>
                </div>
                <div className="catalog-body">
                    <CatalogComponent></CatalogComponent>
                </div>
            </div>
        </div>
    </div>
}


export default Home