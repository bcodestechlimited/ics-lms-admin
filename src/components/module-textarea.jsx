import { useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ModuleTextarea = ({
  label,
  onChange,
  name,
  placeholder,
  value,
  setState,
  editMode,
  ...rest
}) => {
  const handleQuillChange = useCallback(
    (context) => {
      setState({
        [name]: context,
      });
    },
    [setState, name]
  );

  return (
    <div className={`${setState ? "pb-10" : ""}`}>
      <p className="text-base font-medium satoshi text-secondary">{label}</p>
      {editMode ? (
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleQuillChange}
          preserveWhitespace={true}
          placeholder={placeholder}
          className="h-72 w-full smallText"
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["clean"],
              [{ align: [] }],
              ["blockquote", "code-block"],
              ["link"],
            ],
          }}
        />
      ) : (
        <div
          className="h-full w-full p-5 border rounded-xl smallText"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      )}
    </div>
  );
};

export default ModuleTextarea;
