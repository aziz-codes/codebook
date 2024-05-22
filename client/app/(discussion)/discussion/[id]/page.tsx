import React from "react";
import User from "@/components/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import Slider from "@/components/slider";
const Discussion = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1">
        <Avatar>
          <AvatarFallback>AZ</AvatarFallback>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div className="flex-col -space-y-1 hidden lg:flex">
          <h4 className="text-sm font-semibold">Aziz Khan</h4>
          <p className="text-xs text-gray-400">4 hrs ago</p>
        </div>
      </div>
      <Label>Discusion title goes here.</Label>
      <div className="flex justify-center">
        <Slider />
      </div>
    </div>
  );
};

export default Discussion;
