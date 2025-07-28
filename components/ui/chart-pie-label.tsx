"use client"
import { LabelList, Pie, PieChart, Tooltip } from "recharts"

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

export const description = "A pie chart with a label list"

const chartData = [
    { browser: "car", visitors: 275, fill: "hsl(240 100% 25%)" },
    { browser: "cycle", visitors: 200, fill: "hsl(10 80% 45%)" },
    { browser: "oway", visitors: 173, fill: "hsl(140 60% 40%)" },
    { browser: "hlgyi", visitors: 90, fill: "hsl(45 100% 50%" },
]

const chartConfig = {
    car: {
        label: "ကား",
        color: "hsl(240 100% 25%)",      // Navy Blue
    },
    cycle: {
        label: "ဆိုင်ကယ်",
        color: "hsl(10 80% 45%)",        // Strong Red-Orange
    },
    oway: {
        label: "သုံးဘီး",
        color: "hsl(140 60% 40%)",       // Deep Green
    },
    hlgyi: {
        label: "ထော်လာဂျီ",
        color: "hsl(45 100% 50%)",       // Golden Yellow
    }
} satisfies ChartConfig

export function ChartPieLabelList() {

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>ယာဉ်အလိုက် အရေးယူမှုပြအခြေအနေ</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                >
                    <PieChart>
                        <Tooltip
                            content={<ChartTooltipContent
                                config={chartConfig}
                                nameKey="browser"
                                hideLabel={true}
                            />}
                        />
                        <Pie data={chartData} dataKey="visitors">
                            <LabelList
                                dataKey="browser"
                                className="fill-background"
                                stroke="none"
                                fontSize={12}
                                formatter={(value: keyof typeof chartConfig) =>
                                    chartConfig[value]?.label
                                }
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
