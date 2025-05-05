import {useState} from "react";
// import DropdownMenu from "./dropdown-menu";
import ConfirmDeleteModuleModal, {
  ModuleDeletedConfirmationModal,
} from "./modals/confirm-delete-module-modal";

const CreateModule = ({
  handleSubmit,
  btnState,
  onChange,
  state,
  isCoursePublished,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeletedConfirmation, setShowDeletedConfirmation] = useState(false);

  // const handleDelete = () => {
  //   setShowDeleteDialog(true);
  // };

  const handleConfirmDelete = () => {
    setShowDeleteDialog(false);
    setShowDeletedConfirmation(true);
  };

  // const dropdownItems = [
  //   {
  //     label: "Duplicate",
  //     icon: <CopyIcon className="w-4 h-4" />,
  //     onClick: () => console.log("Edit clicked"),
  //   },
  //   {
  //     label: "Delete Module",
  //     icon: <Trash2 className="w-4 h-4" />,
  //     onClick: handleDelete,
  //     danger: true,
  //   },
  //   {
  //     label: "Save as template",
  //     icon: <SaveIcon className="w-4 h-4" />,
  //     onClick: () => console.log("Share clicked"),
  //   },
  // ];

  const handleAddModule = (e) => {
    handleSubmit(e, "continue-to-module");
  };

  return (
    <div>
      <div className="border h-[61px] rounded-lg flex items-center px-2">
        <div className="mr-auto flex-1">
          <div className="w-[75%]">
            <input
              className="h-10 border rounded-md px-2 w-full"
              placeholder="Enter Module name"
              name="moduleName"
              onChange={onChange}
              value={state.moduleName}
            />
          </div>
        </div>
        <div className="flex gap-x-2 items-center relative">
          <button
            className="h-[36px] bg-[#0269D0] text-white font-normal px-4 py-2 rounded-lg"
            onClick={handleAddModule}
            disabled={btnState.isLoading}
          >
            {btnState.isLoading ? "Creating..." : "Add Module"}
          </button>

          {/* <div className="">
            <DropdownMenu
              items={dropdownItems}
              position="top-left"
              title={"Edit Information"}
            />
          </div> */}
        </div>
      </div>
      {showDeleteDialog && (
        <ConfirmDeleteModuleModal
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {showDeletedConfirmation && (
        <ModuleDeletedConfirmationModal
          onClose={() => setShowDeletedConfirmation(false)}
        />
      )}
    </div>
  );
};

export default CreateModule;
