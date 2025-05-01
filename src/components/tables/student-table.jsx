import { useMemo, useState } from "react";
import DataTable from ".";


export function StudentTable(data, isLoading) {
  const [globalFilter, setGlobalFilter] = useState("");
  const columns = useMemo(
    () => [
      {
        header: "Name of Course",
        accessorKey: "course_title",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (info) => {
          return info.getValue().toUpperCase();
        },
      },
      {
        header: "Progress Metric",
        accessorKey: "progress_percentage",
        cell: (info) => `${info.getValue()}% `,
      },
      {
        header: "Score",
        accessorKey: "score",
      },
      {
        header: "Certificate Status",
        accessorKey: "certificateIssued",
        cell: (info) => {
          
          return info.row.original.status === "completed"
            ? "Issued"
            : "Not Issued";
        },
      },
    ],
    []
  );
  return (
    <div className="space-y-4">
      <DataTable
        data={data.data || []}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        isLoading={false}
      />
    </div>
  );
}
