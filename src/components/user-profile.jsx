import { UserCircle } from "lucide-react";

export function UserProfile({
  imageUrl = "https://th.bing.com/th/id/R.898a454aed8eda454fd4ea6d11d27ebb?rik=KxVePyS8%2bDRP%2bA&pid=ImgRaw&r=0",
  firstName,
  lastName,
}) {
  return (
    <div className="rounded-xl px-8 py-8 bg-[#0269D00F]">
      <div className="flex items-center gap-x-4">
        {/* <img
          src={imageUrl || "https://github.com/shadcn.png"}
          alt={firstName + "profile"}
          className="h-[77px] w-[77px] rounded-full object-cover"
        /> */}
        <UserCircle className="h-[77px] w-[77px]" />

        <div>
          <p className="font-medium text-[24px]">
            {" "}
            <span>{firstName}</span> <span>{lastName}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
