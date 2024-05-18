import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";
import { users } from "@/constants/users";
import { CalendarDays, Ellipsis } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DiscussionCard = () => {
  return (
    <div className="w-full max-w-sm border rounded-md shadow-md p-4 select-none flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex space-x-1 items-center">
          <Avatar className="h-8 w-8">
            <AvatarFallback>NA</AvatarFallback>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <Label>azizcodes</Label>
        </div>
        <button className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
          <Ellipsis />
        </button>
      </div>
      <p className="text-sm line-clamp-3 overflow-hidden font-[500] text-ellipsis">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil atque
        nesciunt quasi autem culpa, blanditiis enim consequuntur possimus
        repellendus eius nobis commodi amet, repudiandae et optio delectus animi
        perferendis vel.
      </p>

      <div className="flex flex-wrap flex-col  space-y-2">
        <div className="flex space-x-1">
          <CalendarDays className="text-gray-400 h-4 w-4" />
          <span className="text-xs">06 May 2024</span>
        </div>
        <div className="flex   gap-2">
          <Badge variant="outline">Javascript</Badge>
          <Badge variant="outline">HTML</Badge>
          <Badge variant="outline">CSS</Badge>
        </div>
      </div>
      <div className="flex items-center py-1 gap-3 flex-wrap space-y-1">
        <Label>Contributors</Label>
        <div className="flex items-center -space-x-4 rtl:space-x-reverse">
          {users.map((user, index) => (
            <Avatar className="h-8 w-8  border-2 border-white" key={index}>
              <AvatarFallback>
                {user.first_name.charAt(0)}
                {user.first_name.charAt(1)}
              </AvatarFallback>
              <AvatarImage src={user.avatar} />
            </Avatar>
          ))}
          <div className="relative z-50 h-8 w-8 -space-x-4 border-2 border-white text-xs font-semibold rounded-full flex justify-center items-center bg-gray-400">
            99+
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;
