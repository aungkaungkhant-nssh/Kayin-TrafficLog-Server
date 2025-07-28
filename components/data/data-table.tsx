"use client"

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
} from "@/components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "../ui/input";
import { LIMIT } from "@/utils/constant/limit";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    scheduleTitle: string,
    meta: {
        totalCount: number,
        hasNextPage: boolean
    }
    currentPage: number,
    showPagination: boolean,
    showSearch?: boolean,
    showButton?: boolean,
    buttonText?: string,
    buttonRedirectPath?: string; // pass from serve
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
    buttonRedirectPath
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });
    const router = useRouter();
    const totalPages = Math.ceil(meta.totalCount / LIMIT);
    const handleButtonClick = () => {
        if (buttonRedirectPath) {
            router.push(buttonRedirectPath);
        } else {
            console.log("Button clicked with no redirect");
        }
    };
    return (
        <div className="rounded-md  w-full">
            <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-1">
                    <h1 className="font-bold">{scheduleTitle}</h1>
                </div>
                {
                    showSearch && (
                        <Input
                            placeholder="Search"
                            value={(table.getColumn("teacher_name")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("teacher_name")?.setFilterValue(event.target.value)
                            }
                            className="max-w-44 md:max-w-sm"
                        />
                    )
                }

                {showButton && (
                    <Button
                        onClick={handleButtonClick}
                    >
                        <span>{buttonText}</span>
                    </Button>
                )}

            </div>
            <Table className="w-full table-auto border">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="table-row">
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className={"w-[200px]"}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="my-3">
                {
                    showPagination && (
                        <Pagination>
                            <PaginationContent>
                                {
                                    currentPage !== 1 && (
                                        <PaginationItem>
                                            <PaginationPrevious href={`?page=${currentPage - 1}`} />
                                        </PaginationItem>
                                    )
                                }
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
                                {
                                    meta.hasNextPage && (
                                        <PaginationItem>
                                            <PaginationNext href={`?page=${currentPage + 1}`} />
                                        </PaginationItem>
                                    )
                                }

                            </PaginationContent>
                        </Pagination>
                    )
                }


            </div>
        </div >
    )
}
