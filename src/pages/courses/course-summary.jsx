import { AlertCircle, BookOpen, Clock, ListChecks, Plus } from "lucide-react";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Shell from "../../components/shell";
import { useGetCourseSummary } from "../../hooks/useCourse";
import { Button } from "@headlessui/react";
import { toast } from "sonner";

function CourseSummaryPage() {
  const [getSearch] = useSearchParams();
  const courseId = getSearch.get("course_id") || "";
  const isCoursePublished = getSearch.get("isPublished");
  const {data, isLoading, isError} = useGetCourseSummary({id: courseId});
  const [newModuleName, setNewModuleName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const course = data?.responseObject?.data;
  const navigate = useNavigate();
  const handleAddModule = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      // Add your module creation API call here
      const encodedModuleName = encodeURIComponent(newModuleName);
      if (!encodedModuleName || !courseId || encodedModuleName.length < 1) {
        toast.error("Error");
        return;
      }
      // note: check if the course has been published if yes then mode = edit
      if (isCoursePublished === "true") {
        navigate(
          `/courses/add-module?mode=edit&module_name=${encodedModuleName}&course_id=${courseId}`
        );
      } else {
        navigate(
          `/courses/add-module?mode=new_course&module_name=${encodedModuleName}&course_id=${courseId}`
        );
      }
      return setNewModuleName("");
    } finally {
      setIsAdding(false);
    }
  };

  // const dropdownItems = [
  //   {
  //     label: "Duplicate",
  //     icon: <CopyIcon className="w-4 h-4" />,
  //     onClick: () => console.log("Duplicate clicked"),
  //   },
  //   {
  //     label: "Delete Module",
  //     icon: <Trash2 className="w-4 h-4" />,
  //     onClick: () => console.log("Delete clicked"),
  //     danger: true,
  //   },
  // ];

  const handleContinue = () => {
    const encodedCourseTitle = encodeURIComponent(course?.title);
    if (!encodedCourseTitle) {
      toast.error(
        "An error occurred while creating the course. Please try again!"
      );
      return;
    }
    if (isCoursePublished === "true") {
      navigate(
        `/courses/edit-course-assessment?mode=edit&course_id=${courseId}&module_name=${encodedCourseTitle}`
      );
    } else {
      navigate(
        `/courses/course-assessment?mode=new_course&module_name=${encodedCourseTitle}&course_id=${courseId}`
      );
    }
  };

  if (isError) {
    return (
      <Shell pageHeader="" pageTitle="Course Preview">
        <div className="p-6 bg-red-50 rounded-lg flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5" />
          Failed to load course details
        </div>
      </Shell>
    );
  }

  return (
    <div>
      <Shell pageHeader="" pageTitle="Course Preview">
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Add Module */}
          <div className="bg-white space-y-8 p-4 rounded-xl shadow-sm border">
            {/* Add Module end */}
            {/* Course Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              {isLoading ? (
                <Skeleton count={2} height={30} />
              ) : (
                <>
                  <span className="text-sm font-medium text-muted-foreground">
                    Course Title
                  </span>
                  <h1 className="text-3xl font-bold mt-2">{course?.title}</h1>
                  <div className="mt-4 flex gap-6 text-muted-foreground">
                    {/* <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        {course?.totalDuration || 0} hours
                      </span>
                    </div> */}
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {/* <span className="text-sm">
                        {course?.moduleCount || 0} modules
                      </span> */}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modules Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center gap-3 mb-6">
                <ListChecks className="w-6 h-6 text-black" />
                <h2 className="text-xl font-semibold">Course Modules</h2>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} height={80} />
                  ))}
                </div>
              ) : (
                <div className="grid gap-4">
                  {course?.course_modules?.length > 0 ? (
                    course.course_modules.map((module, index) => (
                      <div
                        key={module.id}
                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-muted-foreground">
                                Module {index + 1}
                              </span>
                              <h3 className="font-medium">{module.title}</h3>
                            </div>
                            {module.description && (
                              <p className="text-sm text-muted-foreground mt-2">
                                {module.description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {/* <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{module.duration || 0}h</span>
                            </div> */}
                            <span className="bg-primary/10 text-black px-2 py-1 rounded-md text-xs">
                              {module.status || "Draft"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-8 text-muted-foreground">
                      No modules added yet
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <input
                className="flex-1 h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter module name"
                value={newModuleName}
                onChange={(e) => setNewModuleName(e.target.value)}
                disabled={isAdding}
              />
              <div className="flex items-center gap-2">
                <button
                  className="h-12 px-6 bg-black text-white font-medium rounded-lg
                             hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors flex items-center gap-2"
                  onClick={handleAddModule}
                  disabled={!newModuleName.trim() || isAdding}
                >
                  {isAdding ? (
                    <span>Adding...</span>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Add Module</span>
                    </>
                  )}
                </button>
                {/* <DropdownMenu
                  items={dropdownItems}
                  position="right"
                  triggerClassName="h-12 w-12 flex items-center justify-center border rounded-lg hover:bg-muted/50"
                /> */}
              </div>
            </div>

            <div className="py-12 flex justify-end">
              <Button
                className="bg-black text-white h-12 px-5 rounded-lg"
                onClick={handleContinue}
              >
                Continue to Course Assessment
              </Button>{" "}
            </div>
          </div>
        </div>
      </Shell>
    </div>
  );
}

export default CourseSummaryPage;
