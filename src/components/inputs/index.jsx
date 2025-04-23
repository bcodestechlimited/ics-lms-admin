import React, { useCallback, useContext, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { NumericFormat } from "react-number-format";
import ReactQuill from "react-quill";
import { toast } from "sonner";
import Upload from "../../assets/upload.svg";
import { GlobalState } from "../../data/Context";
import { MainBtn } from "../button";
import clsx from "clsx";

const Inputs = () => {
  return <div></div>;
};
export const SearchInput = ({}) => {
  return (
    <div className="relative h-10 lg:w-80 w-48 bg-transparent rounded-full border">
      <input
        type="text"
        placeholder="Search"
        className="rounded-full pl-11 h-full w-full smallText"
      />
      <div className="absolute top-3 cursor-pointer left-4">
        <AiOutlineSearch />
      </div>
    </div>
  );
};

/*
export const TextInput = ({
  label,
  placeholder,
  type,
  onChange,
  name,
  value,
  setState,
  ...rest
}) => {
  const { nairaSignNeutral } = useContext(GlobalState);
  return (
    <div>
      <p className="text-base font-normal satoshi text-secondary">{label}</p>
      {["number", "tel"]?.includes(type) ? (
        <NumericFormat
          prefix={
            rest?.noFormat
              ? ""
              : !rest?.percentage
              ? `${nairaSignNeutral} `
              : ""
          }
          suffix={rest?.noFormat ? "" : rest?.percentage ? ` %` : ""}
          className="h-12 w-full border pl-2 rounded-lg smallText"
          value={value}
          placeholder={rest?.noFormat ? "2" : rest?.percentage ? "2%" : "2,000"}
          displayType="input"
          thousandSeparator={true}
          onValueChange={(val) => setState(val?.floatValue)}
          min={0}
          inputMode={"decimal"}
          renderText={(value, props) => <span {...props}>{value}</span>}
          allowNegative={false}
        />
      ) : (
        <input
          type={type || "text"}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`h-12 w-full border   ${
            type === "date" ? "pl-2" : "pl-2"
          } rounded-lg smallText`}
          {...rest}
        />
      )}
    </div>
  );
};
*/

export const TextInput = ({
  label,
  placeholder,
  type,
  onChange,
  name,
  value,
  setState,
  className, // Add className prop
  disabled,
  ...rest
}) => {
  // const { nairaSignNeutral } = useContext(GlobalState);

  // Default classes for the input element
  const defaultInputClasses = "h-12 w-full border pl-2 rounded-lg smallText";
  const disabledClasses = disabled ? "text-[#ccc] cursor-not-allowed" : "";

  return (
    <div>
      <p className="text-base font-normal satoshi text-secondary">{label}</p>
      {["number", "tel"]?.includes(type) ? (
        <NumericFormat
          prefix={rest?.noFormat ? "" : !rest?.percentage}
          suffix={rest?.noFormat ? "" : rest?.percentage ? ` %` : ""}
          className={clsx(defaultInputClasses, disabledClasses, className)} // Merge default and custom classes
          value={value}
          placeholder={rest?.noFormat ? "2" : rest?.percentage ? "2%" : "2,000"}
          displayType="input"
          thousandSeparator={true}
          onValueChange={(val) => setState(val?.floatValue)}
          min={0}
          inputMode={"decimal"}
          renderText={(value, props) => <span {...props}>{value}</span>}
          allowNegative={false}
          disabled={disabled}
        />
      ) : (
        <input
          type={type || "text"}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={clsx(defaultInputClasses, disabledClasses, className)} // Merge default and custom classes
          disabled={disabled}
          {...rest}
        />
      )}
    </div>
  );
};

export const TextArea = ({
  label,
  onChange,
  name,
  placeholder,
  value,
  setState,
  ...rest
}) => {
  const handleQuillChange = useCallback(
    (context) => {
      setState((prev) => ({
        ...prev,
        [name]: context,
      }));
    },
    [setState, name]
  );

  return (
    <div className={`${setState ? "pb-10" : ""}`}>
      <p className="text-base font-normal satoshi text-secondary">{label}</p>
      {setState ? (
        <>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={handleQuillChange}
            preserveWhitespace={true}
            // onChange={(e) => setState(e)}
            // className="max-w-[600px]"
            placeholder={placeholder}
            className="h-72 w-full smallText"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["clean"],
                [{ align: [] }],
                ["blockquote", "code-block"],
                ["link"],
              ],
            }}
          />
        </>
      ) : (
        <>
          <textarea
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            className="h-72 w-full p-5 border rounded-xl smallText"
            id=""
            cols="30"
            rows="10"
            {...rest}
          />
        </>
      )}
    </div>
  );
};

export const OptionsInput = ({
  label,
  placeholder,
  onChange,
  name,
  index,
  question,
  option,
  handleInputChangeForMutipleItem,
}) => {
  return (
    <div>
      <p className="text-base font-normal satoshi text-secondary">{label}</p>
      <div className="h-12 w-full border rounded-lg relative">
        <input
          type="text"
          name=""
          placeholder={placeholder}
          className="w-full h-full pl-4 smallText"
          id=""
          value={question?.[option]}
          onChange={(event) =>
            handleInputChangeForMutipleItem(event, index, option)
          }
        />
        <div className="flex gap-2 items-center justify-center absolute top-4 right-4">
          <small className="text-xs text-skyblue font-normal">
            Correct answer
          </small>
          <input
            className="border"
            type="radio"
            name={`answer${index}`}
            value={question?.answer}
            checked={question?.answer === option}
            onChange={(event) =>
              handleInputChangeForMutipleItem(event, index, "answer", option)
            }
          />
        </div>
      </div>
    </div>
  );
};

