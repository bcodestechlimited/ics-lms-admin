import { useState } from "react";
import SendCourseCouponToUsersModal from "../../components/coupons-modal";
import { CourseCouponsTable } from "../../components/coupons-tab";
import SuccessModal from "../../components/modals/success-modal";
import Shell from "../../components/shell";
import CouponAnalyticsFull from "./coupon-analytics";

const CouponsPage = () => {
  const [modal, setModal] = useState("");
  const btn = {
    isActive: true,
    title: "Issue coupon",
    onClick: () => {
      setModal("open-send-course-coupon");
    },
  };

  return (
    <div>
      <Shell pageHeader={"Coupons Overview"} pageTitle={"Coupons"} btnAction={btn}>
        <div className="space-y-8">
          <div>
            <CouponAnalyticsFull />
          </div>
          <div>
            <CourseCouponsTable />
          </div>
        </div>
      </Shell>

      {modal === "open-send-course-coupon" && (
        <SendCourseCouponToUsersModal setState={setModal} />
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
