import VerifiedMarkIcon from "../../assets/verified_check.png";
import { Button } from "../button";
import CloseModalIcon from "../close-modal-icon";
import ModalContainer from "./modalcontainer";

export default function SuccessModal({ show, onClick, title, description }) {
  return (
    <div>
      <ModalContainer>
        <div className="w-80 rounded-xl border bg-white p-4 satoshi space-y-4 relative">
          <CloseModalIcon handleClose={onClick} />
          <div className="flex flex-col items-start justify-start text-[#013467] space-y-4">
            <img
              src={VerifiedMarkIcon}
              alt="A verified mark icon"
              className="h-[111px] w-[58px] object-cover"
            />
            <h5 className="font-bold text-[20px]">{title}</h5>
            <p className="text-left">{description}</p>
          </div>
          <Button onClick={onClick}>Okay</Button>
        </div>
      </ModalContainer>
    </div>
  );
}
