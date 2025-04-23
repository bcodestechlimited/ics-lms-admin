import {ChevronDownIcon} from "lucide-react";
import {useState} from "react";

export const MultiSelect = ({
  label,
  name,
  value = [],
  onChange,
  options = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (val) => {
    const isSelected = value.includes(val);
    const newValue = isSelected
      ? value.filter((v) => v !== val)
      : [...value, val];

    onChange({target: {name, value: newValue}});
  };

  return (
    <div className="relative w-full">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div
        onClick={handleToggle}
        className="cursor-pointer w-full border rounded-md px-4 py-2 flex justify-between items-center bg-white"
      >
        <span className="text-gray-700 text-sm">
          {value.length > 0
            ? options
                .filter((opt) => value.includes(opt.value))
                .map((opt) => opt.label)
                .join(", ")
            : "Select courses"}
        </span>
        <ChevronDownIcon className="w-4 h-4 text-gray-500" />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full border bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={value.includes(opt.value)}
                onChange={() => handleSelect(opt.value)}
                className="mr-2"
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
