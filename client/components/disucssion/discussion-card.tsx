import React from "react";
import { users } from "@/constants/users";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { CircleCheck, MessageCircle } from "lucide-react";
import Chip from "../custom/chip";
const DiscussionCard = () => {
  return (
    <div className="flex flex-col gap-3 px-2 pt-2 border-b  cursor-pointer shadow-md">
      <div className="w-full flex flex-col gap-2">
        {/* first row */}
        <div className="flex items-start gap-2">
          <Avatar className="rounded-none">
            <AvatarFallback>AZ</AvatarFallback>
            <AvatarImage src={users[0].avatar} alt="az" />
          </Avatar>
          <div className="flex flex-col gap-1">
          <Label className="text-sm line-clamp-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel,
            dignissimos laudantium. Ut numquam dolorem corporis. Blanditiis,
            ipsum autem temporibus aliquam, deleniti dolor ipsa magnam neque
            cumque quos dolorem amet mollitia?
          </Label>
          <div className="flex items-center space-x-2">
            <Chip text="suggestions"/>
            <Chip text="programming"/>
            <Chip text="javascript"/>
          </div>
          </div>
        </div>
        <div className="flex gap-8 items-center justify-center">
          <Button
            variant="link"
            className="text-sm m-0 p-0  flex gap-0.5 text-gray-400 items-center"
          >
            <MessageCircle className="h-5" />
            288 comments
          </Button>

          <Label className="text-gray-400 text-sm ">01 Months ago</Label>
          <CircleCheck className="h-5 text-green-400"/>
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;
