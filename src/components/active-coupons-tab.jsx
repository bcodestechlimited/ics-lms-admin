import { useGetActiveCoupons } from "../hooks/useCoupon";
import Loader from "./loader";
import CouponTable from "./tables/coupon-table";

const ActiveCouponTab = () => {
  const { data: couponData, isLoading } = useGetActiveCoupons();

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
          defaultData={
            couponData.responseObject ? couponData.responseObject.data : []
          }
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ActiveCouponTab;
