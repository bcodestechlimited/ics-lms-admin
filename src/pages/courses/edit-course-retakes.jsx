import {InfoIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {toast} from "sonner";
import {TextInput} from "../../components/inputs";
import {PageLoader} from "../../components/loader";
import MainContainer from "../../components/maincontainer";
import MainHeader from "../../components/mainheader";
import {Button} from "../../components/ui/button";
import {useEditCourseBenchmark, useGetCourseById} from "../../hooks/useCourse";

const EditCourseRetakesPage = () => {
  const navigate = useNavigate();
  const [getSearch] = useSearchParams();
  const courseId = getSearch.get("course_id");
  const {data, isLoading} = useGetCourseById({id: courseId});
  const editCourseBenchmark = useEditCourseBenchmark();
  const [formData, setFormData] = useState({
    retakes: 0,
    benchmark: 0,
    isRetakesEditable: false,
    isBenchmarkEditable: false,
  });

  useEffect(() => {
    if (data?.responseObject?.data?.course_benchmark) {
      const {retakes, benchmark} = data?.responseObject?.data?.course_benchmark;
      setFormData((prev) => ({
        ...prev,
        retakes,
        benchmark,
      }));
    }
  }, [data]);

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
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

  const handleUpdate = async (field) => {
    const payload = {
      benchmark_id: data?.responseObject?.data?.course_benchmark?._id,
      courseId,
      [field]: Number(parseInt(formData[field], 10)),
    };

    if (!payload.benchmark_id) {
      toast.error("Course benchmark not found");
      return;
    }

    toast.promise(editCourseBenchmark.mutateAsync(payload), {
      loading: `Updating course ${field}`,
      success: (response) => {
        if (response.success) {
          return response.message;
        }
        throw new Error(response.message);
      },
      error: "An error occurred while updating course",
    });
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="satoshi">
      <MainContainer>
        <MainHeader text="Course Details and Module ~ Retakes" small="" />

        <div className="mb-12">
          <div className="w-[40%] space-y-8">
            {/* Retakes Section */}
            <div>
              <div className="flex items-start gap-x-1">
                <h3 className="mb-2 text-main font-medium">
                  Number of Retakes
                </h3>
                <div className="max-w-[200px] w-[200px] tooltip-container">
                  <InfoIcon
                    className="h-4 w-4 text-blue-500 cursor-pointer"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Prospective students are given a set number of retake opportunities on the course assessment if they do not meet the required benchmark."
                  />
                </div>
              </div>
              <div className="mb-2 space-y-2">
                <TextInput
                  name="retakes"
                  value={formData.retakes}
                  onChange={handleInputChange("retakes")}
                  disabled={!formData.isRetakesEditable}
                />
                <Button
                  className="bg-blue-500 text-white px-4 py-1"
                  onClick={toggleEdit("Retakes")}
                >
                  {formData.isRetakesEditable ? "Save" : "Edit"}
                </Button>
              </div>
            </div>

            {/* Benchmark Section */}
            <div>
              <div className="flex items-start gap-x-1">
                <h3>Set Benchmark</h3>
                <InfoIcon
                  className="h-4 w-4 text-blue-500"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="The course benchmark represents the minimum passing score on the course assessment."
                />
              </div>
              <TextInput
                type="text"
                name="benchmark"
                value={formData.benchmark}
                onChange={handleInputChange("benchmark")}
                disabled={!formData.isBenchmarkEditable}
              />
              <div className="flex items-center mt-2">
                <Button
                  className="bg-blue-500 text-white px-4 py-1"
                  onClick={toggleEdit("Benchmark")}
                >
                  {formData.isBenchmarkEditable ? "Save" : "Edit"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <Button
            onClick={() => {
              navigate(
                `/courses/edit-course-pricing?mode=edit_course&course_id=${courseId}`
              );
            }}
          >
            Continue
          </Button>
        </div>
      </MainContainer>
    </div>
  );
};

export default EditCourseRetakesPage;
