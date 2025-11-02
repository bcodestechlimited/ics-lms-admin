import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"; // ❗ remove getFilteredRowModel/getPaginationRowModel (server handles it)
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import {Button} from "../button";
import Loader from "../loader";

export default function DataTable({
  data,
  columns,
  globalFilter,
  setGlobalFilter,
  isLoading = false,
  page, // 1-based
  limit,
  totalPages,
  onPageChange,
  onLimitChange,
}) {
  // Build table just for rendering rows; no client pagination
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // We’re not using TanStack's client filter/pagination for server mode.
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search..."
          className="max-w-sm rounded-md h-[46px] w-[250px] border outline-0 px-2"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      <div className="w-full overflow-x-auto rounded-md overflow-hidden">
        <table className="w-full min-w-[600px] divide-y divide-gray-200">
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 w-full">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8">
                  <div className="flex items-center justify-center w-full">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-gray-500"
                >
                  No data found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Server-controlled pager */}
      {!isLoading && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Page <strong>{page}</strong> of{" "}
            <strong>{Math.max(totalPages || 1, 1)}</strong>
          </div>

          <div className="flex items-center gap-3">
            {/* page size */}
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n} / page
                </option>
              ))}
            </select>

            {/* arrows */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
              >
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page + 1)}
                disabled={totalPages ? page >= totalPages : true}
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
