import { Select } from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useCreateCoupon } from "../../hooks/useCoupon";
import { useGetCourse } from "../../hooks/useCourse";
import { Button } from "../button";
import CloseModalIcon from "../close-modal-icon";
import { TextInput } from "../inputs";
import Loader from "../loader";
import ModalContainer from "./modalcontainer";

const styles = {
  label: `text-main`,
};
const AddCouponModal = ({ setState, courseId, courses }) => {
  const location = useLocation();
  // const navigate = useNavigate();
  const handleClose = () => {
    setState("");
  };
  const openSuccessModal = () => {
    setState("open-success-modal");
  };

  const { data: coursesData, isLoading } = useGetCourse();
  const createCoupon = useCreateCoupon();
  const [formState, setFormState] = useState({
    course_id: "",
    discountType: "",
    percentage: "",
    expirationDate: "",
    maximumUsage: "",
  });

  const handleOnchange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleCouponSubmit = () => {
    const payload = {
      discountType: formState.discountType || "FLASH_SALE",
      percentage: Number(formState.percentage),
      expirationDate: formState.expirationDate,
      maximumUsage: Number(formState.maximumUsage),
      courseId:
        location.pathname === "/coupons" ? formState.course_id : courseId,
    };

    if (!payload.courseId) {
      toast.error("Invalid CourseID");
      // navigate();
      return;
    }
    try {
      toast.promise(createCoupon.mutateAsync(payload), {
        loading: "Creating coupon",
        success: (response) => {
          if (response.success) {
            handleClose();
            openSuccessModal();
            return "Coupon created successfully";
          }

          throw new Error("Coupon was not created, Try again!");
        },
        error: (error) => {
          return "An error occurred while creating the coupon. Please try again!";
        },
      });
    } catch (error) {
      toast.error(
        "An error occurred while creating the coupon. Please try again!"
      );
    }
  };

  return (
    <div>
      <ModalContainer>
        {/* overlay with spinner */}
        {isLoading && (
          <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-300">
            <Loader height={20} width={20} />
          </div>
        )}

        {/* modal content */}
        <div
          className={clsx(
            "bg-white rounded-xl py-4 px-8 space-y-5 w-[500px] relative border transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100"
          )}
        >
          <CloseModalIcon handleClose={handleClose} />

          <h3 className="text-bold text-[20px] text-myblue">Add Coupon</h3>

          {location.pathname === "/coupons" && (
            <div>
              <label className={styles.label} htmlFor="couponCode">
                Select Course
              </label>
              <div className="relative">
                <Select
                  name="course_id"
                  aria-label="Select Course"
                  className={clsx(
                    "block w-full appearance-none rounded-lg border bg-white/5 h-12 px-2 text-sm/6 text-black",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                    "*:text-black"
                  )}
                  placeholder="Select course"
                  value={formState.course_id}
                  onChange={handleOnchange}
                >
                  {!isLoading &&
                    coursesData?.data?.docs?.map((course) => {
                      return (
                        <option key={course._id} value={course._id}>
                          {course.title}
                        </option>
                      );
                    })}
                </Select>
                <ChevronDownIcon
                  className="group pointer-events-none absolute top-4 right-2.5 size-4 fill-white/60 h-4 w-4"
                  aria-hidden="true"
                />
              </div>
            </div>
          )}

          <div>
            <label className={styles.label} htmlFor="discountType">
              Discount Type
            </label>
            <div className="relative">
              <Select
                name="discountType"
                aria-label="Discount Type"
                className={clsx(
                  "block w-full appearance-none rounded-lg border bg-white/5 h-12 px-2 text-sm/6 text-black",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                  // Make the text of each option black on Windows
                  "*:text-black"
                )}
                placeholder="Discount Type"
                value={formState.discountType}
                onChange={handleOnchange}
              >
                <option value={"FLASH_SALE"}>Flash Sales</option>
                <option value={"FIRST_TIME_USER"}>First time users</option>
                <option value={"LIMITED_TIME"}>Limited time Coupon</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-4 right-2.5 size-4 fill-white/60 h-4 w-4"
                aria-hidden="true"
              />
            </div>
          </div>

          <div>
            <label className={styles.label} htmlFor="">
              Percentage (%)
            </label>
            <TextInput
              placeholder={"Percentage"}
              name={"percentage"}
              onChange={handleOnchange}
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
                // open the next modal and close this one
                // handleClose();
                // openSuccessModal();

                handleCouponSubmit();
              }}
            >
              Add Coupon
            </Button>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default AddCouponModal;
