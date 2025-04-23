import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../components/button";
import KnowledgeCheck from "../../components/knowledge-check";
import { PageLoader } from "../../components/loader";
import MainContainer from "../../components/maincontainer";
import MainHeader from "../../components/mainheader";
import {
  useCourseAssessment,
  useGetCourseById,
  useUpdateCourseAssessment,
} from "../../hooks/useCourse";

const EditCourseAssessmentPage = () => {
  const [assessmentData, setAssessmentData] = useState(null);
  const navigate = useNavigate();
  const [getSearch] = useSearchParams();
  const courseId = getSearch.get("course_id") || "";
  // const courseName = getSearch.get("module_name") || "";
  const createCourseAssessment = useCourseAssessment();
  const editCourseAssessment = useUpdateCourseAssessment();

  const {data, isLoading} = useGetCourseById({id: courseId});

  useEffect(() => {
    if (data?.responseObject && data.responseObject.course_assessment) {
      setAssessmentData(data.responseObject.course_assessment);
    }
  }, [data]);

  if (isLoading) {
    return <PageLoader />;
  }

  const handleAssessmentUpdate = (data) => {
    setAssessmentData(data);
  };

  const handleSubmitAssessment = () => {
    if (!courseId) {
      toast.error("Course ID is required");
      navigate("/courses/add-course");
      return;
    }
    // Decide whether to update or create a new assessment based on the existence of initial data.
    const payload = {
      courseId,
      questions: assessmentData,
    };

    if (data?.responseObject?.course_assessment) {
      // Update only the changed parts using the update hook.
      toast.promise(editCourseAssessment.mutateAsync(payload), {
        loading: "Updating course assessment",
        success: (response) => {
          navigate(
            `/courses/edit-course-retakes?mode=edit_course&course_id=${encodeURIComponent(
              courseId
            )}`
          );
          return "Course Assessment updated";
        },
        error: (error) => error.response?.data?.message || "Update failed",
      });
    } else {
      // Otherwise, create a new assessment.
      toast.promise(createCourseAssessment.mutateAsync(payload), {
        loading: "Creating course assessment",
        success: (response) => {
          navigate(
            `/courses/edit-course-retakes?mode=edit_course&course_id=${encodeURIComponent(
              courseId
            )}`
          );
          return "Added Course Assessment";
        },
        error: (error) => error.response?.data?.message || "Creation failed",
      });
    }
  };

  return (
    <div className="satoshi">
      <MainContainer>
        <MainHeader text={"Course Assessment"} small={""} />

        <div className="mb-12">
          <KnowledgeCheck
            initialData={assessmentData}
            onUpdate={handleAssessmentUpdate}
            isStandalone={true}
          />
        </div>

        <div>
          <Button onClick={handleSubmitAssessment}>Save and Continue</Button>
        </div>
      </MainContainer>
    </div>
  );
};

export default EditCourseAssessmentPage;
