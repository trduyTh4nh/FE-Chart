/* eslint-disable no-unused-vars */

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
} from "../components/ui/card"
import {

    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { convertDate } from "@/tools"
export const description = "A multiple line chart"

const chartData = [
    { month: "01/07", A: 186, B: 80, C: 100 },
    { month: "11/07", A: 120, B: 200, C: 44 },
    { month: "21/07", A: 237, B: 120, C: 32 },
    { month: "31/07", A: 73, B: 190, C: 82 },
    { month: "10/08", A: 209, B: 130, C: 66 },

]

const chartConfig = {
    A: {
        label: "A",
        color: "hsl(var(--chart-1))",
    },
    B: {
        label: "B",
        color: "hsl(var(--chart-2))",
    },
    C: {
        label: "C",
        color: "hsl(var(--chart-3))",
    },
}

const Chart = ({ dataChart, chartSetup, objFilter }) => {
    const [originalChartSetup, setOriginalChartSetup] = useState(chartSetup);
    // eslint-disable-next-line no-unused-vars
    const [originalChartData, setOriginalChartData] = useState(dataChart);
    const [dataChartMain, setDataChartMain] = useState()
    const [chartConf, setChartConf] = useState()
    const [arrChartConf, setArrChartConf] = useState()

    useEffect(() => {
        setDataChartMain(dataChart)
    }, [dataChart])

    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        setArrChartConf(chartSetup)
        const objectConfig = chartSetup.reduce((acc, item) => {
            acc[item.name_cate] = {
                label: item.name_cate,
                color: item.color
            }
            return acc
        }, {})
        // console.log(arrChartConf)
        setChartConf(objectConfig)
    }, [chartSetup])

    // useEffect(() => {
    //     if (objFilter) {
    //         const catalogFilter = objFilter.catalog;
    //         console.log(objFilter)

    //         if (catalogFilter) {

    //             if (catalogFilter === 'ALL') {
    //                 setArrChartConf(originalChartSetup);
    //             } else {
    //                 const filterCate = originalChartSetup.filter((item) => item.name_cate === catalogFilter);
    //                 setArrChartConf(filterCate);
    //             }
    //         }

    //         else {
    //             setArrChartConf(originalChartSetup);
    //         }
    //     }
    // }, [objFilter, originalChartSetup]);



    useEffect(() => {
        if (objFilter) {
            const catalogFilter = objFilter.catalog;
            // console.log(objFilter)
            if (catalogFilter) {
                if (catalogFilter === 'ALL') {
                    setArrChartConf(originalChartSetup);
                } else {
                    const filterCate = originalChartSetup.filter((item) => item.name_cate === catalogFilter);
                    setArrChartConf(filterCate);
                }
            }
            else {
                setArrChartConf(originalChartSetup);
            }
        }

    }, [objFilter, originalChartSetup]);

    useEffect(() => {
        if (objFilter) {
            const { from, to } = objFilter.date ?? { from: "", to: "" };

            if (from !== "" && to !== "") {
                const fromDate = new Date(from).getTime();
                const toDate = new Date(to).getTime();

                const newFilterData = originalChartData.filter((item) => {
                    const itemDate = new Date(convertDateV2(item.month)).getTime();
                    return itemDate >= fromDate && itemDate <= toDate;
                });
                setDataChartMain(newFilterData);

                // console.log(newFilterData);
            } else {
                setDataChartMain(originalChartData);
            }
        }
    }, [objFilter, originalChartData]);



    const convertDateV2 = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    };


    return <div className="chart w-[100%] h-[50%]">
        <Card>
            <CardContent>
                {chartConf && (
                    <ChartContainer config={chartConf}>
                        <LineChart
                            accessibilityLayer
                            data={dataChartMain ? dataChartMain : chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

                            {arrChartConf && arrChartConf.map((itemData) => (
                                <Line
                                    key={itemData.name_cate}
                                    dataKey={itemData.name_cate}
                                    type="monotone"
                                    stroke={`var(--color-${itemData.name_cate})`}
                                    strokeWidth={2}
                                    dot={false}
                                />
                            ))}
                        </LineChart>
                    </ChartContainer>)}
            </CardContent>
        </Card>
    </div>
}

export default Chart