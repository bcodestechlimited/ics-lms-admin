import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import Loader from "../../components/loader";
import DeactivateModal from "../../components/modals/deactivate-modal";
import EditCouponModal from "../../components/modals/edit-coupon-modal";
import SuccessModal from "../../components/modals/success-modal";
import Shell from "../../components/shell";
import SingleCouponViewTable from "../../components/tables/single-coupon-table";
import {
  useGetACoupon,
  useGetCouponUsers,
  useUpdateCouponStatus,
} from "../../hooks/useCoupon";
import clsx from "clsx";
import { toast } from "sonner";

const styles = {
  header: {
    title: `font-medium text-[14px] text-secondary`,
    subtitle: `text-[20px] font-bold text-secondary`,
  },
};

export default function SlugPage() {
  const { id } = useParams();
  const [modal, setModal] = useState("");
  const updateCouponStatus = useUpdateCouponStatus();

  const { data: couponUsers, isLoading: isCouponUsersLoading } =
    useGetCouponUsers(id);
  // fetch coupon
  const { data, isLoading } = useGetACoupon(id);

  const isLoadingClassName = isLoading ? "opacity-50 cursor-not-allowed" : "";
  const couponStatusClassName =
    !isLoading && data.responseObject.status === "INACTIVE"
      ? "text-[#0269D0]"
      : "text-[#E34033] bg-[#E34033]/20 text-[#E34033]";

  const handleCouponDeactivation = async () => {
    const payload = {
      couponId: id,
    };

    if (!payload.couponId) {
      toast.error("Invalid CouponId");
      return;
    }
    try {
      toast.promise(updateCouponStatus.mutateAsync(payload), {
        loading: "Updating coupon status",
        success: (response) => {
          if (!response.success) {
            return "An error occurred while deactivating the coupon";
          }

          return "Coupon deactivated successfully";
        },
        error: () => {
          return "An error occurred while deactivating the coupon";
        },
      });
    } catch (error) {
      toast.error(
        "An error occurred while deactivating the coupon, Please try again!"
      );
    }
  };

  return (
    <div>
      <Shell pageHeader="" pageTitle="Coupons">
        <div className="space-y-8">
          <div className="border bg-white rounded-xl py-[30px] px-5 flex items-center justify-between gap-12">
            <div className="grid grid-cols-2 gap-x-12">
              <div className="space-y-2">
                <h3 className={styles.header.title}>Coupon Code</h3>
                <p className={styles.header.subtitle}>{id}</p>
              </div>
              <div className="space-y-2">
                <h3 className={styles.header.title}>Number of Users</h3>
                {isCouponUsersLoading ? (
                  <div className="w-6 h-6">
                    <Loader />
                  </div>
                ) : (
                  <p className={styles.header.subtitle}>
                    {!isCouponUsersLoading &&
                      couponUsers?.responseObject.length}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              {isLoading ? (
                <div className="h-10 w-10">
                  <Loader />
                </div>
              ) : (
                <button
                  className={clsx(
                    `h-10 font-medium rounded-3xl px-4`,
                    isLoadingClassName,
                    couponStatusClassName
                  )}
                  style={{
                    boxShadow: "0px 5px 7.3px 0px rgba(5, 76, 166, 0.20)",
                  }}
                  onClick={() => setModal("open-deactivate-modal")}
                >
                  {!isLoading && data.responseObject.status === "ACTIVE"
                    ? "Deactivate"
                    : "Activate"}
                </button>
              )}

              <Button onClick={() => setModal("open-edit-coupon-modal")}>
                Edit
              </Button>
            </div>
          </div>

          <div>
            {isCouponUsersLoading ? (
              <Loader />
            ) : (
              <SingleCouponViewTable
                defaultData={
                  !isCouponUsersLoading && couponUsers?.responseObject?.users
                }
              />
            )}
          </div>
        </div>
      </Shell>
      {modal === "open-deactivate-modal" && (
        <DeactivateModal
          setState={setModal}
          title={"Deactivate Coupon"}
          description={
            "You are about to deactivate this modal. It cannot be undone."
          }
          onClick={() => handleCouponDeactivation()}
        />
      )}

      {modal === "open-edit-coupon-modal" && (
        <EditCouponModal setState={setModal} couponId={id} />
      )}

      {modal === "open-success-edit-modal" && (
        <SuccessModal
          onClick={() => setModal("")}
          title={"Coupon Edited"}
          description={"You have successfully edited the coupon"}
        />
      )}
    </div>
  );
}
