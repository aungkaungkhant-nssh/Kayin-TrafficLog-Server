"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { type ReactElement } from "react"
import { ResponsiveContainer } from "recharts"

export type ChartConfig = Record<
    string,
    {
        label: string
        color: string
    }
>

export function ChartContainer({
    children,
    config,
}: {
    children: ReactElement
    config: ChartConfig
}) {
    return (
        <div className="w-full space-y-4 overflow-hidden">
            <ResponsiveContainer width="100%" height={300}>
                {children}
            </ResponsiveContainer>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                {Object.entries(config).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                        <span
                            className="h-3 w-3 rounded-sm"
                            style={{ backgroundColor: value.color }}
                        />
                        <span className="text-muted-foreground">{value.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function ChartTooltip({
    content,
    ...props
}: React.ComponentProps<typeof Tooltip> & {
    content: ReactElement
}) {
    return (
        <TooltipProvider>
            <Tooltip {...props}>
                <TooltipTrigger asChild>
                    <div className="absolute inset-0" />
                </TooltipTrigger>
                <TooltipContent>{content}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

// This is the right signature for Recharts custom tooltips
type ChartTooltipContentProps = {
    active?: boolean
    payload?: any[]
    label?: string
    config?: ChartConfig
    nameKey?: string
    hideLabel?: boolean
}

export function ChartTooltipContent({
    active,
    payload,
    config = {},
    nameKey = "name",
    hideLabel = false,
}: ChartTooltipContentProps) {
    if (!active || !payload?.length) return null

    const data = payload[0]
    const key = data[nameKey] ?? data.name
    const labelText = config[key]?.label ?? key
    const value = data.value

    return (
        <div className="rounded-md bg-white p-2 shadow border border-blue-900">
            {!hideLabel && (
                <p className="text-sm font-semibold text-blue-900">{labelText}</p>
            )}
            <p className="text-sm text-blue-900">အရေအတွက်: {value}</p>
        </div>
    )
}
