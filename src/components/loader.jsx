import React from "react";

export default function Loader({ height = 30, width = 30, className = "" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-loader animate-spin text-blue-500"
      >
        <path d="M12 2v4" />
        <path d="m16.2 7.8 2.9-2.9" />
        <path d="M18 12h4" />
        <path d="m16.2 16.2 2.9 2.9" />
        <path d="M12 18v4" />
        <path d="m4.9 19.1 2.9-2.9" />
        <path d="M2 12h4" />
        <path d="m4.9 4.9 2.9 2.9" />
      </svg>
    </div>
  );
}

export const PageLoader = () => {
  return (
    <div
      id="loading-overlay"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/20 backdrop-blur-sm transition-opacity"
    >
      <div className="flex flex-col items-center justify-center gap-3 bg-white px-8 py-6 rounded-2xl shadow-xl border border-gray-100">
        <Loader width={40} height={40} />
        <p className="text-sm font-medium text-gray-600 animate-pulse">Loading...</p>
      </div>
    </div>
  );
};
