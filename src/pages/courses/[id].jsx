import DOMPurify from "dompurify";
import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {DeleteBtn, MainBtn} from "../../components/button";
import {PageLoader} from "../../components/loader";
import DeleteModal from "../../components/modals/deletemodal";
import Shell from "../../components/shell";
import {
  useDeleteCourse,
  useGetCourseById,
  useGetCoursePriceById,
} from "../../hooks/useCourse";
import {toast} from "sonner";

const createMarkup = (html) => ({
  __html: DOMPurify.sanitize(html || ""),
});

const CourseDetails = () => {
  const params = useParams();
  const {data, isLoading} = useGetCourseById({id: params.id});
  const {data: coursePriceData, isLoading: isCoursePriceLoading} =
    useGetCoursePriceById({id: params.id});
  const [modal, setModal] = useState("");
  const navigate = useNavigate();
  const deleteCourse = useDeleteCourse({id: params.id});

  const handleDelete = () => {
    toast.promise(deleteCourse.mutateAsync(), {
      loading: "Deleteing course...",
      success: (res) => {
        if (!res.success) {
          return "Error deleting course. Try again!";
        }
        navigate("/courses");
        return "Course deleted";
      },
      error: () => {
        return "An error occured while deleting course.";
      },
    });
  };

  const course = !isLoading && data?.responseObject.data;
  const coursePrice =
    !isCoursePriceLoading && coursePriceData?.responseObject.data;

  const stats = [
    {title: "No. of Modules", value: course?.course_modules?.length || 0},
    {title: "Skill Level", value: course?.skillLevel},
    {title: "Category", value: course?.category},
    {title: "Status", value: course?.status},
  ];

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Shell pageHeader={""} pageTitle="Course Details">
      <div className="w-full bg-white rounded-3xl p-8">
        <div className="flex h-96 flex-col lg:flex-row py-12 gap-8 mb-8">
          <img
            src={course?.image}
            alt={course?.title}
            className="w-full lg:w-1/3 object-cover"
          />

          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold capitalize text-gray-900">
              {course?.title}
            </h1>
            <p className="text-md text-gray-600">{course?.summary}</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg uppercase"
                >
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-md font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-16">
          <div className="bg-gray-50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Course Description
            </h2>
            <div
              className="prose max-w-none text-md"
              dangerouslySetInnerHTML={createMarkup(course?.description)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {!isCoursePriceLoading && coursePrice && (
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Pricing
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  NGN{" "}
                  {!isCoursePriceLoading && coursePrice === null
                    ? "Unavailable"
                    : (coursePrice?.coursePricing).toFixed(2)}
                </p>
              </div>
            )}

            {course?.course_benchmark && (
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Course Requirements
                </h3>
                <p className="text-md text-gray-900">
                  Passing Score: {course?.course_benchmark.benchmark}%
                </p>
                <p className="text-md text-gray-900">
                  Retakes Allowed: {course?.course_benchmark.retakes}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-12">
            <MainBtn
              text="Edit Course"
              onClick={() =>
                navigate(
                  `/courses/edit-course?course=${params.id}&type=course&mode=edit&isPublished=${course?.isPublished}`
                )
              }
            />
            <DeleteBtn
              text="Delete Course"
              onClick={() => setModal("delete")}
            />
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {modal === "delete" && (
        <DeleteModal
          handleCloseModal={() => setModal("")}
          title="Course"
          id={params.id}
          onClick={handleDelete}
        />
      )}
    </Shell>
  );
};

export default CourseDetails;

export const ContentWriteup = (content, cls) => {
  return (
    <>
      <div
        className={cls || "text-xs text-main satoshi"}
        dangerouslySetInnerHTML={createMarkup(content || "")}
      />
    </>
  );
};