export const VideoInput = ({
  name,
  onChange,
  state,
  setState,
  ty,
  ...rest
}) => {
  const ref = useRef();
  const handleClick = () => {
    ref.current?.click();
  };

  let handleChangeImage = (e) => {
    const file = e?.target.files[0];
    let err = "";
    // console.log({ err, file }, "one");
    if (!file) err = `File, ${file?.name} does not exist`;
    if (!file.type.includes(ty || "image"))
      err = `File, ${file?.name} format not supported`;
    // console.log({ err, file });
    if (err) {
      return toast.error(err);
    } else {
      setState({ ...state, [name || "image"]: file });
    }
  };
  // console.log({ [name]: state?.[name], state });
  return (
    <div>
      {!rest?.noTitle && (
        <p className="text-base font-normal satoshi text-secondary">
          Choose Video
        </p>
      )}
      {state && state?.[name] && typeof state?.[name] !== "string" ? (
        <>
          <div className="tounded-4xl border border-dashed h-2/4 flex flex-col justify-center items-center text-gray w-full file_upload">
            {state && state?.[name] ? (
              state && state?.[name]?.type?.includes("video") ? (
                <video
                  src={
                    state?.[name]?.playback_url &&
                    typeof state?.[name]?.playback_url === "string"
                      ? state?.[name]?.playback_url
                      : state?.[name]?.url &&
                        typeof state?.[name]?.url === "string"
                      ? state?.[name]?.url
                      : URL.createObjectURL(state?.[name])
                  }
                  controls
                  alt="Course"
                  className="img-fluid w-full h-full"
                  style={{
                    objectFit: "contain",
                  }}
                />
              ) : (
                <img
                  src={
                    state?.[name]?.url && typeof state?.[name]?.url === "string"
                      ? state?.[name]?.url
                      : URL.createObjectURL(state?.[name])
                  }
                  alt="Course"
                  className="img-fluid w-full h-full"
                  style={{
                    objectFit: "contain",
                  }}
                />
              )
            ) : null}
          </div>
          {!rest?.noTitle && (
            <div className="flex gap-5 justify-end items-center py-3">
              <MainBtn onClick={handleClick} text={`Upload New`} />
            </div>
          )}
        </>
      ) : (
        <div
          onClick={handleClick}
          className="h-24 cursor-pointer rounded-xl border w-full flex justify-center items-center"
        >
          <div className="">
            <img src={Upload} alt="" className="mx-auto" />
            <small className="text-sm text-[#275A7F] font-normal satoshi text-center">
              Click to upload
            </small>
            <h6 className="text-xs text-[#275A7F] font-normal satoshi text-center">
              (mp4, mpeg)
            </h6>
          </div>
        </div>
      )}
      <input
        type="file"
        title="Upload file"
        id="file"
        name={name}
        onChange={handleChangeImage}
        ref={ref}
        className="hidden"
        accept={rest?.accept}
      />
    </div>
  );
};
export default Inputs;

export const ImageInput = ({ name, label, onChange, state }) => {
  const ref = useRef();
  const handleClick = () => {
    ref.current?.click();
  };

  // console.log({ state });

  return (
    <div>
      <div>
        {" "}
        <small className="text-base font-normal satoshi text-secondary">
          {label}
        </small>
      </div>
      <div
        onClick={handleClick}
        className="h-[230px]  bg-white cursor-pointer rounded-xl border w-full flex justify-center items-center"
      >
        <div className="">
          {state && name !== "certificate" ? (
            <>
              {name === "video" ? (
                <video
                  src={state?.url || URL.createObjectURL(state)}
                  alt=""
                  className="mx-auto max-h-24"
                  muted
                  autoPlay
                  controls
                />
              ) : (
                <img
                  src={state?.url || URL.createObjectURL(state)}
                  alt=""
                  className="mx-auto max-h-[220px] w-full object-cover"
                />
              )}
            </>
          ) : (
            <>
              <img src={Upload} alt="" className="mx-auto" />
              <small className="text-sm text-[#275A7F] font-normal satoshi text-center">
                {state?.name || `Click to upload`}
              </small>
              <h6 className="text-xs text-[#275A7F] font-normal satoshi text-center">
                (
                {name === "video"
                  ? ".mp4, .mkv,.mpeg"
                  : name === "certificate"
                  ? ".doc, .docx,.pdf"
                  : ".png, .jpg, .png, .jpeg"}
                )
              </h6>
            </>
          )}
          <input
            type="file"
            name={name}
            onChange={onChange}
            ref={ref}
            accept={
              name === "video"
                ? ".mp4, .mkv"
                : name === "certificate"
                ? ".doc, .docx,.pdf"
                : ".png, .jpg, .png, .jpeg"
            }
            id=""
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};
