import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MainBtn, DeleteBtn } from "../button";
// import Video from "../../assets/video.svg";
import { VideoInput } from "../inputs";
import { useNavigate } from "react-router-dom";
import { ContentWriteup } from "../../pages/courses/[id]";

const ModuleModal = ({ handleClose, datum, setModal }) => {
	// console.log({datum});
	let navigate = useNavigate();
	return (
    <div className="fixed z-50 inset-0 bg-myblue bg-opacity-30 flex justify-center h-screen w-full items-center">
      <div className="lg:w-1/2 w-5/6 mx-auto p-4 bg-white rounded-xl h-5/6 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-secondary satoshi">
            {datum?.data?.title}
          </h2>
          <AiOutlineClose className="cursor-pointer" onClick={handleClose} />
        </div>
        {/* <pre className="text-xs satoshi font-normal pt-5 text-main">
					{datum?.data?.description}
				</pre> */}
        {ContentWriteup(
          datum?.data?.description,
          "text-xs satoshi font-normal py-5 text-main"
        )}
        <VideoInput state={datum?.data} name={"videoLink"} noTitle />
        {/* <img src={Video} alt="" className="my-5" /> */}
        <div className="py-5 border-t flex gap-5">
          <MainBtn
            text={"Edit Section"}
            onClick={() =>
              navigate(
                `/courses/add-course?course=${datum?.course}&type=section&section=${datum?.data?._id}&module=${datum?.module}`,
                { state: datum?.data }
              )
            }
          />
          <DeleteBtn
            onClick={() => setModal("delete")}
            text={"Delete Section"}
          />
        </div>
      </div>
    </div>
  );
};

export default ModuleModal;
