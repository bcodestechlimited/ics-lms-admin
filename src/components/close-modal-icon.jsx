import { XIcon } from "lucide-react";

const CloseModalIcon = ({ handleClose }) => {
  return (
    <XIcon
      className="absolute top-2 right-2 h-5 w-5 text-[#758E95] cursor-pointer"
      onClick={handleClose}
    />
  );
};

export default CloseModalIcon;
