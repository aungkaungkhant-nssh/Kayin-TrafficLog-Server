"use client"
import { ColumnDef } from "@tanstack/react-table"

export type Schedule = {
    စဉ်: number,
    အရေးယူရက်စွဲ: string,
    ယာဉ်အမှတ်: string
    အမျိုးအမည်: string | null,
    နေရာ: string | null,
    ယာဉ်မောင်းအမည်: string,
    မှတ်ပုံတင်အမှတ်: string | null,
    အဘအမည်: string | null,
    နေရပ်လိပ်စာ: string | null,
    ပုဒ်မ: string | null,
    ပုဒ်မအကြောင်းအရာ: string | null,
    အရေးယူအရာရှိ: string | null,
    ဒဏ်ဆောင်ရက်: string | null,
    ရာကြီးအမှတ်: string | null,
    ဒဏ်ကြေး: string | null,
    သိမ်းဆည်းပစ္စည်း: string | null

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
        accessorKey: "စဉ်",
        header: "စဉ်",
    },
    {
        accessorKey: "အရေးယူရက်စွဲ",
        header: "အရေးယူရက်စွဲ",
    },
    {
        accessorKey: "ယာဉ်အမှတ်",
        header: "ယာဉ်အမှတ်",
    },
    {
        accessorKey: "အမျိုးအမည်",
        header: "အမျိုးအမည်",
        cell: ({ row }) => row.getValue("အမျိုးအမည်") || "-",
    },
    {
        accessorKey: "နေရာ",
        header: "နေရာ",
        cell: ({ row }) => row.getValue("နေရာ") || "-",
    },
    {
        accessorKey: "ယာဉ်မောင်းအမည်",
        header: "ယာဉ်မောင်းအမည်",
    },
    {
        accessorKey: "မှတ်ပုံတင်အမှတ်",
        header: "မှတ်ပုံတင်အမှတ်",
        cell: ({ row }) => row.getValue("မှတ်ပုံတင်အမှတ်") || "-",
    },
    {
        accessorKey: "အဘအမည်",
        header: "အဘအမည်",
        cell: ({ row }) => row.getValue("အဘအမည်") || "-",
    },
    {
        accessorKey: "နေရပ်လိပ်စာ",
        header: "နေရပ်လိပ်စာ",
        cell: ({ row }) => row.getValue("နေရပ်လိပ်စာ") || "-",
    },
    {
        accessorKey: "ပုဒ်မ",
        header: "ပုဒ်မ",
        cell: ({ row }) => row.getValue("ပုဒ်မ") || "-",
    },
    {
        accessorKey: "ပုဒ်မအကြောင်းအရာ",
        header: "ပုဒ်မအကြောင်းအရာ",
        cell: ({ row }) => row.getValue("ပုဒ်မအကြောင်းအရာ") || "-",
    },
    {
        accessorKey: "အရေးယူအရာရှိ",
        header: "အရေးယူအရာရှိ",
        cell: ({ row }) => row.getValue("အရေးယူအရာရှိ") || "-",
    },
    {
        accessorKey: "ဒဏ်ဆောင်ရက်",
        header: "ဒဏ်ဆောင်ရက်",
        cell: ({ row }) => row.getValue("ဒဏ်ဆောင်ရက်") || "-",
    },
    {
        accessorKey: "ရာကြီးအမှတ်",
        header: "ရာကြီးအမှတ်",
        cell: ({ row }) => row.getValue("ရာကြီးအမှတ်") || "-",
    },
    {
        accessorKey: "ဒဏ်ကြေး",
        header: "ဒဏ်ကြေး",
        cell: ({ row }) => row.getValue("ဒဏ်ကြေး") || "-",
    },
    {
        accessorKey: "သိမ်းဆည်းပစ္စည်း",
        header: "သိမ်းဆည်းပစ္စည်း",
        cell: ({ row }) => row.getValue("သိမ်းဆည်းပစ္စည်း") || "-",
    },
];