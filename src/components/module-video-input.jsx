import { Upload } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

const ModuleVideoInput = ({name, value, onChange, ty, accept}) => {
  const ref = useRef();

  let videoSrc = null;
  if (value instanceof File) videoSrc = URL.createObjectURL(value);
  else if (typeof value === "string") videoSrc = value;

  const handleClick = () => ref.current?.click();

  const handleChangeVideo = (e) => {
    const file = e.target.files?.[0];
    let err = "";
    if (!file) err = "File does not exist";
    else if (!file.type.includes(ty || "video"))
      err = "Unsupported format. Please upload a video file.";
    if (err) {
      toast.error(err);
      return;
    }
    onChange(file);
  };

  return (
    <div>
      <p className="text-base font-medium satoshi text-secondary">
        Choose Video
      </p>

      {videoSrc ? (
        <>
          <div className="rounded-xl border-dashed h-[300px] flex items-center justify-center w-full">
            <video
              src={videoSrc}
              controls
              className="w-full h-full object-contain"
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
          <Upload className="mx-auto mb-2" />
          <p className="text-sm text-[#275A7F] font-medium satoshi">
            Click to upload
          </p>
          <p className="text-xs text-[#275A7F] font-medium satoshi">
            (mp4, mpeg)
          </p>
        </div>
      )}

      <input
        type="file"
        name={name}
        accept={accept}
        ref={ref}
        onChange={handleChangeVideo}
        className="hidden"
      />
    </div>
  );
};

export default ModuleVideoInput;
