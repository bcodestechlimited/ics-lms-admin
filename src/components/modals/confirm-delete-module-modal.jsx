import CloseModalIcon from "../close-modal-icon";
import ModalContainer from "./modalcontainer";
import DeleteIcon from "../../assets/delete.svg";
import { Button } from "../button";

const ConfirmDeleteModuleModal = ({ onClose, onConfirm }) => {
  return (
    <div>
      <ModalContainer>
        <div className="bg-white rounded-xl border px-8 py-4 relative">
          <CloseModalIcon onClick={onClose} />
          <div className="">
            <img src={DeleteIcon} alt="Delete Icon" />
            <div className="space-y-2 mb-8">
              <h4 className="text-secondary font-bold text-[20px]">
                Delete Module
              </h4>
              <p>Are you sure you want to delete this module?</p>
            </div>
            <div className="flex items-center gap-x-2">
              <Button buttonType={"button"} onClick={onConfirm}>
                Delete
              </Button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default ConfirmDeleteModuleModal;

export const ModuleDeletedConfirmationModal = ({ onClose }) => {
  return (
    <div>
      <ModalContainer>
        <div className="bg-white rounded-xl border p-4 relative">
          <CloseModalIcon onClick={onClose} />
          <div>
            <img src={DeleteIcon} alt="Delete Icon" />
            <div className="space-y-2 mb-8">
              <h4 className="text-secondary font-bold text-[20px]">
                Delete Module
              </h4>
              <p>Are you sure you want to delete this module?</p>
            </div>
            <div className="flex items-center gap-x-2">
              <Button buttonType={"button"} onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};
