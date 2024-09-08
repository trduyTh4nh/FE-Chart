import BarChartComponent from "./ChartBar"

import { useEffect, useState } from "react"

import { useDataCategory, useDataMain } from "@/hooks/useDataQueries";


// eslint-disable-next-line no-unused-vars
const dataCatalog = [
    {
        id: 1,
        name: "Danh mục A",
        rate: 5.78,
        isUp: true
    },
    {
        id: 2,
        name: "Danh mục B",
        rate: 10.3,
        isUp: true

    },
    {
        id: 3,
        name: "Danh mục C",
        rate: 2.2,
        isUp: false
    }
]

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select"


const CatalogComponent = () => {


    // eslint-disable-next-line no-unused-vars
    const { data: categories, isLoading: isLoadingCategories } = useDataCategory();
    // eslint-disable-next-line no-unused-vars
    const { data: dataCate, isLoading: isLoadingDataCate } = useDataMain()

    const [data, setData] = useState(dataCate)
    const [cate, setCate] = useState(categories)

    const [dataMain, setDataMain] = useState()

    const uniqueMonths = new Set()
    dataCate.forEach(item => {
        // eslint-disable-next-line no-unused-vars
        const [day, month, year] = item.month.split('/')
        const monthYear = `${month}/${year}`
        uniqueMonths.add(monthYear);
    })

    const uniqueMonthsArray = Array.from(uniqueMonths);
    console.log(uniqueMonthsArray);

    console.log(categories)

    useEffect(() => {
        setData(dataCate)
        setCate(categories)


        console.log(data)
        console.log(cate)

        handleSelect(uniqueMonthsArray[uniqueMonthsArray.length - 2])
    }, [])

    const handleSelect = (value) => {
        console.log("Date selected: ", value);

        const filterData = dataCate.filter((item) => {
            // eslint-disable-next-line no-unused-vars
            const [day, month, year] = item.month.split('/');
            const [monthValue, yearValue] = value.split('/');

            const dateItem = new Date(`${year}-${month}-01`);
            const dateValue = new Date(`${yearValue}-${monthValue}-01`);

            return dateItem <= dateValue;
        });

        const reFilterData = categories.map((item, index) => ({
            id: index,
            name: `Danh mục ${item.name_cate}`,
            rate: parseInt((((filterData[filterData.length - 1][item.name_cate] - filterData[0][item.name_cate]) / filterData[0][item.name_cate]) * 100).toFixed(2)),
            isUp: (((filterData[filterData.length - 1][item.name_cate] - filterData[0][item.name_cate]) / filterData[0][item.name_cate]) * 100).toFixed(2) > 0
        }))


        setDataMain(reFilterData)
        console.log("reFilterData: ", reFilterData)
        console.log("Data filtered: ", filterData);
    };




    return <div className="table w-full">
        <table className="w-full border-collapse text-left">
            <thead>
                <tr>
                    <th colSpan="2" className="bg-[#6ECEB2] text-white p-3 border border-gray-300 text-cen">Thay đổi của giá trị danh mục</th>
                </tr>
            </thead>
            <tbody className="">
                <tr className=" wrap-catalog-with-bar text-white flex  ">
                    <td className="p-3 bg-white border flex-1  border-gray-300 text-[#E87722] " >
                        <BarChartComponent ></BarChartComponent>
                    </td>
                    <td className="p-3 bg-white border flex-1  border-gray-300 text-[#E87722]  items-center " >
                        <div className="time-rate flex px-4 py-2 h-full">
                            <div className="time-rate-name flex w-full items-start flex-col gap-4">
                                <div className="rate-header flex justify-between w-full">
                                    <span className="text-black text-[24px] font-medium">Thời gian</span>
                                    <div className="rate-select">
                                        <Select onValueChange={handleSelect}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="6 tháng qua" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Danh mục</SelectLabel>
                                                    {
                                                        uniqueMonthsArray.map((item, index) => (
                                                            <SelectItem key={index} value={item}>{index + 1} tháng qua</SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="rate-name flex flex-col gap-6 w-full justify-center">
                                    {dataMain && dataMain.map((data, index) => (
                                        <div className="warp-rate flex justify-between" key={index}>
                                            <h2 className="text-black text-[20px]" key={data.id}>{data.name}</h2>
                                            <h2 className="text-black text-[20px] text-right" key={data.id}>{data.rate}%</h2>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
}

export default CatalogComponent