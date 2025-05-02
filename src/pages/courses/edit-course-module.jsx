/* eslint-disable default-case */
import {
  ArrowDown,
  ArrowUp,
  CopyIcon,
  PenIcon,
  PlusIcon,
  Trash2,
} from "lucide-react";
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {toast} from "sonner";
import ImageIcon from "../../assets/image-icon.svg";
import ListIcon from "../../assets/list-icon.svg";
import TextIcon from "../../assets/text-icon.svg";
import VideoIcon from "../../assets/video-icon.svg";
import {Button} from "../../components/button";
import KnowledgeCheck from "../../components/knowledge-check";
import MainContainer from "../../components/maincontainer";
import MainHeader from "../../components/mainheader";
import {ChartEditorModal} from "../../components/modals/chart-editor-modal";
import {ChartTypeSelector} from "../../components/modals/chart-type-selector";
import QuoteSection from "../../components/module-quote";
import ModuleTextarea from "../../components/module-textarea";
import ModuleVideoInput from "../../components/module-video-input";
import {useGetCourseModule, useUpdateCourseModule} from "../../hooks/useModule";

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
      chart: {type: "bar"},
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
      chart: {type: "line"},
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      },
    },
  },
  pie: {
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {type: "pie"},
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    },
  },
};

const EditCourseModulePage = () => {
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
  const [getSearch] = useSearchParams();
  const moduleId = getSearch.get("module") || "";
  const courseId = getSearch.get("course_id") || "";
  const {data: existingModule, isLoading} = useGetCourseModule(moduleId);
  const updateCourseModule = useUpdateCourseModule();
  const [moduleTitle, setModuleTitle] = useState("");

  const generateId = () =>
    `section-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  const handleChartIconClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setChartSelectorPosition({
      x: rect.left + -350,
      y: rect.top,
    });
    setShowChartSelector(true);
  };

  // new-code
  // useEffect(() => {
  //   if (existingModule?.responseObject) {
  //     setModuleTitle(
  //       (!isLoading && existingModule?.responseObject?.data?.module.title) || ""
  //     );
  //     const sections =
  //       !isLoading &&
  //       existingModule?.responseObject?.data?.module?.contentSections;
  //     if (Array.isArray(sections)) {
  //       const validSections = sections
  //         .filter((section) => section)
  //         .map((section) => ({
  //           ...section,
  //           id: section.sectionId || generateId(),
  //           mongoId: section._id,
  //           dirty: false,
  //         }));
  //       setContentSections(validSections);
  //     } else {
  //       setContentSections([]);
  //     }
  //   }
  // }, [existingModule]);

  useEffect(() => {
    // once the module comes back from the server
    const mod = existingModule?.responseObject?.data?.module;
    if (!isLoading && mod) {
      // 1. Title
      setModuleTitle(mod.title || "");

      // 2. Build contentSections for the form
      const sections = Array.isArray(mod.contentSections)
        ? mod.contentSections
        : [];

      const validSections = sections.map((section) => {
        const id = section.sectionId || generateId();
        return {
          id,
          type: section.type,
          content: section.content, // could be a URL string
          // keep mongoId only if you need it elsewhere:
          // mongoId: section._id,
        };
      });

      setContentSections(validSections);

      // 3. Seed sectionStates so videos render their URLs immediately
      const initialStates = validSections.reduce((acc, sec) => {
        if (sec.type === "video" && typeof sec.content === "string") {
          acc[sec.id] = sec.content;
        }
        return acc;
      }, {});

      setSectionStates(initialStates);
    }
  }, [existingModule, isLoading]);

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
    // {
    //   icon: StatementIcon,
    //   title: "Knowledge Check",
    //   type: "knowledge-check",
    //   onClick: (type) => handleAddSection(type),
    // },
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

  // new-code from claude
  const getInitialContent = (type, chartData = null) => {
    switch (type) {
      case "knowledge-check":
        return {
          question: "",
          type: "single",
          options: [
            {id: 1, text: "", isCorrect: false},
            {id: 2, text: "", isCorrect: false},
            {id: 3, text: "", isCorrect: false},
            {id: 4, text: "", isCorrect: false},
          ],
        };
      case "quote":
        return {
          quoteText: "",
          authorName: "",
          avatar: null,
        };
      case "chart":
        return chartData;
      default:
        return "";
    }
  };

  const handleAddSection = (type, afterId = null, chartData = null) => {
    const newSection = {
      id: generateId(),
      type,
      content: getInitialContent(type, chartData),
    };

    setContentSections((prev) => {
      const validSections = prev.filter(
        (section) => section !== null && section !== undefined
      );

      if (!afterId) {
        return [...validSections, newSection];
      }

      const insertIndex = validSections.findIndex(
        (section) => section.id === afterId
      );
      return insertIndex === -1
        ? [...validSections, newSection]
        : [
            ...validSections.slice(0, insertIndex + 1),
            newSection,
            ...validSections.slice(insertIndex + 1),
          ];
    });
  };

  const handleRemoveSection = (id) => {
    setContentSections((prev) => prev.filter((section) => section.id !== id));
  };

  const handleUpdateContent = (id, newContent) => {
    if (!id) return;
    setContentSections((prev) =>
      prev.map((section) =>
        section.id === id
          ? {...section, content: newContent, dirty: true}
          : section
      )
    );
  };

  const handleMoveSection = (sectionId, direction) => {
    setContentSections((prev) => {
      const validSections = prev.filter(
        (section) => section !== null && section !== undefined
      );

      const currentIndex = validSections.findIndex(
        (section) => section.id === sectionId
      );

      if (currentIndex === -1) return validSections;

      const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= validSections.length)
        return validSections;

      const newSections = [...validSections];
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

  const handleModuleTitle = (e) => {
    setModuleTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!moduleId) {
      toast.error("Invalid module, cannot update.");
      return;
    }

    // 1) Build a clean JS array payload
    const sectionsPayload = contentSections.map((s) => {
      // leave File objects in place so the service can detect/upload them
      if (
        (s.type === "image" || s.type === "video") &&
        s.content instanceof File
      ) {
        return {id: s.id, type: s.type, content: s.content};
      }
      if (s.type === "quote" && s.content.avatar instanceof File) {
        return {
          id: s.id,
          type: s.type,
          content: {...s.content, avatar: s.content.avatar},
        };
      }
      // everything else (text, URLs, JSON, etc)
      return {id: s.id, type: s.type, content: s.content};
    });

    // 2) Call your hook with exactly the shape your service expects:
    toast.promise(
      updateCourseModule.mutateAsync({
        moduleId,
        title: moduleTitle,
        contentSections: sectionsPayload,
      }),
      {
        loading: "Updating course module…",
        success: () => {
          navigate(
            `/courses/edit-course?course=${courseId}&type=course&mode=edit`
          );
          return "Course module updated!";
        },
        error: () => "Failed to update module.",
      }
    );
  };

  const renderContentSection = (section) => {
    if (!section || !section.id || !section.type) {
      return null;
    }
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
                className="block w-full max-h-[120px] p-2 border rounded-md"
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
                value={sectionStates[section.id] ?? section.content}
                onChange={(file) => {
                  // seed the state to the new File
                  setSectionStates((prev) => ({...prev, [section.id]: file}));
                  // also update contentSections so the payload picks it up
                  handleUpdateContent(section.id, file);
                }}
                name={section.id}
                ty={"video"}
                accept="video/*"
              />
            </div>
          );
        case "list":
          return (
            <div className="relative max-h-[530px] h-full overflow-auto">
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
                initialData={
                  Array.isArray(section.content)
                    ? section.content
                    : [section.content]
                }
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
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium text-secondary capitalize">
            {section.type.replace("-", " ")}
          </span>

          <div className="flex items-center gap-x-6 bg-white shadow-md p-2 rounded-md">
            {section.type !== "image" && section.type !== "video" && (
              <button
                data-tooltip-id="my-tooltip"
                data-tooltip-content={"Edit"}
              >
                <PenIcon
                  className={`${styles.icons} ${
                    editMode[section.id] ? "text-blue-500" : ""
                  }`}
                  onClick={() => handleEditToggle(section.id)}
                />
              </button>
            )}

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

              {/* {contentSections.map(renderContentSection)} */}
              {/* {contentSections
                ?.filter((section) => section && section.id)
                .map(renderContentSection)} */}
              {contentSections
                ?.filter(
                  (section) =>
                    section !== null && section !== undefined && section.id
                )
                .map(renderContentSection)}

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
          <Button onClick={handleSubmit}>Save Changes</Button>
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

export default EditCourseModulePage;
