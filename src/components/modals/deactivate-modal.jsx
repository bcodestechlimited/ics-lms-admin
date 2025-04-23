import { ShieldMinusIcon } from "lucide-react";
import CloseModalIcon from "../close-modal-icon";
import ModalContainer from "./modalcontainer";
import { Button } from "../button";

export default function DeactivateModal({
  setState,
  title,
  description,
  onClick,
}) {
  return (
    <div>
      <ModalContainer>
        <div className="w-80 relative rounded-xl border bg-white space-y-4 p-4">
          <CloseModalIcon handleClose={() => setState("")} />
          <div className="flex flex-col items-start justify-start text-[#013467] space-y-4">
            <ShieldMinusIcon className="h-10 w-10 text-red-300" />
            <h5 className="font-bold text-[20px]">{title}</h5>
            <p className="text-left">{description}</p>
          </div>
          <Button onClick={onClick}>Okay</Button>
        </div>
      </ModalContainer>
    </div>
  );
}
