import { useState, useEffect } from "react";
import { toast } from "sonner";

const useCourseModuleCache = (courseId, initialState = null) => {
  const [cachedModule, setCachedModule] = useState(initialState);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const STORAGE_KEY = `course-module-${courseId}`;

  useEffect(() => {
    const savedModule = localStorage.getItem(STORAGE_KEY);
    if (savedModule && savedModule !== "undefined") {
      setCachedModule(JSON.parse(savedModule));
    }
  }, [courseId, STORAGE_KEY]);

  const saveModuleToCache = (moduleData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(moduleData));
      setCachedModule(moduleData);
      setHasUnsavedChanges(false);
    } catch (error) {
      toast("An error occurred while saving module to cache");
      // console.log("error");
    }
  };

  const clearModuleCache = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCachedModule(null);
    setHasUnsavedChanges(false);
  };

  const markUnsavedChanges = () => {
    setHasUnsavedChanges(true);
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (e) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  return {
    cachedModule,
    saveModuleToCache,
    clearModuleCache,
    markUnsavedChanges,
  };
};

export default useCourseModuleCache;
