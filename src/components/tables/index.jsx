import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import {Button} from "../button";
import Loader from "../loader";
// import { useSearchParams } from "react-router-dom";

/**
 * DataTable component for rendering a paginated and filterable table.
 *
 * @param {Object} props - The component props
 * @param {Array<Object>} props.data - Array of data objects to be rendered in the table.
 * @param {Array<Object>} props.columns props.columns - Array of column definition for the table.
 * @param {string} [props.globalFilter] - The current global filter string for table-wide filtering.
 * @param {Function} props.setGlobalFilter - Callback function to update the global filter.
 * @param {number} [props.pageSize=5] - Number of rows to display per page.
 * @returns {JSX.Element}  A React component rendering the table with pagination and filtering.
 */
export default function DataTable({
  data,
  columns,
  globalFilter,
  setGlobalFilter,
  pageSize = 5,
  isLoading = false,
}) {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const activeTab = searchParams.get("tab") || "active";
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pageSize || 5,
      },
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search..."
          className="max-w-sm rounded-md h-[46px] w-[250px] border outline-0 px-2"
          value={globalFilter ?? ""}
          onChange={(e) => {
            setGlobalFilter(e.target.value);
            // setSearchParams({ tab: activeTab, table: e.target.value });
          }}
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
            ) : table.getRowModel().rows.length === 0 ? (
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

      {!isLoading && table.getRowModel().rows.length > 0 && (
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
