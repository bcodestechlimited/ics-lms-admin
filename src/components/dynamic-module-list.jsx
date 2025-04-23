import React, { useState } from "react";
import CreateModule from "./add-module";

const DynamicModuleList = ({ btnState, onSubmitModules }) => {
  // Initialize with one module row
  const [modules, setModules] = useState([{ id: Date.now(), moduleName: "" }]);

  // Update a module's name
  const updateModule = (index, value) => {
    setModules((prev) =>
      prev.map((mod, i) => (i === index ? { ...mod, moduleName: value } : mod))
    );
  };

  // Add a new module row
  const addModule = () => {
    setModules((prev) => [...prev, { id: Date.now(), moduleName: "" }]);
  };

  // Remove a module row
  const removeModule = (index) => {
    if (modules.length > 1) {
      setModules((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Handle submission of all modules (this could be a separate API call for modules)
  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmitModules is a function passed as prop to handle submission logic separately
    onSubmitModules(modules);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {modules.map((module, index) => (
        <div key={module.id} className="flex items-center gap-2">
          <CreateModule
            state={module}
            btnState={btnState}
            handleSubmit={() => {}}
            onChange={(e) => updateModule(index, e.target.value)}
          />
          {modules.length > 1 && (
            <button
              type="button"
              onClick={() => removeModule(index)}
              className="text-red-500"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addModule}
        className="text-blue-500 underline"
      >
        + Add Module
      </button>
      {/* <div>
        <Button
          type="submit"
          children="Submit Modules"
          disabled={btnState.isLoading}
        />
      </div> */}
    </form>
  );
};

export default DynamicModuleList;
