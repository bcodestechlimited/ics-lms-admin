import {useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {useNavigate, useParams} from "react-router-dom";
import Delete from "../../assets/delete.svg";
import {Button, MainBtn} from "../button";

const DeleteModal = ({handleCloseModal, cancel, loading, onClick, title}) => {
  const [modal, setModal] = useState("");
  const handleClose = () => {
    setModal("");
  };
  return (
    <div>
      <div className="fixed z-50 inset-0 bg-myblue bg-opacity-30 flex justify-center h-screen w-full items-center">
        <div className="bg-white rounded-xl w-72 p-4">
          <div className=" flex justify-between">
            <img src={Delete} alt="" className="" />
            <AiOutlineClose
              className="cursor-pointer"
              onClick={handleCloseModal}
            />
          </div>
          <h6 className="text-xl font-bold satoshi text-secondary">
            Delete {title || "Module"} ?
          </h6>
          <p className="text-sm text-secondary satoshi">
            Are you sure you want to delete this {title || "Module"}
          </p>
          <div className="flex mt-4 gap-3 items-center">
            <Button
              css={
                "h-10 px-4 bg-skyblue rounded-3xl text-base satoshi font-medium text-white"
              }
              type="button"
              children={"Delete"}
              loading={loading}
              onClick={
                onClick
                  ? (e) => onClick(e, () => setModal("deleted"))
                  : () => setModal("deleted")
              }
            />
            <small
              onClick={cancel || handleCloseModal || handleClose}
              className="smallText cursor-pointer"
            >
              Cancel
            </small>
          </div>
        </div>
      </div>
      {modal === "deleted" && (
        <DeletedModal handleClose={handleClose} title={title} />
      )}
    </div>
  );
};

const DeletedModal = ({handleClose, title}) => {
  const navigate = useNavigate();
  const {page, id} = useParams();

  return (
    <div className="fixed z-50 inset-0 bg-myblue bg-opacity-30 flex justify-center h-screen w-full items-center">
      {" "}
      <div className="bg-white rounded-xl w-72 p-4">
        <div className=" flex justify-between">
          <img src={Delete} alt="" className="" />
          <AiOutlineClose className="cursor-pointer" onClick={handleClose} />
        </div>
        <h6 className="text-xl font-bold satoshi text-secondary">
          {title || "Module"} Deleted
        </h6>

        <div className="flex mt-4 gap-3 items-center">
          <MainBtn
            onClick={() => navigate(`/${page}${id ? `/${id}` : ""}`)}
            text={"Okay"}
          />
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
