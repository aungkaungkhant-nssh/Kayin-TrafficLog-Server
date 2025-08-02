"use client"

import { useEffect, useState, useTransition } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, Tooltip, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltipContent,
} from "@/components/ui/chart"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { client } from "@/server/client"

export const description = "A bar chart with a label"

const chartConfig = {} satisfies ChartConfig

export function ChartBarLabel() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 4 }, (_, i) => currentYear - i);
    const [year, setYear] = useState(currentYear.toString())
    const [isPending, startTransition] = useTransition();
    const [data, setData] = useState([])

    useEffect(() => {
        startTransition(async () => {
            const res = await client.get(`/api/dashboard/chart?year=${year}`);
            if (res.status === 200) {
                setData(res.data)
            }

        })
    }, [year])
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>လစဉ် ပြစ်မှုအရေအတွက်ပြဇယား</CardTitle>
                    <Select value={year} onValueChange={(value) => setYear(value)}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((yr) => (
                                <SelectItem key={yr} value={yr.toString()}>
                                    {yr}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                {isPending ? (
                    <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                        Loading chart...
                    </div>
                ) : (
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            data={data}
                            margin={{ top: 20 }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <Tooltip
                                content={<ChartTooltipContent
                                    config={chartConfig}
                                    nameKey="count"
                                    hideLabel={true}
                                />}
                            />
                            <Bar dataKey="count" fill="hsl(240 100% 25%)" radius={8}>
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>

        </Card>
    )
}
