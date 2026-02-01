import { useSearchParams } from "react-router-dom";
import { useGetActiveCoupons } from "../hooks/useCoupon";
import Loader from "./loader";
import CouponTable from "./tables/coupon-table";
import { DEFAULT_LIMIT } from "../helpers/service.helpers";

const ActiveCouponTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page") || 1);
  const limitFromUrl = Number(searchParams.get("limit") || DEFAULT_LIMIT);
  const searchFromUrl = searchParams.get("search") || "";
  const { data, isLoading } = useGetActiveCoupons({
    page: pageFromUrl,
    limit: limitFromUrl,
    search: searchFromUrl,
  });

  const coupons = !isLoading && data?.coupons;
  const pagination = data?.pagination ?? {
    totalCount: 0,
    filteredCount: 0,
    totalPages: 0,
    page: pageFromUrl,
    limit: limitFromUrl,
  };

  const setUrl = (updates = {}) => {
    const p = new URLSearchParams(searchParams);
    if (updates.page != null) p.set("page", String(updates.page));
    if (updates.limit != null) p.set("limit", String(updates.limit));
    if (updates.search != null) {
      if (updates.search) p.set("search", updates.search);
      else p.delete("search");
    }
    setSearchParams(p, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (nextPage) => {
    const safe = Math.max(1, Math.min(nextPage, pagination.totalPages || 1));
    setUrl({ page: safe, limit: pagination.limit });
  };

  const handleLimitChange = (nextLimit) => {
    const limit = Number(nextLimit) > 0 ? Number(nextLimit) : DEFAULT_LIMIT;
    setUrl({ page: 1, limit });
  };

  if (isLoading) {
    return (
      <div className="mt-[40px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="">
      <div>
        <CouponTable
          data={coupons}
          isLoading={isLoading}
          page={pagination.page}
          limit={pagination.limit}
          totalPages={pagination.totalPages}
          totalCount={pagination.totalCount}
          filteredCount={pagination.filteredCount}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          initialSearch={searchFromUrl}
        />
      </div>
    </div>
  );
};

export default ActiveCouponTab;
