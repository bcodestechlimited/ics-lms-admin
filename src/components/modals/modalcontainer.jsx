import React from "react";
import "./loader.css";

const ModalContainer = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50">
      {children}
    </div>
  );
};

export default ModalContainer;

export const ModalComponents = ({
  show,
  title,
  close,
  children,
  width,
  subtitle,
}) => {
  return (
    <div
      className={`fixed ${
        show ? "flex" : "hidden"
      } flex items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full scrollbar-hide`}
    >
      <div className="fixed inset-0 bg-myblue opacity-30"></div>
      <div
        className={`relative w-full ${width || "max-w-2xl"} mx-auto max-h-full`}
      >
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-sm shadow">
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between gap-4 p-4 py-2 rounded-t">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              <p className="text-xs text-gray-400 mt-1 text">{subtitle}</p>
            </div>
            <button
              type="button"
              className="bg-gray-400 text-white rounded-lg text-sm p-1.5 inline-flex items-center"
              onClick={close}
            >
              <span className="sr-only">Close modal</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <hr className="m-0 border-1 border-primary" />
          {/* <!-- Modal body --> */}
          <div className="p-6 space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="ring">
      Loading
      <span className="spanClass"></span>
    </div>
  );
};
