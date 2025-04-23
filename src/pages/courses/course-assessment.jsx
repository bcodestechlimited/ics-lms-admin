import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../components/button";
import KnowledgeCheck from "../../components/knowledge-check";
import MainContainer from "../../components/maincontainer";
import MainHeader from "../../components/mainheader";
import { useCourseAssessment } from "../../hooks/useCourse";

const CourseAssessmentPage = () => {
  const [assessmentData, setAssessmentData] = useState(null);
  const navigate = useNavigate();
  const [getSearch] = useSearchParams();
  const courseId = getSearch.get("course_id") || "";
  // const courseName = getSearch.get("module_name") || "";
  const createCourseAssessment = useCourseAssessment();

  const handleAssessmentUpdate = (data) => {
    setAssessmentData(data);
  };

  const handleCreateAssessment = () => {
    try {
      const payload = {
        courseId: courseId,
        questions: assessmentData,
      };
      if (!courseId) {
        toast.error("Course ID is required");
        navigate("/courses/add-course");
        return;
      }
      toast.promise(createCourseAssessment.mutateAsync(payload), {
        loading: "Creating course assessment",
        success: (response) => {
          const encodedCourseId = encodeURIComponent(courseId);

          if (response.success) {
            navigate(
              `/courses/course-retakes?mode=new_course&course_id=${encodedCourseId}`
            );
          }
          return "Added Course Assessment";
        },
        error: (error) => {
          return error.response.data.message;
        },
      });
    } catch (error) {
      toast.error("An error occurred while creating Course assessment");
    }
  };

  return (
    <div className="satoshi">
      <MainContainer>
        <MainHeader text={"Course Assessment"} small={""} />

        <div className="mb-12">
          <KnowledgeCheck
            onUpdate={handleAssessmentUpdate}
            isStandalone={true}
          />
        </div>

        <div>
          <Button onClick={handleCreateAssessment}>Continue</Button>
        </div>
      </MainContainer>
    </div>
  );
};

export default CourseAssessmentPage;
