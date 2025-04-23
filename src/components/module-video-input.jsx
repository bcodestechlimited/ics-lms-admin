import { Upload } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

const ModuleVideoInput = ({ name, onChange, state, setState, ty, ...rest }) => {
  const ref = useRef();

  const handleClick = () => {
    ref.current?.click();
  };

  const handleChangeVideo = (e) => {
    const file = e?.target.files[0];
    let err = "";
    if (!file) {
      err = `File does not exist`;
    }
    if (!file?.type.includes(ty || "video")) {
      err = `File format not supported. Please upload a video file`;
    }
    if (err) {
      toast.error(err);
      return;
    }

    setState({ ...state, [name]: file });
  };

  return (
    <div>
      <p className="text-base font-medium satoshi text-secondary">
        Choose Video
      </p>
      {state && state[name] && typeof state[name] !== "string" ? (
        <>
          <div className="rounded-xl border border-dashed h-[300px] flex flex-col justify-center items-center text-gray w-full file_upload">
            <video
              src={
                state[name]?.playback_url &&
                typeof state[name]?.playback_url === "string"
                  ? state[name]?.playback_url
                  : state[name]?.url && typeof state[name]?.url === "string"
                  ? state[name]?.url
                  : URL.createObjectURL(state[name])
              }
              controls
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex gap-5 justify-end items-center py-3">
            <button
              onClick={handleClick}
              className="bg-myblue text-white px-4 py-2 rounded-md hover:bg-myblue/90 transition-colors"
            >
              Upload New
            </button>
          </div>
        </>
      ) : (
        <div
          onClick={handleClick}
          className="h-24 cursor-pointer rounded-xl border w-full flex justify-center items-center"
        >
          <div className="text-center">
            <img src={Upload} alt="" className="mx-auto mb-2" />
            <p className="text-sm text-[#275A7F] font-medium satoshi">
              Click to upload
            </p>
            <p className="text-xs text-[#275A7F] font-medium satoshi">
              (mp4, mpeg)
            </p>
          </div>
        </div>
      )}
      <input
        type="file"
        title="Upload file"
        id="file"
        name={name}
        onChange={handleChangeVideo}
        ref={ref}
        className="hidden"
        accept={rest?.accept}
      />
    </div>
  );
};

export default ModuleVideoInput;
