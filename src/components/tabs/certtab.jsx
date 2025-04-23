import React from "react";

const CertificatesTab = () => {
  const certs = [
    "John Doe",
    "John Doe",
    "John Doe",
    "John Doe",
    "John Doe",
    "John Doe",
  ];
  return (
    <div>
      <div className="w-full space-y-4">
        {certs?.map((item, i) => (
          <div
            key={item}
            style={{
              border: "0.5px solid rgba(37, 37, 37, 0.50)",
            }}
            className="px-4 w-full cursor-pointer rounded-lg"
          >
            <div className="h-12 flex justify-between items-center w-full">
              <small className="text-sm font-medium text-main satoshi">
                {item}
              </small>
              <small className="text-xs font-medium text-main satoshi">
                Earned
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificatesTab;
