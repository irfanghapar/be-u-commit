"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Eye, ArrowUpDown, ChevronDown } from "lucide-react"
import Link from "next/link"
import { format } from 'date-fns'
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { listDevelopers, Developer } from "@/features/developers/services/listDev";
import { fetchDeveloperLinesChanges, processLinesChangesData } from "../../services/topTen";

export type TopTen = {
  id: string
  email: string
  addition: string
  deletion: string
  totalCommits: string
  efficiency: number
}

export type topTen = {
  id: string
  totalCommits: number
  addition: number
  deletion: number
  email: string
  efficiency: number
}



export const columns: ColumnDef<topTen>[] = [
  
  {
    accessorKey: "No",
    header: "No",
    cell: ({ row }) => {
      // Get the index of the row and format it
      const index = row.index + 1;
      return <div>{index.toString().padStart(2, '0')}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left -ml-2 pl-2"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "addition",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left -ml-2 pl-2"
        >
          Added
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-green font-medium">{row.getValue("addition")}</div>,
  },
  {
    accessorKey: "deletion",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left -ml-2 pl-2"
        >
          Deleted
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-red font-medium">{row.getValue("deletion")}</div>,
  },
  {
    accessorKey: "totalCommits",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left -ml-2 pl-2"
        >
          Total Commits
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("totalCommits")}</div>,
  },
  {
    accessorKey: "efficiency",
    header: "Efficiency",
    cell: ({ row }) => <div className="font-medium">-</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    id: "select",
    header: "Actions",
    cell: ({ row }) => {
      const handleViewProfile = () => {
        router.push(`/developers/username`);
      };

      return (
        <Link href={`/developers/username`}>
          <Button
            aria-label="View Developer"
            className="bg-white border hover:bg-primary hover:text-white"
          >
            <Eye className="h-4 w-4" />
            <span className="ml-1">View</span>
          </Button>
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
]

export function TopTenTable() {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [tableData, setTableData] = useState<TopTen[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const developers = await listDevelopers();
        const updatedData = await Promise.all(
          developers.map(async (developer: Developer) => {
            const linesChanges = await fetchDeveloperLinesChanges(developer.id, selectedDate.getFullYear());
            const { added, deleted, rawAdded, rawDeleted } = processLinesChangesData(linesChanges, selectedDate);
            return {
              id: developer.id,
              email: developer.email,
              addition: added,
              deletion: deleted,
              totalCommits: '',
              efficiency: 0,
              rawAdded,
              rawDeleted,
            };
          })
        );
        const filteredData = updatedData.filter(data => data.rawAdded > 0 || data.rawDeleted > 0);
        setTableData(filteredData);
      } catch (error) {
        console.error("Error fetching developer data:", error);
        setError("Failed to fetch developer data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedDate]);

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 w-full mb-8 border">
      <div className="flex flex-col md:flex-row justify-between md:items-center pt-2 pb-4 space-y-4 md:space-y-0">
        <h2 className="text-xl font-bold text-black">Top Ten Developers</h2>
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-2 w-full md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {format(selectedDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="w-auto md:w-80"
          />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      <div className="rounded-md border overflow-hidden">
        <Table className="bg-white rounded-md">
          <TableHeader className="bg-primary text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="rounded" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-white" key={header.id}>
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
                    <TableCell key={cell.id}>
                      {cell.column.id === 'addition' || cell.column.id === 'deletion' ? (
                        <div className={`font-medium ${cell.column.id === 'addition' ? 'text-green' : 'text-red'}`}>
                          {cell.getValue()}
                        </div>
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 pt-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <span className="text-xs">Click View to see developer profile</span>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}