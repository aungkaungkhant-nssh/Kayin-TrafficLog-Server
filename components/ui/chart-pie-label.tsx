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

type ChartDataItem = {
    categoryName: string
    count: number
    fill: string
}

type ChartPieLabelListProps = {
    chartData: ChartDataItem[]
}



const chartConfig = {
    ကား: {
        label: "ကား",
        color: "hsl(240 100% 25%)",      // Navy Blue
    },
    ဆိုင်ကယ်: {
        label: "ဆိုင်ကယ်",
        color: "hsl(10 80% 45%)",        // Strong Red-Orange
    },
    သုံးဘီး: {
        label: "သုံးဘီး",
        color: "hsl(140 60% 40%)",       // Deep Green
    },
    ထော်လာဂျီ: {
        label: "ထော်လာဂျီ",
        color: "hsl(45 100% 50%)",       // Golden Yellow
    }
} satisfies ChartConfig

export function ChartPieLabelList({ chartData }: ChartPieLabelListProps) {

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
                                nameKey="categoryName"
                                hideLabel={true}
                            />}
                        />
                        <Pie data={chartData} dataKey="count">
                            <LabelList
                                dataKey="categoryName"
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
