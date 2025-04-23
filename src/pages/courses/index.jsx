import { Button } from "@headlessui/react";
import React, { useState } from "react";
import CourseTable from "../../components/course-table";
import {
  AssignCourseModal,
  CourseAssignedModal,
} from "../../components/modals/assign-course-modal";
import Shell from "../../components/shell";
import { useGetCourse } from "../../hooks/useCourse";
import { ContentWriteup } from "./[id]";

const CoursesPage = () => {
  const [modal, setModal] = useState("");
  const handleClose = () => {
    setModal("");
  };

  const handleAssignModalSuccess = () => {
    handleClose();
    setModal("course-assigned-success-modal");
  };

  const handleShowCourseAssignedModal = () => {
    setModal("");
  };

  const {data, isLoading} = useGetCourse();
  const courses = !isLoading && data?.responseObject?.response;

  return (
    <div>
      <Shell pageHeader="View all Courses" pageTitle="Courses">
        <div className="">
          <CourseTable courses={courses?.docs || []} isLoading={isLoading} />
        </div>
      </Shell>
      {/* modals */}
      <div>
        {modal === "assign-course-modal" && (
          <AssignCourseModal
            handleClose={handleClose}
            show={modal === "assign-course-modal"}
            handleAssignModalSuccess={handleAssignModalSuccess}
          />
        )}
      </div>

      <div>
        {modal === "course-assigned-success-modal" && (
          <CourseAssignedModal
            show={modal === "course-assigned-success-modal"}
            handleShowCourseAssignedModal={handleShowCourseAssignedModal}
          />
        )}
      </div>
    </div>
  );
};

export const CourseCard = ({Img, title, desc, onClick, modal, setModal}) => {
  return (
    <>
      <div className="border relative bg-white rounded-lg w-full max-w-[300px] grid grid-rows-[110px_130px_50px] shadow-sm p-2">
        <img
          src={Img}
          alt=""
          className="rounded-lg w-full h-full object-cover"
        />

        <div className="py-2 space-y-2 overflow-hidden">
          <h5 className="font-medium text-secondary text-base satoshi">
            {title}
          </h5>
          {ContentWriteup(
            desc,
            "satoshi text-xs font-normal text-main line-clamp-2"
          )}
        </div>

        <div className="w-full flex items-center justify-between">
          <Button
            onClick={onClick}
            className="text-sm font-medium satoshi text-white cursor-pointer h-8 rounded-lg bg-myblue w-full"
            variant="primary"
          >
            View
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

export default CoursesPage;
