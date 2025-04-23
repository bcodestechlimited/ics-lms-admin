import { useMemo, useState } from "react";
import DataTable from ".";
import { Button } from "../ui/button";

export function PlanTable({
  handleEditPlan,
  handleDeletePlan,
  plans,
  loading,
  isLoading,
}) {
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "planType",
        header: "Type",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "price",
        header: "Price (NGN)",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "duration",
        header: "Duration",
        cell: (info) => info.getValue(),
      },
      {
        header: "Actions",
        cell: (info) => {
          const plan = info.row.original;
          return (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditPlan(plan)}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={"bg-red-500 text-white"}
                onClick={() => handleDeletePlan(plan._id)}
                loading={loading}
              >
                Delete
              </Button>
            </div>
          );
        },
      },
    ],
    [handleDeletePlan, handleEditPlan, loading]
  );

  return (
    <>
      <DataTable
        data={plans}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        pageSize={5}
        isLoading={isLoading}
      />
    </>
  );
}
