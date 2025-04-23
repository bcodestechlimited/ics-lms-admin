import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

const CouponCode = ({ couponCode = "ykmhhh71790-2" }) => {
  return (
    <div className="bg-[#0269D01A]/10 rounded-md px-4 py-3 border-dotted border-main border h-[65px] flex items-center justify-between">
      <div className="text-[#0269D0]">
        <h4 className="font-medium text-[14px]">Coupon Code</h4>
        <span className="font-extrabold text-[18px]">{couponCode}</span>
      </div>
      <div
        className="flex flex-col gap-2 w-fit cursor-pointer"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={"Copy"}
        onClick={() => {
          navigator.clipboard.writeText(couponCode);
          toast.info("Copied");
        }}
      >
        <CopyIcon className="text-[#013467] w-4 h-4" />
      </div>
    </div>
  );
};

export default CouponCode;
