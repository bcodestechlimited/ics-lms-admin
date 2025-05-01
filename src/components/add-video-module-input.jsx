import React, {useRef, useEffect, useState} from "react";
import {Upload} from "lucide-react";
import {toast} from "sonner";

const AddModuleVideoInput = ({
  name,
  value,
  onChange,
  ty = "video",
  accept = "video/*",
}) => {
  const fileInputRef = useRef(null);
  const [previewSrc, setPreviewSrc] = useState(null);

  useEffect(() => {
    let url;
    if (value instanceof File) {
      url = URL.createObjectURL(value);
      setPreviewSrc(url);
    } else if (typeof value === "string") {
      setPreviewSrc(value);
    } else {
      setPreviewSrc(null);
    }
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [value]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("File does not exist");
      return;
    }
    if (!file.type.startsWith(ty + "/")) {
      toast.error("Unsupported format. Please upload a video file.");
      return;
    }
    onChange(file);
  };

  return (
    <div>
      <p className="text-base font-medium text-secondary">Choose Video</p>
      {previewSrc ? (
        <>
          <div className="rounded-xl border-dashed h-[300px] flex items-center justify-center w-full">
            <video
              src={previewSrc}
              controls
              className="w-full h-full object-contain rounded-md"
            />
          </div>
          <div className="flex justify-end gap-5 py-3">
            <button
              onClick={handleClick}
              className="bg-myblue text-white px-4 py-2 rounded-md hover:bg-myblue/90"
            >
              Upload New
            </button>
          </div>
        </>
      ) : (
        <div
          onClick={handleClick}
          className="h-24 cursor-pointer rounded-xl border w-full flex flex-col justify-center items-center"
        >
          <Upload className="mx-auto mb-2 text-secondary" />
          <p className="text-sm text-secondary">Click to upload</p>
        </div>
      )}
      <input
        type="file"
        name={name}
        accept={accept}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default AddModuleVideoInput;
