import React, { useState } from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import ModuleModal from "../modals/modulemodal";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";
import { MdQuiz } from "react-icons/md";
import { LiaTrashAlt, LiaEditSolid } from "react-icons/lia";
import useErrorStore from "../../data/stores/errorstore";
import { apiCall } from "../../data/stores/authstore";
import { toast } from "sonner";
import useCourseStore from "../../data/stores/course.store";
import DeleteModal from "../modals/deletemodal";
import { Addbutton } from "../button";

const Modulestab = ({ datum }) => {
	const [moduleList, setModuleList] = useState(null),
		[modal, setModal] = useState("");

	const handleModule = i => {
		setModuleList(moduleList === i ? null : i);
	};
	let [thisData] = useState(datum?.module),
		navigate = useNavigate(),
		[isDeleted, setIsDeleted] = useState(null),
		[loading, setLoading] = useState(null),
		{ returnErrors } = useErrorStore(),
		{ updateCourse } = useCourseStore();
	let handleSubmit = async (e, se) => {
		e?.preventDefault();
		setLoading(true);
		let { response, errArr, errMsg } = await apiCall(
			"delete",
			`/api/v1/course?type=${isDeleted?.type?.toLowerCase()}&data=${
				isDeleted?.data?._id
			}`,
			isDeleted?.data
		);
		// console.log({ response, errArr, errMsg });
		if (errArr) {
			setLoading(false);
			return returnErrors(errArr);
		}
		if (errMsg) {
			setLoading(false);
			return toast.error(errMsg);
		}
		setLoading(false);
		if (response) {
			if (se) se();
			updateCourse(response);
			return;
		}
		setLoading(false);
	};

	if (!datum) return;

	return (
    <div>
      <div className="w-full space-y-4">
        {thisData?.map((item, i) => (
          <div
            key={item}
            onClick={() => handleModule(i)}
            style={{
              border: "0.5px solid rgba(37, 37, 37, 0.50)",
            }}
            className="px-4 w-full cursor-pointer rounded-lg"
          >
            <div className="h-12 flex justify-between items-center w-full">
              <small className="text-sm font-medium text-main satoshi">
                {item?.title}
              </small>
              {moduleList === i ? (
                <AiOutlineDown size={10} />
              ) : (
                <AiOutlineRight size={10} />
              )}
            </div>
            {moduleList === i && (
              <>
                <ul className="px-2 transition-all ease-linear duration-500 list-decimal">
                  {item?.section?.map((lesson, c) => (
                    <li
                      key={c}
                      style={{
                        borderBottom: "0.5px solid rgba(37, 37, 37, 0.50)",
                      }}
                      className="py-2  flex justify-between items-center"
                    >
                      {" "}
                      <small className="text-sm font-medium text-main satoshi">
                        {lesson?.title}
                      </small>
                      <small
                        onClick={() => {
                          setIsDeleted({
                            data: lesson,
                            type: "Section",
                            module: item?._id,
                            course: datum?._id,
                          });
                          setModal("modal");
                        }}
                        className="text-sm font-medium text-myblue underline satoshi"
                      >
                        View
                      </small>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 cursor-pointer">
                    <IconContext.Provider value={{ color: "black" }}>
                      <AiOutlinePlus
                        onClick={() =>
                          navigate(
                            `/courses/add-course?course=${datum?._id}&type=section&module=${item?._id}`
                          )
                        }
                        size={20}
                        title="Add Section"
                      />
                    </IconContext.Provider>
                    <IconContext.Provider value={{ color: "#2A72A8" }}>
                      <LiaEditSolid
                        title="Edit Module"
                        onClick={() =>
                          navigate(
                            `/courses/add-course?course=${datum?._id}&type=module&module=${item?._id}`,
                            { state: item }
                          )
                        }
                        size={20}
                      />
                    </IconContext.Provider>
                    <IconContext.Provider value={{ color: "red" }}>
                      <LiaTrashAlt
                        title="Delete Module"
                        onClick={() =>
                          setIsDeleted({ data: item, type: "Module" })
                        }
                        size={20}
                      />
                    </IconContext.Provider>
                  </div>
                  <IconContext.Provider value={{ color: "#2A72A8" }}>
                    <MdQuiz
                      title="Add Quiz To Module"
                      onClick={() =>
                        navigate(
                          `/courses/add-course?course=${datum?._id}&type=quiz&module=${item?._id}`,
                          { state: item }
                        )
                      }
                      size={20}
                    />
                  </IconContext.Provider>
                </div>
              </>
            )}
          </div>
        ))}

        <div className="flex items-center justify-between">
          <div className="flex gap-4 cursor-pointer">
            <Addbutton
              onClick={() =>
                navigate(`/courses/add-course?course=${datum?._id}&type=module`)
              }
              text={"Add Module to Course"}
              icon={
                <IconContext.Provider value={{ color: "white" }}>
                  <AiOutlinePlus size={20} />
                </IconContext.Provider>
              }
            />
          </div>
          <Addbutton
            onClick={() =>
              navigate(`/courses/add-course?course=${datum?._id}&type=quiz`, {
                state: datum,
              })
            }
            text={"Add Quiz To Course"}
            icon={
              <IconContext.Provider value={{ color: "white" }}>
                <MdQuiz size={20} />
              </IconContext.Provider>
            }
          />
        </div>

        {/* FETCH MODULE DATA FROM THE API FROM HERE */}
        <div className="satoshi py-20">
          <div className="flex items-center justify-center">
            <h4 className="italic">Uploaded modules would show here</h4>
          </div>
        </div>
      </div>

      {modal === "modal" && (
        <ModuleModal
          handleClose={() => {
            setModal("");
            setIsDeleted(null);
          }}
          datum={isDeleted}
          setModal={setModal}
        />
      )}
      {modal === "delete" && (
        <DeleteModal
          handleCloseModal={() => {
            setModal("");
            setIsDeleted(null);
          }}
          loading={loading}
          onClick={handleSubmit}
          title={isDeleted?.type || "Module"}
        />
      )}
    </div>
  );
};

export default Modulestab;
