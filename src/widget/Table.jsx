import { useEffect, useState } from "react"

import { useDataCategory, useDataMain } from "@/hooks/useDataQueries";


const TableComponent = () => {
    // eslint-disable-next-line no-unused-vars
    const { data: categories, isLoading: isLoadingCategories } = useDataCategory();
    // eslint-disable-next-line no-unused-vars
    const { data: dataCate, isLoading: isLoadingDataCate } = useDataMain()

    const [data, setData] = useState(dataCate)
    const [cate, setCate] = useState(categories)


    useEffect(() => {
        setData(dataCate)
        setCate(categories)
    }, [])



    return <div className="table w-full">
        <table className="w-full border-collapse text-left">
            <thead>
                <tr>
                    <th className="bg-teal-300 text-white p-3 border border-gray-300">Tên danh mục</th>
                    <th className="bg-teal-300 text-white p-3 text-center border border-gray-300 font-bold">Ngày bắt đầu</th>
                    <th className="bg-teal-300 text-white p-3 text-center border border-gray-300 font-bold">Ngày kết thúc</th>
                    <th className="bg-teal-300 text-white p-3 text-center border border-gray-300 font-bold">Tăng/Giảm (%)</th>
                </tr>
            </thead>
            <tbody>
                {
                    cate.map((item, index) => (
                        <tr key={index} className=" text-white">
                            <td className="p-3 bg-emerald-900 border  border-gray-300 text-[#E87722] " >Danh mục {item.name_cate}</td>
                            <td className="p-3 border border-gray-300 text-center text-orange-500 bg-white ">{data[0][item.name_cate]}</td>
                            <td className="p-3 border border-gray-300 text-center text-orange-500 bg-white ">{data[data.length - 1][item.name_cate]}</td>
                            <td className="p-3 border border-gray-300 text-center text-orange-500 bg-white ">{((((data[data.length - 1][item.name_cate] - data[0][item.name_cate])) / data[0][item.name_cate]) * 100).toFixed(0)}%</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
}

export default TableComponent