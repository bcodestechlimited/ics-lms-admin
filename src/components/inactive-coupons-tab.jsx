import {useSearchParams} from "react-router-dom";
import {useGetInactiveCoupons} from "../hooks/useCoupon";
import Loader from "./loader";
import CouponTable from "./tables/coupon-table";
import {DEFAULT_LIMIT} from "../helpers/service.helpers";

export default function InActiveCouponTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page") || 1);
  const limitFromUrl = Number(searchParams.get("limit") || DEFAULT_LIMIT);
  const searchFromUrl = searchParams.get("search") || "";
  const {data, isLoading} = useGetInactiveCoupons({
    page: pageFromUrl,
    limit: limitFromUrl,
    search: searchFromUrl,
  });

  const coupons = data?.coupons;
  const pagination = data?.pagination || {
    totalCount: 0,
    filteredCount: 0,
    totalPages: 1,
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
    setSearchParams(p, {replace: true});
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const handlePageChange = (nextPage) => {
    const safe = Math.max(1, Math.min(nextPage, pagination.totalPages || 1));
    setUrl({page: safe, limit: pagination.limit});
  };

  const handleLimitChange = (nextLimit) => {
    const limit = Number(nextLimit) > 0 ? Number(nextLimit) : DEFAULT_LIMIT;
    setUrl({page: 1, limit});
  };

  if (isLoading) {
    return (
      <div className="mt-[40px]">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div>
        <CouponTable
          data={coupons}
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
}
