import { useGetInactiveCoupons } from "../hooks/useCoupon";
import Loader from "./loader";
import CouponTable from "./tables/coupon-table";

export default function InActiveCouponTab() {
  const { data: couponData, isLoading } = useGetInactiveCoupons();

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
          defaultData={
            couponData.responseObject ? couponData.responseObject.data : []
          }
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
