"use client"

import * as React from "react"
import { Eye } from "lucide-react"
import Link from "next/link"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import router from "next/router"

const data: topTen[] = [
  {
    "id": "m5gr84i9",
    "progress": 90,
    "addition": 101,
    "email": "ken99@yahoo.com",
    "deletion": 1000
  },
  {
    "id": "3u1reuv4",
    "progress": 10,
    "addition": 102,
    "email": "Abe45@gmail.com",
    "deletion": 100
  },
  {
    "id": "derv1ws0",
    "progress": 1,
    "addition": 103,
    "email": "Monserrat44@gmail.com",
    "deletion": 400
  },
  {
    "id": "5kma53ae",
    "progress": 22,
    "addition": 104,
    "email": "Silas22@gmail.com",
    "deletion": 300
  },
  {
    "id": "bhqecj4p",
    "progress": 54,
    "addition": 105,
    "email": "carmella@hotmail.com",
    "deletion": 120
  },
  {
    "id": "bhqecj4p",
    "progress": 54,
    "addition": 105,
    "email": "carmella@hotmail.com",
    "deletion": 120
  },
  {
    "id": "bhqecj4p",
    "progress": 54,
    "addition": 105,
    "email": "carmella@hotmail.com",
    "deletion": 120
  },
  {
    "id": "bhqecj4p",
    "progress": 54,
    "addition": 105,
    "email": "carmella@hotmail.com",
    "deletion": 120
  },
  {
    "id": "bhqecj4p",
    "progress": 54,
    "addition": 105,
    "email": "carmella@hotmail.com",
    "deletion": 120
  },
  {
    "id": "bhqecj4p",
    "progress": 54,
    "addition": 105,
    "email": "carmella@hotmail.com",
    "deletion": 120
  }
]


export type topTen = {
  id: string
  progress: number
  addition: number
  deletion: number
  email: string
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
          Lines of Code Added
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-green font-medium">+{row.getValue("addition")}</div>,
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
          Lines of Code Deleted
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-red font-medium">-{row.getValue("deletion")}</div>,
  },
  {
    accessorKey: "progress",
    header: () => <div className="text-left">Progress</div>,
    cell: ({ row }) => {
      const progress = parseFloat(row.getValue("progress"))

      return <div className="text-left pr-0 font-medium">%{progress}</div>
    },
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
        const email = row.getValue("email") as string;
        const username = email.split('@')[0]; 
        router.push(`/developers/${username}`);
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

export function DevList() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
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
          <h2 className="ml-1 text-xl font-bold text-black">All Developers (325)</h2>
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-2 w-full md:w-auto">
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
          <TableBody >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
