import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/use-debounce";
import { useCourseStore } from "../store/course-store";
import DataTable from "./tables";

export default function CourseTable({courses, isLoading}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState(courses);
  const debouncedFilter = useDebounce(globalFilter, 500);
  const [searchParams, setSearchParams] = useSearchParams();
  const setQueryParams = useCourseStore((state) => state.setQueryParams);
  const navigate = useNavigate();

  useEffect(() => {
    setQueryParams({search: debouncedFilter});

    if (debouncedFilter) {
      searchParams.set("search", debouncedFilter);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams, {replace: true});
  }, [debouncedFilter, setQueryParams, searchParams, setSearchParams]);

  useEffect(() => {
    setData(courses);
  }, [courses]);

  const columns = useMemo(
    () => [
      {
        header: "NAME",
        accessorKey: "title",
        cell: ({getValue}) => <span className="uppercase">{getValue()}</span>,
      },
      {
        header: "PUBLISHED STATUS",
        accessorKey: "isPublished",
        cell: ({getValue}) => {
          const isPublished = getValue();
          return (
            <span
              className={`uppercase px-2 py-1 rounded ${
                isPublished
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
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
        cell: ({getValue}) => <span className="uppercase">{getValue()}</span>,
      },
      {
        header: "SKILL LEVEL",
        accessorKey: "skillLevel",
        cell: ({getValue}) => <span className="uppercase">{getValue()}</span>,
      },
      {
        header: "DATE CREATED",
        accessorKey: "createdAt",
        cell: ({getValue}) => (
          <span className="uppercase">
            {new Date(getValue()).toLocaleDateString()}
          </span>
        ),
      },
      {
        header: "ACTION",
        accessorKey: "action",
        cell: ({row}) => (
          <button
            variant="secondary"
            size="sm"
            className="uppercase bg-myblue text-white px-4 py-1 rounded-md"
            onClick={() => {
              const id = row.original._id;
              const title = row.original.title;
              const encodedTitle = encodeURIComponent(title);
              navigate(`/courses/${id}?course_title=${encodedTitle}`);
            }}
          >
            View
          </button>
        ),
      },
    ],
    [navigate]
  );

  return (
    <div className="space-y-4">
      <DataTable
        data={data || []}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        pageSize={10}
        isLoading={isLoading}
      />
    </div>
  );
}
