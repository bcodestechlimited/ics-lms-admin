import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import DataTable from ".";

const data = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "6o5JH@example.com",
    course_title: "React",
    completedAt: new Date(),
    score: 80,
    certificateIssued: false,
  },
];

export function CertificateTable({ handleIssueCertificate }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      },
      {
        header: "Email",
        accessorKey: "email",
        cell: (info) => info.getValue(),
      },
      {
        header: "Course Name",
        accessorKey: "course_title",
        cell: (info) => info.getValue(),
      },
      {
        header: "Date Completed",
        accessorKey: "completedAt",
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      },
      {
        header: "Score",
        accessorKey: "score",
        cell: (info) => info.getValue(),
      },
      {
        header: "Certificate Status",
        accessorKey: "certificateIssued",
        cell: (info) => {
          return info.getValue() === true ? "Issued" : "Not Issued";
        },
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: (info) => {
          const certificate = info.row.original;
          const onClick = () => handleIssueCertificate(certificate);

          return (
            <Button
              variant={"outline"}
              className={"bg-myblue text-white rounded-md border-0"}
              size={"sm"}
              type="button"
              onClick={onClick}
            >
              Issue certificate
            </Button>
          );
        },
      },
    ],
    [handleIssueCertificate]
  );
  return (
    <div>
      <DataTable
        data={data || []}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        pageSize={20}
      />
    </div>
  );
}
