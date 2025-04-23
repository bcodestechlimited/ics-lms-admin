import React, { useCallback, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import useOutsideClick from "../hooks/useOutsideClick";

const DropdownMenu = ({ items, position = "bottom-right", title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const dropdownRef = useOutsideClick(handleClose);

  const getPositionClasses = () => {
    switch (position) {
      case "bottom-right":
        return "top-full right-0";
      case "bottom-left":
        return "top-full left-0";
      case "top-right":
        return "bottom-full right-0";
      case "top-left":
        return "bottom-full left-0";
      default:
        return "top-full right-0";
    }
  };

  const handleItemClick = useCallback((onClick) => {
    setIsOpen(false);
    // Use setTimeout to ensure state updates don't clash
    setTimeout(() => {
      onClick();
    }, 0);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        aria-label="Open menu"
        type="button"
      >
        <EllipsisVertical className="h-5 w-5 text-gray-600" />
      </button>

      {isOpen && (
        <div
          className={`
            absolute z-50 min-w-[210px]
            bg-white rounded-lg shadow-lg
            border border-gray-200 p-3
            ${getPositionClasses()}
          `}
        >
          <div className="py-1">
            {title && (
              <h4 className="text-[20px] text-myblue font-bold">{title}</h4>
            )}
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  // handleClose();
                  // item.onClick();
                  handleItemClick(item.onClick);
                }}
                type="button"
                className={`
                  w-full py-2 text-left text-sm
                  ${
                    item.danger
                      ? "text-red-600 hover:bg-red-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                  flex items-center gap-2
                  transition-colors duration-200
                  cursor-pointer
                `}
              >
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
