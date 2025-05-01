import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "sonner";
import CreateModule from "../../components/add-module";
import {MainBtn} from "../../components/button";
import {TextArea, TextInput} from "../../components/inputs";
import {PageLoader} from "../../components/loader";
import MainContainer from "../../components/maincontainer";
import MainHeader from "../../components/mainheader";
import {Button} from "../../components/ui/button";
import {useGetCourseById, useUpdateCourse} from "../../hooks/useCourse";
import {useCreateTemplateFromCourse} from "../../hooks/useTemplate";
import EditModulePage from "./edit-module";

const EditCoursePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const course_id = queryParams.get("course");
  const payload = {
    id: course_id,
  };
  const {data, isLoading} = useGetCourseById(payload);
  const [moduleName, setModuleName] = useState("");
  const updateCourse = useUpdateCourse();
  const [hasChanged, setHasChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const createTemplateFromCourse = useCreateTemplateFromCourse();

  const btnState = {
    isLoading: false,
  };

  const [formState, setFormState] = useState({
    title: "",
    description: "",
  });
  const textChange = ({target: {value, name}}) => {
    setHasChanged(true);
    setFormState((prev) => ({...prev, [name]: value}));
  };

  useEffect(() => {
    if (data?.responseObject) {
      setFormState({
        title: data.responseObject.data.title || "",
        description: data.responseObject.data.description || "",
      });
    }
  }, [data]);

  if (isLoading) {
    return <PageLoader />;
  }

  const handleAddModule = () => {
    if (!moduleName) {
      toast.info("Module name is required");
      return;
    }
    const encodedModuleName = encodeURIComponent(moduleName);
    navigate(
      `/courses/add-module?course_id=${course_id}&mode=edit&module_name=${encodedModuleName}`
    );
  };

  const handleSaveChangesToEditCourse = () => {
    try {
      let updatePayload = {courseId: course_id};
      if (formState.title !== data.responseObject.title) {
        updatePayload.courseTitle = formState.title;
      }
      if (formState.description !== data.responseObject.description) {
        updatePayload.courseDescription = formState.description;
      }

      if (Object.keys(updatePayload).length > 1) {
        toast.promise(updateCourse.mutateAsync(updatePayload), {
          loading: "Updating course",
          success: (response) => {
            if (response.success) {
              return "Course updated successfully";
            }
            throw new Error("Course was not updated, Try again!");
          },
          error: (error) => {
            return "An error occurred while updating the course. Please try again!";
          },
        });
      }
    } catch (error) {
      toast.error("An error occurred while trying to save changes");
    }
  };

  const handleSaveAsTemplate = async () => {
    setLoading(true);
    try {
      toast.promise(createTemplateFromCourse.mutateAsync(course_id), {
        loading: "Creating template",
        success: (response) => {
          if (response.success) {
            return "Template created successfully";
          }
          throw new Error("Template was not created, Try again!");
        },
        error: (error) => {
          return "An error occurred while creating the template. Please try again!";
        },
      });
    } catch (error) {
      toast.error("An error occurred while trying to save as template");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <MainContainer>
        <MainHeader text="Courses" small={"Edit a course"} />
        <div className="w-full bg-white rounded-3xl p-4">
          <h3 className="text-base font-bold text-myblue satoshi">
            Edit Course <span className="font-medium"></span>
          </h3>
          <form action="" className="mt-10 lg:w-1/2">
            <div className="space-y-8">
              <TextInput
                label={"Name of Course"}
                value={formState.title}
                name={"title"}
                setState={setFormState}
                placeholder={"Enter name of course"}
                onChange={textChange}
              />
              <TextArea
                label={"Course overview"}
                value={formState.description}
                name={"description"}
                setState={setFormState}
                placeholder={"Enter course overview"}
                onChange={textChange}
              />
              {/* <VideoInput /> */}
              {/* <CreateModule /> */}
              <div className="space-y-4">
                {data?.responseObject.data.course_modules?.map((module) => (
                  <EditModulePage
                    title={module.title}
                    id={module._id}
                    courseId={course_id}
                    key={module._id}
                  />
                ))}
              </div>
              {/* Add Module component */}
              <CreateModule
                handleSubmit={handleAddModule}
                btnState={btnState}
                onChange={(e) => setModuleName(e.target.value)}
                state={moduleName}
              />
            </div>
            <div className="mt-8 flex gap-5 items-center justify-between">
              <Button
                className={""}
                variant={"outline"}
                onClick={handleSaveAsTemplate}
                loading={loading}
                type={"button"}
              >
                Save as template
              </Button>

              {/* take the user to the place where they save the course probably a modal just telling them that the course has been saved */}
              <MainBtn
                text={hasChanged ? "Save Changes" : "Continue to Assessment"}
                onClick={() => {
                  if (hasChanged) {
                    handleSaveChangesToEditCourse();
                  }
                  const encodedCourseName = encodeURIComponent(
                    moduleName || data.responseObject.data.title
                  );
                  // toast.success("Course Updated successfully");
                  navigate(
                    `/courses/edit-course-assessment?course_id=${course_id}&mode=edit&course_name=${encodedCourseName}`
                  );
                }}
                type={"button"}
              />

              {/* <h6 className="text-base satoshi font-medium text-myblue underline cursor-pointer">
                Add Another Course
              </h6> */}
            </div>
          </form>
        </div>
      </MainContainer>
    </div>
  );
};

export default EditCoursePage;
