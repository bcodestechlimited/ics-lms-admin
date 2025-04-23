import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { TextInput } from "../../components/inputs";
import { PageLoader } from "../../components/loader";
import MainContainer from "../../components/maincontainer";
import MainHeader from "../../components/mainheader";
import AddCouponModal from "../../components/modals/add-coupon";
import { Button } from "../../components/ui/button";
import { useGetCoupon } from "../../hooks/useCoupon";
import {
  useCreateCoursePricing,
  usePublishCourse,
} from "../../hooks/useCourse";

const CoursePricingPage = () => {
  const [modal, setModal] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [getSearch] = useSearchParams();
  const courseId = getSearch.get("course_id");
  const navigate = useNavigate();
  const createCoursePricing = useCreateCoursePricing();
  const {data, isLoading} = useGetCoupon();
  const publishCourseHook = usePublishCourse(courseId);

  if (isLoading) {
    return <PageLoader />;
  }

  const handleCoursePricingSubmit = () => {
    try {
      if (!courseId) {
        toast.error("Course ID is required");
        navigate("/courses/add-course");
        return;
      }

      const payload = {
        courseId: courseId,
        coursePrice: Number(parseInt(coursePrice, 10)),
      };
      toast.promise(createCoursePricing.mutateAsync(payload), {
        loading: "Creating course pricing",
        success: (response) => {
          if (response.success) {
            return "Course pricing created successfully";
          }
        },
        error: (error) => {
          return "An error occurred while creating course pricing";
        },
      });
    } catch (error) {
      toast.error("An error occurred while creating course pricing");
    }
  };

  const publishCourse = () => {
    toast.promise(publishCourseHook.mutateAsync(courseId), {
      loading: "Publishing course",
      success: (res) => {
        if (res.success) {
          navigate("/courses");
          return "Course published successfully";
        }
      },
      error: () => {
        return "An error occurred while publishing course";
      },
    });
    toast.success("Course published successfully");
  };

  return (
    <div className="satoshi">
      <MainContainer>
        <MainHeader text="Course Details and Module ~ Pricing" small={""} />

        <div className="mb-12">
          <div className="w-[40%]">
            <div className="space-y-8 mb-12">
              <h1 className="mb-2 text-main font-medium">Course Price</h1>
              <TextInput
                value={coursePrice}
                setState={setCoursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
              />
              <div className="flex items-center gap-x-8">
                <div
                  className="flex items-center gap-x-2 w-fit cursor-pointer"
                  onClick={() => {
                    setModal("open-coupon-modal");
                  }}
                >
                  <PlusCircleIcon className="text-myblue" />
                  <p className="text-myblue underline font-medium">
                    Add Coupon
                  </p>
                </div>
                <Button onClick={handleCoursePricingSubmit}>
                  Add Course Price
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-8 mt-48">
          <Button onClick={publishCourse}>Publish Course</Button>
        </div>
      </MainContainer>

      {modal === "open-coupon-modal" && (
        <AddCouponModal
          setState={setModal}
          courseId={courseId}
          courses={data.data.docs}
        />
      )}
    </div>
  );
};

export default CoursePricingPage;
