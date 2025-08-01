"use client"

import { useState } from "react"
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

export const description = "A bar chart with a label"

const allChartData = {
    2023: [
        { month: "January", count: 120 },
        { month: "February", count: 210 },
        { month: "March", count: 170 },
        { month: "April", count: 90 },
        { month: "May", count: 140 },
        { month: "June", count: 155 },
    ],
    2024: [
        { month: "January", count: 186 },
        { month: "February", count: 305 },
        { month: "March", count: 237 },
        { month: "April", count: 73 },
        { month: "May", count: 209 },
        { month: "June", count: 214 },
    ]
}

const chartConfig = {} satisfies ChartConfig

export function ChartBarLabel() {
    const [year, setYear] = useState("2024")

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
                            {Object.keys(allChartData).map((yr) => (
                                <SelectItem key={yr} value={yr}>
                                    {yr}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        data={allChartData[year]}
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
            </CardContent>
        </Card>
    )
}
