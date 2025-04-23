import React from "react";

const ResultTab = ({ datum }) => {
	// const certs = [
	//   "John Doe",
	//   "John Doe",
	//   "John Doe",
	//   "John Doe",
	//   "John Doe",
	//   "John Doe",
	// ];
	return (
    <div>
      <div className="w-full space-y-4">
        {datum?.partakers
          ?.filter((it) => it?.progress?.score)
          ?.map((item, i) => (
            <div
              key={i}
              style={{
                border: "0.5px solid rgba(37, 37, 37, 0.50)",
              }}
              className="px-4 w-full cursor-pointer rounded-lg"
            >
              <div className="h-12 flex justify-between items-center w-full">
                <small className="text-sm font-medium text-main satoshi">
                  {item?.lastName} {item?.firstName}
                </small>
                <small className="text-xs font-medium text-main satoshi">
                  {Number(item?.progress?.score || 0).toFixed(2)}%
                </small>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ResultTab;
