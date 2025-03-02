"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import { FileType } from "@/typing"
import { Button } from "../ui/button"
import { TrashIcon } from "lucide-react"
import { useAppStore } from "@/store"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [
    setFileId,
    setFileName,
    setIsDeleteModalOpen,
    setIsRenameModalOpen
    ] = useAppStore((state) => [
        state.setFileId,
        state.setFileName,
        state.setIsDeleteModalOpen,
        state.setIsRenameModalOpen
    ]);


  const openDeleteModal = (fileId: string) => {
    setFileId(fileId);
    setIsDeleteModalOpen(true);
  };

  const openRenameModal = (fileId: string, fileName: string) => {
    setFileId(fileId);
    setFileName(fileName);
    setIsRenameModalOpen(true);
  };

  return (
    <div className="w-full overflow-x-auto">
  <Table className="w-full border border-gray-200 text-left">
    <TableHeader className="bg-gray-100">
      {table.getHeaderGroups().map(headerGroup => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <TableHead key={header.id} className="p-3 font-semibold text-gray-700">
              {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
    <TableBody>
  {table.getRowModel().rows.length ? (
    table.getRowModel().rows.map(row => (
      <TableRow key={row.id} className="border-b hover:bg-gray-50">
        {row.getVisibleCells().map(cell => (
          <TableCell key={cell.id} className="p-3">
            {cell.column.id === "Timestamp" ? (
              <div className="flex flex-col">
                <div className="text-sm">
                  {(cell.getValue() as Date).toLocaleDateString()} {/* ✅ Fixed function call */}
                </div>

                <div className="text-xs text-gray-500">
                  {(cell.getValue() as Date).toLocaleTimeString()} {/* ✅ Fixed function call */}
                </div>
              </div>
            ) : cell.column.id === "fileName" ? ( /* ✅ Fixed `,` to `.` */
              <p
                onClick={() => {
                  openRenameModal(
                    (row.original as FileType).id,
                    (row.original as FileType).fileName
                  );
                }}
                className="cursor-pointer text-blue-600 hover:underline"
              >
                {(row.original as FileType).fileName}
              </p>
            ) : (
              flexRender(cell.column.columnDef.cell, cell.getContext()) /* ✅ Removed `{}` from around flexRender */
            )}
          </TableCell>
        ))}

        <TableCell key={(row.original as FileType).id}>
          <Button
            variant="outline"
            onClick={() => {
              console.log("hello");
              // openDeleteModal((row.original as FileType).id);
            }}
          >
            <TrashIcon size={20} />
          </Button>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={columns.length} className="p-3 text-center text-gray-500">
        You have no Files.
      </TableCell>
    </TableRow>
  )}
</TableBody>

  </Table>
</div>

  )
}
