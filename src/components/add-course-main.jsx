import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useCreateCourse } from "../hooks/useCourse";
import CreateModule from "./add-module";
import { Button } from "./button";
import { ImageInput, TextArea, TextInput } from "./inputs";

export const AddCourseMain = ({ handleNext, datum }) => {
  const init = {
    title: "",
    description: "",
    image: null,
  };
  const [state, setState] = useState(init);
  // [isEdit, setIsEdit] = useState(false),
  const textChange = ({ target: { value, name } }) => {
    setState({ ...state, [name]: value });
  };
  const [getSearch] = useSearchParams();
  const mode = getSearch.get("mode");
  const [modal, setModal] = useState("");
  const createCourse = useCreateCourse();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    // console.log("the image is", state.image);
    try {
      e.preventDefault();
      setLoading(true);

      const payload = {
        courseTitle: state.title,
        courseDescription: state.description,
        courseImage: state.image,
      };
      await createCourse.mutateAsync(payload);

      // handle the response
    } catch (error) {
      toast.error("An error occurred while creating course, Try again!");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (datum) {
  //     setState({ ...datum, softwares: datum?.softwares?.toString() });
  //   }
  // }, [datum]);

  // useEffect(() => {
  //   if (datum) setState({ ...state, ...datum });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [datum]);

  const inputImageChange = (e) => {
    const file = e.target.files[0];

    setState((prev) => {
      return {
        ...prev,
        image: file,
      };
    });
  };

  return (
    <>
      <div className="satoshi">
        <h3 className="text-[20px] font-bold text-myblue satoshi">
          {mode === "edit" ? "Edit course" : "Add New Course"}
        </h3>
        <header>
          <h2 className="text-[20px] font-normal text-myblue">
            Course Details and Module
          </h2>
        </header>
        <form onSubmit={handleSubmit} className="mt-10 lg:w-1/2">
          <div className="space-y-4">
            <TextInput
              label={"Name of Course"}
              value={state?.title}
              onChange={textChange}
              name={"title"}
            />

            <TextArea
              label={"Course overview"}
              value={state?.description}
              onChange={textChange}
              name="description"
              setState={setState}
              placeholder={"Enter Course overview"}
            />
            {/* Choose Image */}
            <ImageInput
              label={"Choose Image"}
              name={"profilePicture"}
              state={state.image}
              onChange={inputImageChange}
            />

            {/* Add Module */}
            <div>
              <small className="text-base font-normal satoshi text-secondary">
                Module Details
              </small>
              <CreateModule setModal={setModal} handleSubmit={handleSubmit} />
            </div>
          </div>
          <div className="mt-8 flex gap-5 items-center">
            <Button
              onClick={handleSubmit}
              loading={loading}
              children={"Continue"}
              type="submit"
            />
            <h6 className="text-base satoshi font-normal text-myblue underline cursor-pointer">
              Save as template
            </h6>
          </div>
        </form>
      </div>
    </>
  );
};
