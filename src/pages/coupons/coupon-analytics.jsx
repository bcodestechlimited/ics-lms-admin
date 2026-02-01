import {
  ActiveCouponsIcon,
  CouponUsageIcon,
  TotalCouponsIcon,
} from "../../components/icons";
import { useGetCourseCouponAnalytics } from "../../hooks/useCoupon";

const CouponAnalyticsFull = () => {
  const { data, isLoading } = useGetCourseCouponAnalytics();
  const analytics = data?.data?.data?.[0] || {
    allCoupons: 0,
    usedCoupons: 0,
    activeCoupons: 0,
  };

  return (
    <div className="border bg-white rounded-xl py-[30px] px-5 grid grid-cols-3 gap-6">
      <StatCard
        title="Total Coupons"
        value={analytics.allCoupons}
        isLoading={isLoading}
        Icon={TotalCouponsIcon}
        bgColor="bg-[#9191F54D]"
      />
      <StatCard
        title="Used Coupons"
        value={analytics.usedCoupons}
        isLoading={isLoading}
        Icon={CouponUsageIcon}
        bgColor="bg-[#FF9DA529]"
      />
      <StatCard
        title="Active Coupons"
        value={analytics.activeCoupons}
        isLoading={isLoading}
        Icon={ActiveCouponsIcon}
        bgColor="bg-[#34D39929]"
      />
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, isLoading, Icon, bgColor }) => {
  return (
    <div
      className={`py-[17px] pl-[15px] flex items-center gap-x-[14px] rounded-md ${bgColor}`}
    >
      <Icon className="w-12 h-12 flex-shrink-0" />
      <div className="flex flex-col gap-1 min-w-0">
        <h3 className="text-sm text-gray-600 font-medium truncate">{title}</h3>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <p className="font-semibold text-[32px] leading-[45px] text-gray-900">
            {value?.toLocaleString() || 0}
          </p>
        )}
      </div>
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="h-[45px] w-24 bg-gray-200 rounded"></div>
    </div>
  );
};

export default CouponAnalyticsFull;
