"use client"
import { englishToMyanmar } from "@/utils/constant/changeLanguage"
import { ColumnDef } from "@tanstack/react-table"

export type Schedule = {
    no: number
    seized_date: string
    vehicle_number: string
    vehicle_types: string | null
    seizure_location: string | null
    offender_name: string
    national_id_number: string | null
    offender_father_name: string | null
    offender_address: string | null
    article_number: string | null
    offense_name: string | null
    officer_name: string | null
    action_date: string | null
    case_number: number | null
    fine_amount: string | null
    seized_item_name: string | null
    seizureRecordCount?: number | null
}

export const columns: ColumnDef<Schedule>[] = [
    {
        accessorKey: "no",
        header: "စဉ်",
    },
    {
        accessorKey: "seized_date",
        header: "ရက်စွဲ",
        cell: ({ row }) => row.getValue("seized_date") || "-",
    },
    {
        accessorKey: "vehicle_number",
        header: "ယာဉ်အမှတ်",
        cell: ({ row }) => row.getValue("vehicle_number") || "-",
    },
    {
        accessorKey: "vehicle_types",
        header: "အမျိုးအမည်",
        cell: ({ row }) => row.getValue("vehicle_types") || "-",
    },
    {
        accessorKey: "seizure_location",
        header: "နေရာ",
        cell: ({ row }) => row.getValue("seizure_location") || "-",
    },
    {
        accessorKey: "offender_name",
        header: "ယာဉ်မောင်းအမည်",
    },
    {
        accessorKey: "national_id_number",
        header: "မှတ်ပုံတင်အမှတ်",
        cell: ({ row }) => row.getValue("national_id_number") || "-",
    },
    {
        accessorKey: "offender_father_name",
        header: "အဘအမည်",
    },
    {
        accessorKey: "offender_address",
        header: "နေရပ်လိပ်စာ",
        cell: ({ row }) => row.getValue("offender_address") || "-",
    },
    {
        accessorKey: "article_number",
        header: "ပုဒ်မ",
        cell: ({ row }) => row.getValue("article_number") || "-",
    },
    {
        accessorKey: "offense_name",
        header: "ပုဒ်မအကြောင်းအရာ",
        cell: ({ row }) => row.getValue("offense_name") || "-",
    },
    {
        accessorKey: "officer_name",
        header: "အရေးယူအရာရှိ",
        cell: ({ row }) => row.getValue("officer_name") || "-",
    },
    {
        accessorKey: "action_date",
        header: "ဒဏ်ဆောင်ရက်",
        cell: ({ row }) => row.getValue("action_date") || "-",
    },
    {
        accessorKey: "case_number",
        header: "ရာကြီးအမှတ်",
        cell: ({ row }) => row.getValue("case_number") || "-",
    },
    {
        accessorKey: "fine_amount",
        header: "ဒဏ်ကြေး",
        cell: ({ row }) => row.getValue("fine_amount") || "-",
    },
    {
        accessorKey: "seized_item_name",
        header: "သိမ်းဆည်းပစ္စည်း",
        cell: ({ row }) => row.getValue("seized_item_name") || "-",
    },
    {
        accessorKey: "seizureRecordCount",
        header: "အရေအတွက်",
        cell: ({ row }) => {
            return (
                <span
                    className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                >
                    {row.getValue("seizureRecordCount") ? englishToMyanmar(row.getValue("seizureRecordCount")) + "ကြိမ်" : "-"}
                </span>
            );
        },
    }
];