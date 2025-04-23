import { useNavigate } from "react-router-dom";

const useRouteProtection = (hasUnsavedChanges, onSave) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        "You have unsaved changes, do you really want to leave?"
      );
      if (confirmLeave) {
        onSave();
        navigate(path);
      }
    } else {
      navigate(path);
    }
  };

  return handleNavigation;
};

export default useRouteProtection;
