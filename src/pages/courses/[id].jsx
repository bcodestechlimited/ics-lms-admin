import DOMPurify from "dompurify";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { DeleteBtn, MainBtn } from "../../components/button";
import { PageLoader } from "../../components/loader";
import DeleteModal from "../../components/modals/deletemodal";
import Shell from "../../components/shell";
import {
  useDeleteCourse,
  useGetCourseById,
  useGetCoursePriceById,
  useUpdateCourseImageFlow,
} from "../../hooks/useCourse";

const createMarkup = (html) => ({
  __html: DOMPurify.sanitize(html || ""),
});

const CourseDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetCourseById({ id: params.id });
  const { data: coursePriceData, isLoading: isCoursePriceLoading } =
    useGetCoursePriceById({ id: params.id });

  const deleteCourse = useDeleteCourse({ id: params.id });

  const [modal, setModal] = useState("");

  const [courseImageFile, setCourseImageFile] = useState(null);
  const uploadCourseImage = useUpdateCourseImageFlow({ courseId: params.id });

  const imageError = useMemo(() => {
    if (!courseImageFile) return "";

    const isImage = courseImageFile.type?.startsWith("image/");
    if (!isImage) return "Course image must be an image file (png/jpg/webp).";

    const maxBytes = 2 * 1024 * 1024; // 2MB
    if (courseImageFile.size > maxBytes)
      return "Image is too large. Max size is 2MB.";

    return "";
  }, [courseImageFile]);

  const handleUploadCourseImage = async () => {
    if (!courseImageFile || imageError) return;

    toast.promise(uploadCourseImage.mutateAsync({ file: courseImageFile }), {
      loading: "Uploading course image...",
      success: () => {
        setCourseImageFile(null);
        return "Course image updated successfully.";
      },
      error: (err) => {
        return "Failed to update course image.";
      },
    });
  };

  const handleDelete = () => {
    toast.promise(deleteCourse.mutateAsync(), {
      loading: "Deleteing course...",
      success: () => {
        navigate("/courses");
        return "Course deleted";
      },
      error: (err) => {
        console.log(err);
        return "An error occured while deleting course.";
      },
    });
  };

  const course = !isLoading && data?.responseObject.data;
  const coursePrice =
    !isCoursePriceLoading && coursePriceData?.responseObject.data;

  const stats = [
    {
      title: "Modules",
      value: course?.course_modules?.length || 0,
      icon: "📚",
      color: "from-blue-50 to-blue-100",
    },
    {
      title: "Level",
      value: course?.skillLevel,
      icon: "📊",
      color: "from-purple-50 to-purple-100",
    },
    {
      title: "Category",
      value: course?.category,
      icon: "🏷️",
      color: "from-green-50 to-green-100",
    },
    {
      title: "Status",
      value: course?.status,
      icon: "✓",
      color: "from-orange-50 to-orange-100",
    },
  ];

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Shell pageHeader={""} pageTitle="Course Details">
      <div className="w-full mx-auto space-y-6">
        {/* Alert Messages */}
        {uploadCourseImage.isError && (
          <div className="rounded border-red-500 bg-red-50 p-4 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div className="flex-1">
                <p className="font-semibold text-red-900">Upload Failed</p>
                <p className="text-sm text-red-700 mt-1">
                  {uploadCourseImage.error?.message ||
                    "An error occured while uploading course image."}
                </p>
              </div>
              <button
                onClick={() => uploadCourseImage.reset()}
                className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-red-100"
                aria-label="Dismiss error"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {uploadCourseImage.isSuccess && (
          <div className="rounded border-green-800 bg-green-50 p-4 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div className="flex-1">
                <p className="font-semibold text-green-900">Success!</p>
                <p className="text-sm text-green-700 mt-1">
                  Course image updated successfully.
                </p>
              </div>
              <button
                onClick={() => uploadCourseImage.reset()}
                className="text-green-400 hover:text-green-600 transition-colors p-1 rounded-lg hover:bg-green-100"
                aria-label="Dismiss success message"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl border  overflow-hidden">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-3 gap-8 p-8 lg:p-12">
            {/* Image Column */}
            <div className="lg:col-span-1 space-y-5">
              {/* Course Image */}
              <div className="group rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img
                  src={course?.image}
                  alt={course?.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Image Upload Section */}
              <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-5 space-y-4 hover:border-gray-300 transition-colors duration-300">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📸</span>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Update Course Image
                  </h3>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setCourseImageFile(e.target.files?.[0] || null)
                  }
                  className="block w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 transition-all file:mr-4 file:rounded-md file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:transition-colors hover:file:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                />

                {imageError && (
                  <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                    <span>⚠️</span>
                    <span className="flex-1">{imageError}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleUploadCourseImage}
                  disabled={
                    !courseImageFile ||
                    Boolean(imageError) ||
                    uploadCourseImage.isPending
                  }
                  className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-md active:scale-95"
                >
                  {uploadCourseImage.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Uploading...</span>
                    </span>
                  ) : (
                    "Upload Image"
                  )}
                </button>
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title Section */}
              <div className="space-y-3">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                  {course?.title}
                </h1>
                <div className="max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                  <p className="text-lg text-gray-600 leading-relaxed text-justify">
                    {course?.summary}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`group relative bg-gradient-to-br ${stat.color} rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      {stat.title}
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="px-8 lg:px-12 py-10 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
            <div className="relative inline-block mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Course Description
              </h2>
              <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>
            <div className="max-h-64 overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify"
                dangerouslySetInnerHTML={createMarkup(course?.description)}
              />
            </div>
          </div>

          {/* Pricing & Requirements Section */}
          <div className="px-8 lg:px-12 py-10 space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Pricing Card */}
              {!isCoursePriceLoading && coursePrice && (
                <div className="relative rounded-2xl p-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">💰</span>
                      <h3 className="text-lg font-semibold">Course Pricing</h3>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold tracking-tight">
                        ₦
                        {!isCoursePriceLoading && coursePrice === null
                          ? "N/A"
                          : coursePrice?.coursePricing
                            ? Number(coursePrice.coursePricing).toLocaleString(
                                "en-NG",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                },
                              )
                            : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Requirements Card */}
              {course?.course_benchmark && (
                <div className="rounded-2xl p-8 bg-gradient-to-br from-green-600 to-green-700 text-white shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">🎯</span>
                    <h3 className="text-lg font-semibold">Requirements</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-3 backdrop-blur-sm border border-white/20">
                      <span className="text-sm font-medium">Passing Score</span>
                      <span className="text-xl font-bold">
                        {course?.course_benchmark.benchmark}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-3 backdrop-blur-sm border border-white/20">
                      <span className="text-sm font-medium">
                        Retakes Allowed
                      </span>
                      <span className="text-xl font-bold">
                        {course?.course_benchmark.retakes}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-8 lg:px-12 py-8 bg-gray-50 border-t border-gray-100">
            <div className="flex flex-wrap gap-4">
              <MainBtn
                text="Edit Course"
                onClick={() =>
                  navigate(
                    `/courses/edit-course?course=${params.id}&type=course&mode=edit&isPublished=${course?.isPublished}`,
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
