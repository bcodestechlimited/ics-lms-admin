import React from "react";

const ParticipantTab = ({ datum }) => {
	// const certs = [
	//   {
	//     name: "John Doe",
	//     status: "in-progress",
	//   },
	//   {
	//     name: "John Doe",
	//     status: "in-progress",
	//   },
	//   {
	//     name: "John Doe",
	//     status: "in-progress",
	//   },
	//   {
	//     name: "John Doe",
	//     status: "in-progress",
	//   },
	//   {
	//     name: "John Doe",
	//     status: "completed",
	//   },
	//   {
	//     name: "John Doe",
	//     status: "locked out",
	//   },
	// ];

	return (
    <div>
      <div className="w-full space-y-4">
        {datum?.partakers?.map((item, i) => (
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
              <small
                className={`text-xs font-medium capitalize ${
                  item?.progress?.status === "in-progress"
                    ? "text-secondary"
                    : item?.progress?.status === "completed"
                    ? "text-[#0B6C25]"
                    : "text-[#E34033]"
                } satoshi`}
              >
                {item?.progress?.status}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantTab;
