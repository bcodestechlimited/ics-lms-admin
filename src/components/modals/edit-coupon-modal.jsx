import { Select } from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEditCoupon, useGetACoupon } from "../../hooks/useCoupon";
import { Button } from "../button";
import CloseModalIcon from "../close-modal-icon";
import { TextInput } from "../inputs";
import Loader from "../loader";
import ModalContainer from "./modalcontainer";
import { toast } from "sonner";

const styles = {
  label: `text-main`,
};
export default function EditCouponModal({ setState, couponId }) {
  const { id } = useParams();
  const editCoupon = useEditCoupon();
  const [formState, setFormState] = useState({
    couponId: id,
    expirationDate: "",
    maximumUsage: "",
  });
  const handleClose = () => {
    setState("");
  };
  const openSuccessModal = () => {
    setState("open-success-edit-modal");
  };

  const handleOnchange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // fetch coupon
  const { data, isLoading } = useGetACoupon(id);

  const handleEditCoupon = () => {
    const payload = {
      couponId: formState.couponId,
      expirationDate: formState.expirationDate,
      maximumUsage: formState.maximumUsage,
    };
    if (!payload.couponId) {
      toast.error("Invalid CouponId");
      return;
    }
    try {
      toast.promise(editCoupon.mutateAsync(payload), {
        loading: "Updating coupon",
        success: (response) => {
          if (response.success) {
            handleClose();
            openSuccessModal();
            return "Coupon updated successfully";
          } else {
            throw new Error("Error editing coupon");
          }
        },
        error: () => {
          return "An error occurred while updating coupon";
        },
      });
    } catch (error) {
      toast.error("An error occurred while updating coupon. Please try again!");
    }
  };

  // console.log("coupon data", data.responseObject);
  return (
    <div>
      <ModalContainer>
        {isLoading && (
          <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-300">
            <Loader height={20} width={20} />
          </div>
        )}
        <div
          className={clsx(
            "bg-white rounded-xl py-4 px-8 space-y-5 w-[500px] relative border transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100"
          )}
        >
          <CloseModalIcon handleClose={handleClose} />

          <h3 className="text-bold text-[20px] text-myblue">Edit Coupon</h3>

          <div>
            <label className={styles.label} htmlFor="couponCode">
              Coupon Code
            </label>
            <TextInput
              placeholder={"Coupon code"}
              value={!isLoading && data.responseObject.couponCode}
              disabled
              className="text-[#ccc]"
            />
          </div>

          <div>
            <label className={styles.label} htmlFor="discountType">
              Discount Type
            </label>
            <div className="relative">
              <Select
                name="discountType"
                aria-label="Discount Type"
                className={clsx(
                  "block w-full appearance-none rounded-lg border bg-white/5 h-12 px-2 text-sm/6 text-[#ccc]",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                  // Make the text of each option black on Windows
                  // "*:text-black",
                  "text-[#222] cursor-not-allowed"
                )}
                placeholder="Discount Type"
                value={!isLoading && data.responseObject.discountType}
                onChange={handleOnchange}
                disabled
              >
                <option value={"FLASH_SALE"}>Flash Sales</option>
                <option value={"FIRST_TIME_USER"}>First time users</option>
                <option value={"LIMITED_TIME"}>Limited time Coupon</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-4 right-2.5 size-4 fill-white/60 h-4 w-4 text-[#ccc]"
                aria-hidden="true"
              />
            </div>
          </div>

          <div>
            <label className={styles.label} htmlFor="">
              Percentage
            </label>
            <TextInput
              placeholder={"Percentage"}
              value={!isLoading && data.responseObject.percentage}
              disabled
            />
          </div>

          <div>
            <label className={styles.label} htmlFor="expirationTime">
              Expiration Date
            </label>
            <TextInput
              type={"date"}
              placeholder={"Expiration Date"}
              name={"expirationDate"}
              onChange={handleOnchange}
            />
          </div>

          <div>
            <label className={styles.label} htmlFor="maximumUsage">
              Maximum Usage
            </label>
            <TextInput
              placeholder={"Maximum Usage"}
              name={"maximumUsage"}
              onChange={handleOnchange}
            />
          </div>

          <div className="mt-16">
            <Button
              className="px-4 py-2 bg-myblue text-white rounded-md"
              onClick={() => {
                handleEditCoupon();
              }}
            >
              Edit Coupon
            </Button>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
}
