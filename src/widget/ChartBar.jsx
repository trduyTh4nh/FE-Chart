import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { useEffect, useState } from "react"

import { useDataCategory, useDataMain } from "@/hooks/useDataQueries";

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
export const description = "A mixed bar chart"
// eslint-disable-next-line no-unused-vars
const chartData = [
    { browser: "A", percent: -100, fill: "#E87559" },
    { browser: "B", percent: 200, fill: "#4BAB9F" },
    { browser: "C", percent: 187, fill: "#5C747E" },

]
// eslint-disable-next-line no-unused-vars
const chartConfig = {
    A: {
        label: "Danh mục A",
        color: "hsl(var(--chart-1))",
    },
    B: {
        label: "Danh mục B",
        color: "hsl(var(--chart-2))",
    },
    C: {
        label: "Danh mục C",
        color: "hsl(var(--chart-3))",
    },
}
const BarChartComponent = () => {
    // eslint-disable-next-line no-unused-vars
    const { data: categories, isLoading: isLoadingCategories } = useDataCategory();
    // eslint-disable-next-line no-unused-vars
    const { data: dataCate, isLoading: isLoadingDataCate } = useDataMain()

    const [data, setData] = useState()
    // const [cate, setCate] = useState(categories)
    const [chartConf, setChartConf] = useState()

    
    useEffect(() => {
        if (dataCate && categories) {
            // console.log(dataCate)
            const chartDT = categories.map((item) => ({
                browser: item.name_cate,
                percent: parseInt(((((dataCate[dataCate.length - 1][item.name_cate] - dataCate[0][item.name_cate])) / dataCate[0][item.name_cate]) * 100).toFixed(0)),
                fill: item.color
            }))

            setData(chartDT)
            // console.log(chartDT)

        }
    }, [dataCate, categories]);

    useEffect(() => {
        if (categories) {
            const objConfig = categories.reduce((acc, item, index) => {
                acc[item.name_cate] = {
                    label: item.name_cate,
                    color: `hsl(var(--chart-${index}))`
                };
                return acc;
            }, {});
            setChartConf(objConfig);

            // console.log("chart config debug");
            // console.log(objConfig);
        }
    }, [categories]);



    return <div className="bar-chart">
        <h1 className="text-black text-lg mb-4 text-[24px] font-medium">Từ lúc bắt đầu danh mục</h1>
        <Card>
            <CardContent>
                {chartConf && (
                    <ChartContainer config={chartConf}>
                        <BarChart
                            accessibilityLayer
                            data={data}
                            layout="vertical"
                            margin={{ left: -30 }}
                        >
                            <YAxis
                                dataKey="browser"
                                type="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                width={120}
                                tickFormatter={(value) =>
                                    "Danh mục " + chartConf[value]?.label
                                }
                            />
                            <XAxis dataKey="percent" type="number" hide />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar dataKey="percent" layout="vertical" radius={5} />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>


        </Card>
    </div>
}


export default BarChartComponent