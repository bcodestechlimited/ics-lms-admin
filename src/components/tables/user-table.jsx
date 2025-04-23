import {useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import DataTable from ".";
import {Button} from "../ui/button";

export function StudentsTable({data}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "telephone",
        header: "Telephone",
        cell: (info) => info.getValue(),
      },
      {
        header: "Courses Enrolled",
        cell: (info) => {
          const student = info.row.original;
          return student.courseEnrollments.length || 0;
        },
      },
      {
        header: "Date joined",
        accessorKey: "createdAt",
        cell: (info) => {
          return new Date(info.row.original.createdAt).toLocaleDateString();
        },
      },
      {
        header: "Actions",
        cell: (info) => {
          const student = info.row.original;

          return (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/users/student/${student._id}`)}
            >
              View
            </Button>
          );
        },
      },
    ],
    [navigate]
  );
  return (
    <>
      <DataTable
        data={data || []}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        pageSize={20}
      />
    </>
  );
}
