import { useState } from "react";
import { useCreateCourseFromTemplate } from "../hooks/useTemplate";
import { ContentWriteup } from "../pages/courses/[id]";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const TemplateCard = ({
  templateId,
  Img,
  title,
  desc,
  onClick,
  modal,
  setModal,
}) => {
  const [loading, setLoading] = useState(false);
  const createCourseFromTemplate = useCreateCourseFromTemplate();
  const navigate = useNavigate();

  const handleCreateCourseFromTemplate = async () => {
    setLoading(true);
    try {
      toast.promise(createCourseFromTemplate.mutateAsync(templateId), {
        loading: "Creating course from template",
        success: (response) => {
          console.log("response", response);
          if (response.success) {
            toast.success("Course created from template successfully");
            navigate(
              `/courses/edit-course?course=${response?.responseObject.data._id}&mode=edit&type=course`
            );
            return "Course created successfully";
          } else {
            throw new Error("Course was not created, Try again!");
          }
        },
      });
    } catch (error) {
      toast.error(
        "An error occurred while creating the course. Please try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="border relative bg-white rounded-xl w-full max-w-[300px] grid grid-rows-[110px_130px_50px] shadow-sm">
        <img
          src={Img}
          alt=""
          className="rounded-t-xl w-full h-full object-cover"
        />

        <div className="p-4 overflow-hidden">
          <h5 className="font-medium text-secondary text-base satoshi">
            {title}
          </h5>
          {ContentWriteup(
            desc,
            "satoshi text-xs font-normal text-main line-clamp-6"
          )}
        </div>

        <div className="w-full p-4 flex items-center justify-between">
          {/* <h6
            onClick={onClick}
            className="text-sm font-medium satoshi text-myblue underline cursor-pointer"
          >
            Use Template
          </h6> */}
          <Button onClick={handleCreateCourseFromTemplate} loading={loading}>
            Use Template
          </Button>
          {/* <Button
            css={`cursor-pointer`}
            onClick={() => {
              setModal("assign-course-modal");
            }}
          >
            Assign
          </Button> */}
        </div>
      </div>
    </>
  );
};
