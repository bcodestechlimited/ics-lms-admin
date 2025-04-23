/* eslint-disable no-unused-vars */
import {
  ArrowDown,
  ArrowUp,
  CopyIcon,
  PenIcon,
  PlusIcon,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import ImageIcon from "../../assets/image-icon.svg";
import ListIcon from "../../assets/list-icon.svg";
import StatementIcon from "../../assets/statement-icon.svg";
import TextIcon from "../../assets/text-icon.svg";
import VideoIcon from "../../assets/video-icon.svg";
import { Button } from "../../components/button";
import KnowledgeCheck from "../../components/knowledge-check";
import MainContainer from "../../components/maincontainer";
import MainHeader from "../../components/mainheader";
import { ChartEditorModal } from "../../components/modals/chart-editor-modal";
import { ChartTypeSelector } from "../../components/modals/chart-type-selector";
import QuoteSection from "../../components/module-quote";
import ModuleTextarea from "../../components/module-textarea";
import ModuleVideoInput from "../../components/module-video-input";
import { useCreateCourseModule } from "../../hooks/useCourse";
import useCourseModuleCache from "../../hooks/useCourseModuleCache";

const styles = {
  icons: `w-5 h-5 cursor-pointer text-secondary`,
};

const defaultChartData = {
  bar: {
    series: [
      {
        name: "Sales",
        data: [30, 40, 45, 50, 49, 60],
      },
    ],
    options: {
      chart: { type: "bar" },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      },
    },
  },
  line: {
    series: [
      {
        name: "Views",
        data: [10, 41, 35, 51, 49, 62],
      },
    ],
    options: {
      chart: { type: "line" },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      },
    },
  },
  pie: {
    series: [44, 55, 13, 43, 22],
    options: {
      chart: { type: "pie" },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    },
  },
};

