"use client"

import React, { useState, useRef, useEffect } from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

// Your Schedule type
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


function ColumnToggleDropdown({
    columns,
    columnVisibility,
    setColumnVisibility,
}: {
    columns: ColumnDef<Schedule>[]
    columnVisibility: Record<string, boolean>
    setColumnVisibility: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function onClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", onClick)
        return () => document.removeEventListener("mousedown", onClick)
    }, [])

    // Show all columns
    const filteredColumns = columns

    return (
        <div className="relative inline-block text-left" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="inline-flex justify-center items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-haspopup="true"
                aria-expanded={open}
            >
                ကော်လံရွေးချယ်ရန်
                <svg
                    className="ml-2 -mr-1 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={open ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                    />
                </svg>
            </button>

            {open && (
                <div className="absolute z-50 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto">
                    <div className="p-2">
                        {filteredColumns.map((col: any) => {
                            const key = col.accessorKey as string
                            return (
                                <label
                                    key={key}
                                    className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded cursor-pointer select-none"
                                >
                                    <input
                                        type="checkbox"
                                        className="cursor-pointer"
                                        checked={columnVisibility[key] !== false}
                                        onChange={() =>
                                            setColumnVisibility((old) => ({
                                                ...old,
                                                [key]: !(old[key] !== false),
                                            }))
                                        }
                                    />
                                    <span className="text-sm">{col.header}</span>
                                </label>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    scheduleTitle: string
    meta: {
        totalCount: number,
        hasNextPage: boolean,
        totalPages: number
    }
    currentPage: number
    showPagination?: boolean
    showSearch?: boolean
    showButton?: boolean
    buttonText?: string
    buttonRedirectPath?: string,
    toggleableColumnKeys: string[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
    scheduleTitle,
    meta,
    currentPage,
    showPagination = true,
    showSearch = true,
    showButton = true,
    buttonText,
    buttonRedirectPath,
    toggleableColumnKeys
}: DataTableProps<TData, TValue>) {
    // Default visibility: only toggleable columns are visible, others false
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() => {
        const visibility: Record<string, boolean> = {}
        columns.forEach((col: any) => {
            const key = col.accessorKey as string
            // Only columns in toggleableColumnKeys visible by default, others hidden
            visibility[key] = toggleableColumnKeys.includes(key)
        })
        return visibility
    })



    const table = useReactTable({
        data,
        columns,
        state: { columnVisibility },
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    const router = useRouter()
    const totalPages = meta.totalPages

    const handleButtonClick = () => {
        if (buttonRedirectPath) {
            router.push(buttonRedirectPath)
        } else {
            console.log("Button clicked with no redirect")
        }
    }
    const [searchText, setSearchText] = useState("");
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const params = new URLSearchParams()
            if (searchText.trim()) params.set("search", searchText)
            params.set("page", "1") // always reset to page 1 on search
            router.push(`?${params.toString()}`)
        }
    }
    return (
        <div className="rounded-md w-full">
            <div className="flex flex-wrap items-center justify-between gap-2 py-4">
                <h1 className="font-bold text-xl text-primary">{scheduleTitle}</h1>

                <div className="flex items-center gap-3 flex-wrap">
                    <ColumnToggleDropdown
                        columns={columns}
                        columnVisibility={columnVisibility}
                        setColumnVisibility={setColumnVisibility}
                    />
                    {showSearch && (
                        <div>
                            <Input
                                placeholder="Search"
                                value={searchText}
                                onChange={(event) => setSearchText(event.target.value)}
                                onKeyDown={handleKeyDown}
                                className="max-w-44 md:max-w-sm"
                            />
                        </div>

                    )}

                    {showButton && (
                        <Button onClick={handleButtonClick}>
                            <span>{buttonText}</span>
                        </Button>
                    )}
                </div>
            </div>

            {/* Table with horizontal scroll */}
            <div className="w-full overflow-x-auto">
                <Table className="min-w-[1200px] table-auto border border-gray-300 rounded-md overflow-hidden">
                    <TableHeader className="bg-gray-100 sticky top-0 z-20">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="border-b border-gray-300 px-4 py-3 text-left text-base font-semibold text-gray-800"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row, i) => (
                                <TableRow
                                    key={row.id}
                                    className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50`}
                                    data-state={row.getIsSelected() ? "selected" : undefined}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="w-[200px] px-4 py-3 text-base text-gray-900">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500 italic text-base">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>

            </div>

            <div className="my-3">
                {showPagination && (
                    <Pagination>
                        <PaginationContent>
                            {currentPage !== 1 && (
                                <PaginationItem>
                                    <PaginationPrevious href={`?page=${currentPage - 1}`} />
                                </PaginationItem>
                            )}
                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href={`?page=${index + 1}`}
                                        className={currentPage === index + 1 ? "bg-primary text-white" : ""}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            {meta.hasNextPage && (
                                <PaginationItem>
                                    <PaginationNext href={`?page=${currentPage + 1}`} />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    )
}
