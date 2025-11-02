import {useEffect, useMemo, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";
import DataTable from ".";
import {useDebounce} from "../../hooks/use-debounce";

export function CertificateTable({
  data,
  page,
  limit,
  totalPages,
  onPageChange,
  onLimitChange,
  initialSearch = "",
}) {
  const [globalFilter, setGlobalFilter] = useState(initialSearch);
  const debounced = useDebounce(globalFilter, 500);
  const [searchParams, setSearchParams] = useSearchParams();

  const certificates = useMemo(() => {
    return (data || []).map((u) => ({
      id: u._id,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      certificateIssued: (u.courseEnrollments?.length || 0) > 0,
      completedAt: u.createdAt,
    }));
  }, [data]);

  useEffect(() => {
    const p = new URLSearchParams(searchParams);
    if (debounced) p.set("search", debounced);
    else p.delete("search");
    p.set("limit", String(limit));
    setSearchParams(p, {replace: true});
  }, [debounced, limit, searchParams, setSearchParams]);

  const prevSearchRef = useRef(initialSearch);
  useEffect(() => {
    if (debounced === prevSearchRef.current) return;
    prevSearchRef.current = debounced;

    const p = new URLSearchParams(window.location.search);
    if (debounced) p.set("search", debounced);
    else p.delete("search");
    p.set("page", "1");
    p.set("limit", String(limit));
    setSearchParams(p, {replace: true});
  }, [debounced, limit, setSearchParams]);

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
        page={page}
        limit={limit}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </div>
  );
}