const CourseModulePage = () => {
  const [contentSections, setContentSections] = useState([]);
  const [editMode, setEditMode] = useState([]);
  const [sectionStates, setSectionStates] = useState({});
  const [showChartSelector, setShowChartSelector] = useState(false);
  const [chartSelectorPosition, setChartSelectorPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showChartEditor, setShowChartEditor] = useState(false);
  const [activeChartSection, setActiveChartSection] = useState(null);
  const navigate = useNavigate();
  // get the module name from the url
  const [getSearch] = useSearchParams();
  // const mode = getSearch.get("mode");
  const moduleName = getSearch.get("module_name") || "";
  const courseId = getSearch.get("course_id") || "";
  const [moduleTitle, setModuleTitle] = useState(moduleName || "");
  const createCourseModule = useCreateCourseModule();
  const {
    cachedModule,
    clearModuleCache,
    markUnsavedChanges,
    saveModuleToCache,
  } = useCourseModuleCache(courseId, contentSections);

  // useEffect(() => {
  //   if (cachedModule) {
  //     setModuleTitle(cachedModule.title);
  //     setContentSections(cachedModule.contentSections || []);
  //   }
  // }, [cachedModule]);

  const handleModuleTitle = (e) => {
    setModuleTitle(e.target.value);
  };
  // console.log({ contentSections });

  const generateId = () =>
    `section-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  // const handleChartIconClick = (e) => {
  //   const rect = e.currentTarget.getBoundingClientRect();

  //   setChartSelectorPosition({
  //     x: rect.left + -350,
  //     y: rect.top,
  //   });
  //   setShowChartSelector(true);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        courseId: courseId,
        title: moduleTitle,
        contentSections,
      };
      if (!courseId) {
        toast.error("Course ID is required");
        navigate("/courses/add-course");
        return;
      }
      // saveModuleToCache(contentSections);
      toast.promise(createCourseModule.mutateAsync(payload), {
        loading: "Creating course module",
        success: (response) => {
          const encodedModuleName = encodeURIComponent(moduleTitle);
          const encodedCourseId = encodeURIComponent(courseId);
          if (response.success) {
            // navigate the user to the summary page where they can add more modules
            navigate(
              `/courses/course-summary?mode=new_course&course_id=${encodedCourseId}`
            );
            // navigate the user to the course-assessment page
            // navigate(
            //   "/courses/course-assessment?mode=new_course&module_name=" +
            //     encodedModuleName +
            //     "&course_id=" +
            //     encodedCourseId
            // );
          }
          return "Added Course Module";
        },
        error: (error) => {
          return "An error occurred while creating course module";
        },
      });
    } catch (error) {
      toast.error("An error occurred while creating course module");
    }
  };

  const modules = [
    {
      icon: TextIcon,
      title: "Text",
      type: "text",
      // onClick: (type) => handleAddSection(type),
      onClick: () => {},
    },
    {
      icon: ListIcon,
      title: "List",
      type: "list",
      onClick: (type) => handleAddSection(type),
    },
    {
      icon: ImageIcon,
      title: "Image",
      type: "image",
      onClick: (type) => handleAddSection(type),
    },
    {
      icon: VideoIcon,
      title: "Video",
      type: "video",
      onClick: (type) => handleAddSection(type),
    },
    // {
    //   icon: ChartIcon,
    //   title: "Chart",
    //   type: "chart",
    //   onClick: (e) => handleChartIconClick(e),
    // },
    // {
    //   icon: QuoteIcon,
    //   title: "Quote",
    //   type: "quote",
    //   onClick: (type) => handleAddSection(type),
    // },
    {
      icon: StatementIcon,
      title: "Knowledge Check",
      type: "knowledge-check",
      onClick: (type) => handleAddSection(type),
    },
  ];

  const handleEditToggle = (sectionId) => {
    setEditMode((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleUpdateQuoteContent = (sectionId, field, value) => {
    setContentSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: {
                ...section.content,
                [field]: value,
              },
            }
          : section
      )
    );
  };

  const handleDuplicateSection = (sectionId) => {
    const sectionToDuplicate = contentSections.find(
      (section) => section.id === sectionId
    );

    if (sectionToDuplicate) {
      const duplicatedSection = {
        ...sectionToDuplicate,
        id: generateId(),
      };

      // Find the index of the original section
      const currentIndex = contentSections.findIndex(
        (section) => section.id === sectionId
      );
      // Insert the duplicated section right after the original section
      setContentSections((prev) => [
        ...prev.slice(0, currentIndex + 1),
        duplicatedSection,
        ...prev.slice(currentIndex + 1),
      ]);
    }
  };

  const handleAddSection = (type, afterId = null, chartData = null) => {
    const newSection = {
      id: generateId(),
      type,
      content:
        type === "knowledge-check"
          ? {
              question: "",
              type: "single",
              options: [
                {id: 1, text: "", isCorrect: false},
                {id: 2, text: "", isCorrect: false},
                {id: 3, text: "", isCorrect: false},
                {id: 4, text: "", isCorrect: false},
              ],
            }
          : type === "quote"
          ? {
              quoteText: "",
              authorName: "",
              avatar: null,
            }
          : type === "chart"
          ? chartData
          : "",
    };

    setContentSections((prev) => {
      markUnsavedChanges();
      if (!afterId) {
        return [...prev, newSection];
      }

      const insertIndex = prev.findIndex((section) => section.id === afterId);
      return insertIndex === -1
        ? [...prev, newSection]
        : [
            ...prev.slice(0, insertIndex + 1),
            newSection,
            ...prev.slice(insertIndex + 1),
          ];
    });
  };

  const handleRemoveSection = (id) => {
    setContentSections((prev) => prev.filter((section) => section.id !== id));
  };

  const handleUpdateContent = (id, newContent) => {
    setContentSections((prev) =>
      prev.map((section) =>
        section.id === id ? {...section, content: newContent} : section
      )
    );
  };

  const handleMoveSection = (sectionId, direction) => {
    setContentSections((prev) => {
      const currentIndex = prev.findIndex(
        (section) => section.id === sectionId
      );
      if (currentIndex === -1) return prev;
      const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const newSections = [...prev];
      [newSections[currentIndex], newSections[newIndex]] = [
        newSections[newIndex],
        newSections[currentIndex],
      ];

      return newSections;
    });
  };

  const updateSectionState = (sectionId, newState) => {
    setSectionStates((prev) => ({
      ...prev,
      [sectionId]: {...prev[sectionId], ...newState},
    }));
  };

  // handling chart

  const handleChartTypeSelect = (type) => {
    handleAddSection("chart", null, {type, ...defaultChartData[type]});
    setShowChartSelector(false);
  };

  const handleChartUpdate = (sectionId, newData) => {
    handleUpdateContent(sectionId, {
      ...contentSections.find((section) => section.id === sectionId).content,
      ...newData,
    });
  };

  const renderContentSection = (section) => {
    const commonClasses = "border p-4 rounded-md space-y-1 relative";

    const getInputByType = () => {
      switch (section.type) {
        case "text":
          return (
            <div className="relative">
              <div className="absolute top-2 right-2 shadow-sm rounded-md bg-white flex items-center gap-x-2">
                <PenIcon className="h-6 w-6" />
              </div>

              <textarea
                placeholder="Enter text content"
                value={section.content}
                onChange={(e) =>
                  handleUpdateContent(section.id, e.target.value)
                }
                className="block w-full min-h-[120px] p-2 border rounded-md"
              />
            </div>
          );
        case "image":
          return (
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                className="block w-full"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    // handle file upload to cloudinary hook here
                    // handleUpdateContent(section.id, URL.createObjectURL(file));
                    handleUpdateContent(section.id, file);
                  }
                }}
              />
              {section.content && (
                <img
                  src={section.content}
                  alt="Uploaded content"
                  className="max-w-full w-full h-auto max-h-[300px] object-cover"
                />
              )}
            </div>
          );
        case "video":
          return (
            <div className="space-y-4">
              <ModuleVideoInput
                state={sectionStates[section.id] || {}}
                setState={(newState) => {
                  updateSectionState(section.id, newState);
                  handleUpdateContent(section.id, newState.video);
                }}
                name={"video"}
                ty={"video"}
                accept="video/*"
              />
            </div>
          );
        case "list":
          return (
            <div className="relative min-h-[230px]">
              <ModuleTextarea
                label={"Enter module content"}
                value={section.content}
                name={section.id}
                setState={(newContent) =>
                  handleUpdateContent(section.id, newContent[section.id])
                }
                editMode={editMode[section.id]}
              />
            </div>
          );
        case "quote":
          return (
            <QuoteSection
              section={section}
              onUpdate={handleUpdateQuoteContent}
              editMode={editMode[section.id]}
            />
          );
        case "knowledge-check":
          return (
            <div className="">
              <KnowledgeCheck
                section={section}
                // onUpdate={(id, content) => handleUpdateContent(id, content)}
                onUpdate={handleUpdateContent}
                isStandalone={false}
              />
            </div>
          );
        // case "chart":
        //   return (
        //     <ChartDisplay
        //       type={section.content.type}
        //       data={section.content}
        //       onEdit={() => {
        //         setActiveChartSection(section);
        //         setShowChartEditor(true);
        //       }}
        //     />
        //   );

        default:
          return (
            <input
              type="text"
              placeholder={`Enter ${section.type} content`}
              value={section.content}
              onChange={(e) => handleUpdateContent(section.id, e.target.value)}
              className="block w-full p-2 border rounded-md"
            />
          );
      }
    };

    return (
      <div key={section.id} className={commonClasses}>
        <div className="flex justify-between items-center">
          <span className="font-medium text-secondary capitalize">
            {section.type.replace("-", " ")}
          </span>

          <div className="flex items-center gap-x-6 bg-white shadow-md p-2 rounded-md">
            <button data-tooltip-id="my-tooltip" data-tooltip-content={"Edit"}>
              <PenIcon
                className={`${styles.icons} ${
                  editMode[section.id] ? "text-blue-500" : ""
                }`}
                onClick={() => handleEditToggle(section.id)}
              />
            </button>

            <button
              data-tooltip-id="my-tooltip"
              data-tooltip-content={"Duplicate"}
            >
              <CopyIcon
                className={styles.icons}
                onClick={() => handleDuplicateSection(section.id)}
              />
            </button>

            <button data-tooltip-id="my-tooltip" data-tooltip-content={"New"}>
              <PlusIcon
                className={styles.icons}
                onClick={() => handleAddSection(section.type, section.id)}
              />
            </button>

            <button
              data-tooltip-id="my-tooltip"
              data-tooltip-content={"Move up"}
            >
              <ArrowUp
                className={styles.icons}
                onClick={() => handleMoveSection(section.id, "up")}
              />
            </button>

            <button
              data-tooltip-id="my-tooltip"
              data-tooltip-content={"Move down"}
            >
              <ArrowDown
                className={styles.icons}
                onClick={() => handleMoveSection(section.id, "down")}
              />
            </button>

            <button
              onClick={() => handleRemoveSection(section.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={"Delete"}
            >
              <Trash2 className={styles.icons} />
            </button>
          </div>
        </div>

        {getInputByType()}
      </div>
    );
  };

  return (
    <div className="satoshi">
      <MainContainer>
        <MainHeader text="Courses" small={"Course Details and Module"} />
        <div className="relative">
          <div className="mb-8">
            <h2 className="text-[20px] font-semibold text-secondary">
              Course Details and Module
            </h2>
          </div>

          <div className="mb-12">
            {/*   SECTION INPUT BOX/ELEMENT */}

            <div className="max-w-[80%] space-y-8">
              <div className="border p-4 rounded-md space-y-1">
                <span className="">Module Title</span>

                {/* <h3 className="font-medium text-secondary">Module</h3> */}

                <input
                  type="text"
                  placeholder="Enter Title"
                  className="block h-12 w-full px-2 border rounded-md"
                  onChange={handleModuleTitle}
                  value={moduleTitle}
                />
              </div>

              {contentSections.map(renderContentSection)}

              {/* chart components */}

              {showChartSelector && (
                <ChartTypeSelector
                  position={chartSelectorPosition}
                  onSelect={handleChartTypeSelect}
                />
              )}

              {showChartEditor && activeChartSection && (
                <ChartEditorModal
                  isOpen={showChartEditor}
                  onClose={() => setShowChartEditor(false)}
                  chartType={activeChartSection.content.type}
                  initialData={activeChartSection.content}
                  onSave={(newData) =>
                    handleChartUpdate(activeChartSection.id, newData)
                  }
                />
              )}
            </div>

            <div className="">
              <div className="absolute top-4 right-10">
                <div className="border border-[#0269D0] max-w-[125px] rounded-md bg-[#EDF6FF] py-[22px] px-[13px] space-y-4">
                  {modules.map((module) => {
                    return (
                      <Box
                        img={module.icon}
                        text={module.title}
                        key={module.title}
                        onClick={(e) => {
                          module.type === "chart"
                            ? module.onClick(e)
                            : module.onClick(module.type);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button type="button" onClick={(e) => handleSubmit(e)}>
            Continue
          </Button>
        </div>
      </MainContainer>
    </div>
  );
};

const Box = ({img, text, onClick}) => {
  return (
    <div
      onClick={(e) => onClick(e)}
      className="flex flex-col items-center justify-center gap-y-3 bg-white rounded-md py-2 px-4 cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div>
        <img src={img} alt={text} />
      </div>

      <h4 className="font-medium text-secondary text-center">{text}</h4>
    </div>
  );
};

export default CourseModulePage;
