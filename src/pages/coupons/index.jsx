import { useState } from "react";
import CouponUsageicon from "../../assets/coupon-usage-icon.svg";
import TotalCouponIcon from "../../assets/total-coupons-icon.svg";
import CouponTabs from "../../components/coupons-tab";
import Loader from "../../components/loader";
import AddCouponModal from "../../components/modals/add-coupon";
import SuccessModal from "../../components/modals/success-modal";
import Shell from "../../components/shell";
import { useGetCouponAnalytics } from "../../hooks/useCoupon";

const CouponsPage = () => {
  const [modal, setModal] = useState("");
  const btn = {
    isActive: true,
    title: "Create Coupon",
    onClick: () => {
      setModal("open-create-coupon-modal");
    },
  };

  const {data, isLoading} = useGetCouponAnalytics();

  return (
    <div>
      <Shell
        pageHeader={"Coupons Overview"}
        pageTitle={"Coupons"}
        btnAction={btn}
      >
        <div className="space-y-8">
          <div className="border bg-white rounded-xl py-[30px] px-5 grid grid-cols-2 gap-12">
            <TotalCoupons
              total={!isLoading && data?.responseObject?.data?.[0]?.allCoupons}
              isLoading={isLoading}
            />
            <TotalCouponUsage
              total={
                !isLoading && data?.responseObject?.data?.[0]?.activeCoupons
              }
              isLoading={isLoading}
            />
          </div>
          <div>
            <CouponTabs />
          </div>
        </div>
      </Shell>
      {modal === "open-create-coupon-modal" && (
        <AddCouponModal setState={setModal} />
      )}

      {modal === "open-success-modal" && (
        <SuccessModal
          setState={setModal}
          description={"You have successfully created coupon"}
          title={"Coupon Created"}
          onClick={() => setModal("")}
        />
      )}
    </div>
  );
};

export default CouponsPage;

const TotalCoupons = ({ total, isLoading }) => {
  return (
    <div
      className={`py-[17px] pl-[15px] flex items-center gap-x-[14px] rounded-md bg-[#9191F54D]`}
    >
      <img src={TotalCouponIcon} alt={"Total Coupons"} />
      <div>
        <h3 className="">Total Coupons</h3>
        {isLoading ? (
          <div className="h-4 w-4">
            <Loader />
          </div>
        ) : (
          <p className="font-medium text-[32px] leading-[45px]">{total}</p>
        )}
      </div>
    </div>
  );
};

const TotalCouponUsage = ({ total, isLoading }) => {
  return (
    <div
      className={`py-[17px] pl-[15px] flex items-center gap-x-[14px] rounded-md bg-[#FF9DA529]`}
    >
      <img src={CouponUsageicon} alt={"Total Coupon usage"} />
      <div>
        <h3 className="">Total Coupons Usage</h3>
        {isLoading ? (
          <div className="h-6 w-6">
            <Loader />
          </div>
        ) : (
          <p className="font-medium text-[32px] leading-[45px]">{total}</p>
        )}
      </div>
    </div>
  );
};
