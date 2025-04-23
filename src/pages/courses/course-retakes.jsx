import { InfoIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../components/button";
import { TextInput } from "../../components/inputs";
import MainContainer from "../../components/maincontainer";
import MainHeader from "../../components/mainheader";
import { useCreateCourseBenchmark } from "../../hooks/useCourse";

const CourseRetakesPage = () => {
  const navigate = useNavigate();
  const [retakes, setRetakes] = useState(0);
  const [benchmark, setBenchmark] = useState(0);
  const [getSearch] = useSearchParams();
  const courseId = getSearch.get("course_id");
  const createCourseBenchmark = useCreateCourseBenchmark();

  const handleCourseBenchmarkSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        courseId,
        retakes: Number(parseInt(retakes, 10)),
        benchmark: Number(parseInt(benchmark, 10)),
      };

      if (!courseId) {
        toast.error("Course ID is required");
        navigate("/courses/add-course");
        return;
      }
      toast.promise(createCourseBenchmark.mutateAsync(payload), {
        loading: "Setting course benchmark",
        success: (response) => {
          const encodedCourseId = encodeURIComponent(courseId);
          if (response.success) {
            navigate(
              `/courses/course-pricing?mode=new_course&course_id=${encodedCourseId}`
            );
            setBenchmark(0);
            setRetakes(0);
          }
          return "Added Course Benchmark";
        },
        error: (error) => {
          return "An error occurred while creating course benchmark";
        },
      });
    } catch (error) {
      toast.error(
        "An error occured while creating the course. Please try again."
      );
    }
  };
  return (
    <div className="satoshi">
      <MainContainer>
        <MainHeader text={"Course Details and Module ~ Retakes"} small={""} />

        <div className="mb-12">
          <div className="w-[40%] space-y-8">
            <div>
              <div className="flex items-start gap-x-1">
                <h3 className="mb-2 text-main font-medium">
                  Number of Retakes
                </h3>
                <div className="max-w-[200px] w-[200px] tooltip-container">
                  <InfoIcon
                    className="h-4 w-4 text-blue-500 cursor-pointer"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={
                      "Prospective students are given a set number of retake opportunities on the course assessment if they do not meet the required benchmark."
                    }
                  />
                </div>
              </div>
              <TextInput
                name={"retakes"}
                value={retakes}
                onChange={(e) => setRetakes(e.target.value)}
              />
            </div>

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
                type={"text"}
                name={"benchmark"}
                value={benchmark}
                onChange={(e) => setBenchmark(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <Button onClick={handleCourseBenchmarkSubmit}>Continue</Button>
        </div>
      </MainContainer>
    </div>
  );
};

export default CourseRetakesPage;
