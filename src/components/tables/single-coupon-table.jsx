import { useMemo, useState } from "react";
import DataTable from ".";

export default function SingleCouponViewTable({ defaultData }) {
  const [data] = useState(defaultData);
  const [globalFilter, setGlobalFilter] = useState("");


  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "firstName",
        cell: ({ getValue }) => {
          const firstName = getValue();
          const lastName = data.find(
            (row) => row.firstName === firstName
          )?.lastName; // Access lastName from the same row
          return <p>{`${firstName} ${lastName}`}</p>;
        },
      },
      {
        header: "Email",
        accessorKey: "email", // Use the correct key from the data
      },
      {
        header: "Date Used",
        accessorKey: "createdAt",
        cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
      },
    ],
    [data]
  );

  return (
    <div className="space-y-4">
      <div>
        <DataTable
          data={data}
          columns={columns}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          pageSize={5}
        />
      </div>
    </div>
  );
}
