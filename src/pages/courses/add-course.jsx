import {Select} from "@headlessui/react";
import clsx from "clsx";
import {ChevronDownIcon} from "lucide-react";
import queryString from "query-string";
import React, {useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {toast} from "sonner";
import CreateModule from "../../components/add-module";
import {Button} from "../../components/button";
import {ImageInput, TextArea, TextInput} from "../../components/inputs";
import MainContainer from "../../components/maincontainer";
import MainHeader from "../../components/mainheader";
import {useCreateCourse} from "../../hooks/useCourse";

const AddCoursePage = () => {
  const location = useLocation();
  const {mode} = queryString.parse(location.search);

  return (
    <div>
      <MainContainer>
        <MainHeader
          text="Courses"
          small={mode === "edit" ? "Edit course" : "Add a new course"}
        />
        <div className="w-full bg-white rounded-3xl p-4">
          <AddCourseMain />
        </div>
      </MainContainer>
    </div>
  );
};

const INITIAL_STATE = {
  title: "",
  description: "",
  image: null,
  moduleName: "",
  summary: "",
  courseCategory: "technology",
  skillLevel: "beginner",
};

export const AddCourseMain = ({mode}) => {
  const [state, setState] = useState(INITIAL_STATE);
  const navigate = useNavigate();
  const createCourse = useCreateCourse();
  const handleTextChange = ({target: {value, name}}) => {
    setState({...state, [name]: value});
  };
  const [getSearch] = useSearchParams();
  const currentMode = mode || getSearch.get("mode");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setState((prev) => {
      return {
        ...prev,
        image: file,
      };
    });
  };

  const handleFormSubmit = async (e, actionType) => {
    e.preventDefault();
    try {
      const payload = {
        courseTitle: state.title,
        courseDescription: state.description,
        courseImage: state.image,
        courseSummary: state.summary,
        courseCategory: state.courseCategory,
        skillLevel: state.skillLevel,
      };

      toast.promise(createCourse.mutateAsync(payload), {
        loading: `Creating course...`,
        success: (response) => {
          console.log(response);
          if (!response?.success) {
            throw new Error("An error occurred while creating course");
          }
          handleSuccess(response, actionType);
          return "Course created successfully";
        },
        error: (error) => {
          console.log("error", error);
          return "An error occured while creating the course. Please try again!";
        },
      });
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while creating course, Try again!");
    }
  };

  const handleSuccess = (response, actionType) => {
    const encodedModuleName = encodeURIComponent(state.moduleName);
    const courseId = response?.responseObject._id;
    const path =
      actionType === "continue-to-module"
        ? `/courses/add-module?mode=new_course&module_name=${encodedModuleName}&course_id=${courseId}`
        : `/courses/course-assessment?mode=new_course&module_name=${encodedModuleName}&course_id=${courseId}`;

    navigate(path);
  };

  return (
    <CourseForm
      mode={currentMode}
      state={state}
      onTextChange={handleTextChange}
      onImageChange={handleImageChange}
      onSubmit={handleFormSubmit}
      isLoading={createCourse.isLoading}
      setState={setState}
    />
  );
};

export default AddCoursePage;

const CourseForm = ({
  mode,
  state,
  onTextChange,
  onImageChange,
  onSubmit,
  isLoading,
  setState,
}) => (
  <div className="satoshi">
    <CourseHeader mode={mode} />

    <form className="mt-10 lg:w-1/2">
      <div className="space-y-4">
        <TextInput
          label="Name of Course"
          value={state.title}
          onChange={onTextChange}
          name="title"
        />

        <TextInput
          label="Summary of what the course is about"
          value={state.summary}
          onChange={onTextChange}
          name="summary"
        />

        <TextInput
          label={"Course Category"}
          value={state.courseCategory}
          name={"courseCategory"}
          onChange={onTextChange}
        />

        {/* <CustomSelect
          label="Course Category"
          name="courseCategory"
          value={state.courseCategory}
          onChange={onTextChange}
          options={[
            {value: "technology", label: "Technology"},
            {value: "web development", label: "Web Development"},
            {value: "mobile development", label: "Mobile Development"},
            {value: "data science", label: "Data Science"},
            {value: "design", label: "Design"},
            {value: "business", label: "Business"},
            {value: "marketing", label: "Marketing"},
            {value: "product management", label: "Product Management"},
          ]}
        /> */}

        <CustomSelect
          label="Skill Level"
          name="skillLevel"
          value={state.skillLevel}
          onChange={onTextChange}
          options={[
            {value: "beginner", label: "Beginner"},
            {value: "intermediate", label: "Intermediate"},
            {value: "advanced", label: "Advanced"},
          ]}
        />

        <TextArea
          label={"List of what the students would gain by taking this course"}
          value={state?.description}
          onChange={onTextChange}
          name="description"
          setState={setState}
          placeholder={"Enter Course overview"}
        />

        <ImageInput
          label="Choose Image"
          name="courseImage"
          state={state.image}
          onChange={onImageChange}
        />

        <ModuleSection
          handleSubmit={onSubmit}
          btnState={isLoading}
          state={state}
          onChange={onTextChange}
        />
      </div>

      <FormActions isLoading={isLoading} onSubmit={onSubmit} />
    </form>
  </div>
);

export const CustomSelect = ({label, name, value, onChange, options}) => (
  <div className="relative">
    <label className="text-secondary" htmlFor={name}>
      {label}
    </label>
    <Select
      name={name}
      className={clsx(
        "block w-full rounded-lg border h-12 px-2",
        "focus:outline-none appearance-none data-[focus]:outline-2 data-[focus]:-outline-offset-2",
        "text-[#222] bg-white"
      )}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
    <ChevronDownIcon
      className="absolute top-[2.5rem] right-2.5 h-4 w-4 text-[#222]"
      aria-hidden="true"
    />
  </div>
);

const CourseHeader = ({mode}) => (
  <>
    <h3 className="text-2xl font-bold text-myblue satoshi">
      {mode === "edit" ? "Edit Course" : "Add New Course"}
    </h3>
    <header className="mt-4">
      <h2 className="text-xl font-bold text-myblue">
        Course Details and Module
      </h2>
    </header>
  </>
);

const ModuleSection = ({handleSubmit, btnState, state, onChange}) => (
  <div>
    <small className="text-base font-normal text-secondary">
      Module Details
    </small>
    <CreateModule
      handleSubmit={handleSubmit}
      btnState={btnState}
      onChange={onChange}
      state={state}
    />
  </div>
);

const FormActions = ({isLoading, onSubmit}) => (
  <div className="mt-8 flex gap-5 items-center">
    <Button
      onClick={(e) => onSubmit(e, "continue-to-assessment")}
      loading={isLoading}
      disabled={isLoading}
      type="submit"
    >
      Continue
    </Button>
    <h6 className="text-base font-medium text-myblue underline cursor-pointer">
      Save as template
    </h6>
  </div>
);
