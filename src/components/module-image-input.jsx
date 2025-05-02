import React, {useRef, useEffect, useState} from "react";
import {Upload} from "lucide-react";
import {toast} from "sonner";

const AddModuleImageInput = ({name, value, onChange, accept = "image/*"}) => {
  const fileInputRef = useRef(null);
  const [previewSrc, setPreviewSrc] = useState(null);

  // Generate and clean up object URL when `value` changes
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
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Unsupported format. Please upload an image file.");
      return;
    }
    onChange(file);
  };

  return (
    <div>
      <p className="text-base font-medium text-secondary">Choose Image</p>
      {previewSrc ? (
        <img
          src={previewSrc}
          alt="Preview"
          className="max-w-full h-auto max-h-[300px] object-cover rounded-md"
        />
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

export default AddModuleImageInput;
