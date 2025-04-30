import {useMemo, useState} from "react";
import DataTable from ".";

export function CertificateTable({data}) {
  const [globalFilter, setGlobalFilter] = useState("");

  const certificates = useMemo(() => {
    return (
      data?.responseObject?.data?.map((item) => ({
        id: item._id,
        firstName: item.userId?.firstName,
        lastName: item.userId?.lastName,
        email: item.userId?.email,
        course_title: item.courseId?.title,
        completedAt: item.issuedAt,
        certificateIssued: true,
        path: item.path,
        fileName: item.fileName,
      })) || []
    );
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Course Name",
        accessorKey: "course_title",
      },
      {
        header: "Date Completed",
        accessorKey: "completedAt",
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      },
      {
        header: "Certificate Status",
        accessorKey: "certificateIssued",
        cell: (info) => {
          return info.getValue() ? (
            <div className="rounded-full bg-[#1da16a66] py-2 px-4 w-fit">
              <p className="text-center text-[#0B6C25]">Issued</p>
            </div>
          ) : (
            <div className="rounded-full bg-[#fed7aa] py-2 px-4 w-fit">
              <p className="text-center text-[#9a3412]">Not Issued</p>
            </div>
          );
        },
      },
    ],
    []
  );
  return (
    <div>
      <DataTable
        data={certificates}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        pageSize={10}
      />
    </div>
  );
}
