import React from "react";
import ProfileAvatar from "./profile-avatar";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import {
  HomeIcon,
  Users,
  TrendingUp,
  CodeXml,
  BadgeCent,
  UserCheck,
} from "lucide-react";
import Profile2 from "./profile2";
const MetroProfile = () => {
  return (
    <div
      className={`w-full h-auto bg-[--background] dark:bg-semiDark rounded-md py-12 px-6`}
    >
      <div className="flex flex-col md:flex-row gap-4 flex-wrap ">
        <Profile2 />

        <div className="flex gap-3 items-center">
          <Button
            size="sm"
            className=" text-[13px] bg-gray-400 dark:bg-slate-700 text-white"
          >
            Follow
          </Button>

          <Button
            size="sm"
            className="p-0 px-3 text-[13px] text-white bg-[#107EFF] hover:bg-[#006AE6]"
          >
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MetroProfile;
