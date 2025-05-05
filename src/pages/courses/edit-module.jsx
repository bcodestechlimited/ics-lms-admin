import {Trash2} from "lucide-react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";
import DropdownMenu from "../../components/dropdown-menu";
import ConfirmDeleteModuleModal, {
  ModuleDeletedConfirmationModal,
} from "../../components/modals/confirm-delete-module-modal";
import {useDeleteModule} from "../../hooks/useModule";

export default function EditModulePage({title, id, courseId}) {
  const deleteModule = useDeleteModule();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeletedConfirmation, setShowDeletedConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteDialog(false);
    setShowDeletedConfirmation(true);

    toast.promise(deleteModule.mutateAsync(id), {
      loading: "Deleting module...",
      success: (res) => {
        if (!res.success) {
          throw new Error("Error delting");
        }
        window.location.reload();
        return "Module deleted";
      },
      error: (err) => {
        return err?.data?.response?.message || "Failed to delete module";
      },
    });
  };

  const dropdownItems = [
    // {
    //   label: "Duplicate",
    //   icon: <CopyIcon className="w-4 h-4" />,
    //   onClick: () => console.log("Edit clicked"),
    // },
    {
      label: "Delete Module",
      icon: <Trash2 className="w-4 h-4" />,
      onClick: handleDelete,
      danger: true,
    },
    // {
    //   label: "Save as template",
    //   icon: <SaveIcon className="w-4 h-4" />,
    //   onClick: () => console.log("Share clicked"),
    // },
  ];

  return (
    <div className="space-y-4">
      <div className="border h-[61px] rounded-lg flex items-center px-2 gap-x-4">
        <div className="mr-auto flex-1">
          <div className="w-[75%]">
            <input
              className="h-10 border rounded-md px-2 w-full cursor-not-allowed"
              value={title}
              disabled
            />
          </div>
        </div>
        <div className="flex gap-x-2 items-center relative">
          <button
            className="h-[36px] bg-[#0269D0] text-white font-normal px-4 py-2 rounded-lg"
            onClick={() =>
              navigate(
                `/courses/edit-course-module?module=${id}&course_id=${courseId}`
              )
            }
          >
            Edit Module
          </button>

          <div className="">
            <DropdownMenu
              items={dropdownItems}
              position="top-left"
              title={"Edit Information"}
            />
          </div>
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
}
