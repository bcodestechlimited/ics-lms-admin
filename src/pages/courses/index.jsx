import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import CourseTable from "../../components/course-table";
import {
  AssignCourseModal,
  CourseAssignedModal,
} from "../../components/modals/assign-course-modal";
import Shell from "../../components/shell";
import { useGetCourse } from "../../hooks/useCourse";
import { ContentWriteup } from "./[id]";
import { useCourseStore } from "../../store/course-store";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DEFAULT_LIMIT } from "../../helpers/service.helpers";

const CoursesPage = () => {
  const [modal, setModal] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const setQueryParams = useCourseStore((s) => s.setQueryParams);
  const navigate = useNavigate();

  const pageFromUrl = Number(searchParams.get("page") || 1);
  const limitFromUrl = Number(searchParams.get("limit") || DEFAULT_LIMIT);
  const searchFromUrl = searchParams.get("search") || "";

  useEffect(() => {
    setQueryParams({
      page: pageFromUrl,
      limit: limitFromUrl,
      search: searchFromUrl,
    });
  }, [pageFromUrl, limitFromUrl, searchFromUrl, setQueryParams]);

  const { data, isLoading } = useGetCourse();
  const courses = !isLoading && data?.data?.courses;
  const pagination = data?.data?.pagination ?? {
    totalCount: 0,
    filteredCount: 0,
    totalPages: 0,
    page: pageFromUrl,
    limit: limitFromUrl,
  };

  const handlePageChange = (nextPage) => {
    const page = Math.max(1, Math.min(nextPage, pagination.totalPages || 1));
    searchParams.set("page", String(page));
    searchParams.set("limit", String(pagination.limit || DEFAULT_LIMIT));
    // Keep existing search param stable
    if (searchFromUrl) searchParams.set("search", searchFromUrl);
    setSearchParams(searchParams, { replace: true });
    setQueryParams({ page });
    // Optional UX: scroll to table top on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLimitChange = (nextLimit) => {
    const limit =
      Number.isFinite(nextLimit) && nextLimit > 0 ? nextLimit : DEFAULT_LIMIT;
    // Reset to page 1 whenever limit changes to avoid empty pages
    searchParams.set("page", "1");
    searchParams.set("limit", String(limit));
    if (searchFromUrl) searchParams.set("search", searchFromUrl);
    setSearchParams(searchParams, { replace: true });
    setQueryParams({ page: 1, limit });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const btn = {
    isActive: true,
    title: "Create Course",
    onClick: () => {
      navigate("/courses/add-course");
    },
  };

  return (
    <div>
      <Shell pageHeader="View all Courses" pageTitle="Courses" btnAction={btn}>
        <div className="">
          <CourseTable
            courses={courses || []}
            isLoading={isLoading}
            page={pagination.page}
            limit={pagination.limit || limitFromUrl}
            totalPages={pagination.totalPages || 0}
            totalCount={pagination.totalCount || 0}
            filteredCount={pagination.filteredCount || 0}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
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

export const CourseCard = ({ Img, title, desc, onClick, modal, setModal }) => {
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
            "satoshi text-xs font-normal text-main line-clamp-2",
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
        </div>
      </div>
    </>
  );
};

export default CoursesPage;
