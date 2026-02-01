import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DataTable from ".";
import { useDebounce } from "../../hooks/use-debounce";

const CouponTable = ({
  data,
  page,
  limit,
  totalPages,
  onPageChange,
  onLimitChange,
  initialSearch = "",
}) => {
  const [globalFilter, setGlobalFilter] = useState(initialSearch);
  const debounced = useDebounce(globalFilter, 500);
  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();

  useEffect(() => {
    const p = new URLSearchParams(searchParams);
    if (debounced) p.set("search", debounced);
    else p.delete("search");
    p.set("limit", String(limit));
    setSearchParams(p, { replace: true });
  }, [debounced, limit, searchParams, setSearchParams]);

  const columns = useMemo(
    () => [
      { header: "Coupon Code", accessorKey: "couponCode" },
      {
        header: "Issued To",
        accessorKey: "issuedToUserId",
        cell: ({ getValue }) => {
          const u = getValue();
          if (!u) return <p>Null</p>;
          const fullName = [u.firstName, u.lastName].filter(Boolean).join(" ");
          return (
            <div className="space-y-1">
              <p className="font-medium">{fullName || "Unnamed"}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
            </div>
          );
        },
      },
      {
        header: "Course",
        accessorKey: "courseId",
        cell: ({ getValue }) => {
          const c = getValue();
          if (!c) return <p>Null</p>;
          return <p>{c.title}</p>;
        },
      },
      {
        header: "Expires",
        accessorKey: "expirationDate",
        cell: ({ getValue }) => {
          const v = getValue();
          if (!v) return <p>Null</p>;
          return <p>{new Date(v).toLocaleDateString()}</p>;
        },
      },
      {
        header: "Used",
        accessorKey: "usedAt",
        cell: ({ getValue }) => {
          const usedAt = getValue();
          return (
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                usedAt
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {usedAt ? "USED" : "NOT USED"}
            </span>
          );
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row, getValue }) => {
          const status = getValue();
          const usedAt = row.original.usedAt;
          const label = usedAt ? "INACTIVE" : status || "ACTIVE";

          return (
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                label === "ACTIVE"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {label}
            </span>
          );
        },
      },
      // {
      //   header: "Action",
      //   accessorKey: "action",
      //   cell: ({ row }) => (
      //     <Button
      //       onClick={() => navigate(`/course-coupons/${row.original._id}`)}
      //       variant="secondary"
      //       size="sm"
      //     >
      //       View
      //     </Button>
      //   ),
      // },
    ],
    [],
  );

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default CouponTable;
