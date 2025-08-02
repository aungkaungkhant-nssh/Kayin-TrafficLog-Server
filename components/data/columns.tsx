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
    seizureRecordCount: number | null
}

// const ActionCell = ({ row }: { row: Row<Schedule> }) => {

//     const { showModel } = useScheduleModelStore();
//     const scheduleId = row.original.scheduleId;
//     const handleDelete = async () => {
//         try {
//             // await deleteSchedule(scheduleId);
//             toast.success("Success Delete Schedule")
//         } catch {
//             toast.error("Unexpected Error occur")
//         }
//     }
//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="h-10 w-10 p-1 rounded-md hover:bg-gray-100">
//                     <span className="sr-only">Open menu</span>
//                     <MoreHorizontal />
//                 </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="rounded-md shadow-lg p-2 bg-white border border-gray-200">
//                 <DropdownMenuItem
//                     className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
//                     onClick={() => {
//                         showModel({
//                             isOpen: true,
//                             isEdit: true,
//                             id: scheduleId
//                         })

//                     }}
//                 >
//                     ✏️ Edit Schedule
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />
//                 <DropdownMenuItem
//                     className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-100 text-red-600"
//                     onClick={handleDelete}
//                 >
//                     🗑️ Delete Schedule
//                 </DropdownMenuItem>
//             </DropdownMenuContent>
//         </DropdownMenu>

//     )
// }

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
        cell: ({ row }) => row.getValue("နေရပ်လိပ်စာ") || "-",
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
                    {`${englishToMyanmar(row.getValue("seizureRecordCount"))} ကြိမ်` || "-"}
                </span>
            );
        },
    }
];