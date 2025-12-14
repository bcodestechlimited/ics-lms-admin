import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DataTable from ".";
import { useDebounce } from "../../hooks/use-debounce";
import { Button } from "../ui/button";

export function StudentsTable({
  data,
  page,
  limit,
  totalPages,
  totalCount,
  filteredCount,
  onPageChange,
  onLimitChange,
  initialSearch = "",
  handleEmailVerification,
  verifyingEmailId,
}) {
  const [globalFilter, setGlobalFilter] = useState(initialSearch);
  const debounced = useDebounce(globalFilter, 500);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const p = new URLSearchParams(searchParams);
    if (debounced) p.set("search", debounced);
    else p.delete("search");
    p.set("limit", String(limit));
    setSearchParams(p, { replace: true });
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
    setSearchParams(p, { replace: true });
  }, [debounced, limit, setSearchParams]);

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
        header: "Email Verified",
        cell: (info) => {
          const student = info.row.original;
          return student.isEmailVerified ? "Yes" : "No";
        },
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
        header: "Verify Email",
        cell: (info) => {
          const student = info.row.original;
          const isVerifying = verifyingEmailId === student._id;

          return (
            <Button
              disabled={student.isEmailVerified || isVerifying}
              onClick={() => handleEmailVerification(student._id)}
            >
              {isVerifying ? "Verifying..." : "Verify Email"}
            </Button>
          );
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
    [navigate, handleEmailVerification, verifyingEmailId],
  );
  return (
    <DataTable
      data={data || []}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      page={page}
      limit={limit}
      totalPages={totalPages}
      onPageChange={onPageChange}
      onLimitChange={onLimitChange}
    />
  );
}
