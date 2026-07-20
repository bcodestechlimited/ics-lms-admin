import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/use-debounce";
import { useCourseStore } from "../store/course-store";
import DataTable from "./tables";

export default function CourseTable({
  courses,
  isLoading,
  page,
  limit,
  totalPages,
  totalCount,
  filteredCount,
  onPageChange,
  onLimitChange,
}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState(courses);
  const debouncedFilter = useDebounce(globalFilter, 500);
  const [searchParams, setSearchParams] = useSearchParams();
  const setQueryParams = useCourseStore((state) => state.setQueryParams);
  const navigate = useNavigate();

  // hydrate search input from URL
  useEffect(() => {
    const searchFromUrl = searchParams.get("search") || "";
    setGlobalFilter(searchFromUrl);
  }, []); // eslint-disable-line

  // push search to URL + reset to page 1 (server-side search)
  useEffect(() => {
    setQueryParams({ search: debouncedFilter, page: 1 });
    const p = new URLSearchParams(searchParams);
    if (debouncedFilter) p.set("search", debouncedFilter);
    else p.delete("search");
    p.set("page", "1");
    p.set("limit", String(limit));
    setSearchParams(p, { replace: true });
  }, [debouncedFilter, limit]); // eslint-disable-line

  useEffect(() => {
    setData(courses);
  }, [courses]);

  const columns = useMemo(
    () => [
      {
        header: "NAME",
        accessorKey: "title",
        cell: ({ getValue }) => <span className="uppercase">{getValue()}</span>,
      },
      {
        header: "PUBLISHED STATUS",
        accessorKey: "isPublished",
        cell: ({ getValue }) => {
          const isPublished = getValue();
          return (
            <span
              className={`uppercase px-2 py-1 rounded ${
                isPublished ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {isPublished ? "PUBLISHED" : "NOT PUBLISHED"}
            </span>
          );
        },
      },
      {
        header: "CATEGORY",
        accessorKey: "category",
        cell: ({ getValue }) => <span className="uppercase">{getValue()}</span>,
      },
      {
        header: "SKILL LEVEL",
        accessorKey: "skillLevel",
        cell: ({ getValue }) => <span className="uppercase">{getValue()}</span>,
      },
      {
        header: "DATE CREATED",
        accessorKey: "createdAt",
        cell: ({ getValue }) => (
          <span className="uppercase">{new Date(getValue()).toLocaleDateString()}</span>
        ),
      },
      {
        header: "ACTION",
        accessorKey: "action",
        cell: ({ row }) => (
          <button
            className="uppercase bg-myblue text-white px-4 py-1 rounded-md"
            onClick={() => {
              const id = row.original._id;
              const title = row.original.title;
              navigate(`/courses/${id}?course_title=${encodeURIComponent(title)}`);
            }}
          >
            View
          </button>
        ),
      },
    ],
    [navigate],
  );

  return (
    <div className="space-y-4" id="course-table-top">
      <DataTable
        data={data || []}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        isLoading={isLoading}
        page={page}
        limit={limit}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </div>
  );
}
