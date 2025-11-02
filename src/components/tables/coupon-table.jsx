import {useEffect, useMemo, useRef, useState} from "react";
import DataTable from ".";
import {Button} from "../button";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useDebounce} from "../../hooks/use-debounce";

const styles = {
  box: {
    contiainer: `px-4 w-fit h-10 rounded-3xl flex items-center justify-center`,
    title: ``,
  },
};

function getCouponStatus(status) {
  switch (status.toUpperCase()) {
    case "ACTIVE":
      return (
        <div className={`bg-[#0B6C25]/10 ${styles.box.contiainer}`}>
          <p className="text-[#0B6C25] capitalize">{status}</p>
        </div>
      );
    case "INACTIVE":
      return (
        <div className={`${styles.box.contiainer} bg-[#E34033]/10`}>
          <p className="text-[#E34033] capitalize">{status}</p>
        </div>
      );
    default:
      return (
        <div className={`${styles.box.contiainer} bg-[#FE9603]/10`}>
          <p className="text-[#FE9603] capitalize">{status}</p>
        </div>
      );
  }
}

const CouponTable = ({
  data,
  page,
  limit,
  totalPages,
  totalCount,
  filteredCount,
  onPageChange,
  onLimitChange,
  initialSearch = "",
}) => {
  const [globalFilter, setGlobalFilter] = useState(initialSearch);
  const debounced = useDebounce(globalFilter, 500);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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
        header: "Date Created",
        accessorKey: "createdAt",
        cell: ({getValue}) => new Date(getValue()).toLocaleDateString(),
      },
      {header: "Coupon Code", accessorKey: "couponCode"},
      {
        header: "Discount Percentage",
        accessorKey: "percentage",
        cell: ({getValue}) => {
          if (!getValue()) return <p>NUll</p>;
          return <p>{getValue()}%</p>;
        },
      },
      {
        header: "Course Name",
        accessorKey: "courseId",
        cell: ({getValue}) => {
          if (!getValue()) return <p>NUll</p>;
          return <p>{getValue().title}</p>;
        },
      },
      {
        header: "Expiration Date",
        accessorKey: "expirationDate",
        cell: ({getValue}) => {
          if (!getValue()) return <p>NUll</p>;
          return <p>{new Date(getValue()).toLocaleDateString()}</p>;
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({getValue}) => {
          if (!getValue()) return <p>NUll</p>;
          return getCouponStatus(getValue());
        },
      },
      {header: "Maximum Usage", accessorKey: "maximumUsage"},
      {
        header: "Action",
        accessorKey: "action",
        cell: ({row, getValue}) => {
          console.log("row", row.original);
          return (
            <Button
              onClick={() => {
                navigate(`/coupons/${row.original._id}`);
                // setModal("view-status-modal");
              }}
              variant="secondary"
              size="sm"
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
    <div className="space-y-4">
      <div>
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
    </div>
  );
};

export default CouponTable;
