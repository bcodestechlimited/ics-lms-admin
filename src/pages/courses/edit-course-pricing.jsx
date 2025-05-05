import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {toast} from "sonner";
import {Button} from "../../components/button";
import {TextInput} from "../../components/inputs";
import {PageLoader} from "../../components/loader";
import MainContainer from "../../components/maincontainer";
import MainHeader from "../../components/mainheader";
import {useGetCourseById, useUpdateCoursePricing} from "../../hooks/useCourse";

const EditCoursePricingPage = () => {
  const [getSearch] = useSearchParams();
  const courseId = getSearch.get("course_id");
  const navigate = useNavigate();
  const {data: getCourse, isLoading: isGetCourseLoading} = useGetCourseById({
    id: courseId,
  });
  const [formData, setFormData] = useState({
    coursePricing: 0,
    isPricingEditable: false,
  });
  const updateCoursePricing = useUpdateCoursePricing();

  useEffect(() => {
    if (
      getCourse?.responseObject &&
      getCourse?.responseObject?.data?.course_price
    ) {
      setFormData((prev) => ({
        ...prev,
        coursePricing:
          getCourse?.responseObject?.data?.course_price?.coursePricing,
      }));
    }
  }, [getCourse]);

  if (isGetCourseLoading) {
    return <PageLoader />;
  }

  const handleUpdate = async (field) => {
    const payload = {
      courseId,
      course_price_id: getCourse?.responseObject?.data?.course_price?._id,
      coursePrice: Number(parseInt(formData.coursePricing, 10)),
    };

    if (!payload.course_price_id) {
      toast.error("Course price not found");
      return;
    }

    toast.promise(updateCoursePricing.mutateAsync(payload), {
      loading: `Updating course ${field}`,
      success: (response) => {
        if (response.success) {
          return "Pricing updated successfully";
        }
        throw new Error(response.message);
      },
      error: "An error occurred while updating course pricing",
    });
  };

  const toggleEdit = (field) => () => {
    const editableField = `is${field}Editable`;
    setFormData((prev) => ({
      ...prev,
      [editableField]: !prev[editableField],
    }));

    if (formData[editableField]) {
      handleUpdate(field.toLowerCase());
    }
  };

  const handleCompleteUpdate = () => {
    toast.success("Course published successfully");
    navigate("/courses");
  };

  return (
    <div className="">
      <MainContainer>
        <MainHeader text="Course Details and Module ~ Pricing" small={""} />

        <div className="mb-12">
          <div className="w-[40%]">
            <div className="space-y-4 mb-12">
              <h1 className="mb-2 text-main font-medium">Course Price</h1>
              <TextInput
                value={formData.coursePricing}
                setState={setFormData}
                name={"coursePricing"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    coursePricing: e.target.value,
                  }))
                }
                disabled={!formData.isPricingEditable}
              />
              <div>
                <Button onClick={toggleEdit("Pricing")}>
                  {formData.isPricingEditable ? "Save" : "Edit"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-8 mt-48">
          <Button onClick={handleCompleteUpdate}>Save Course</Button>
        </div>
      </MainContainer>
    </div>
  );
};

export default EditCoursePricingPage;
