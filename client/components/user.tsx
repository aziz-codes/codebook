import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const user = () => {
  return (
    <div className="w-full flex justify-center lg:justify-start lg:border shadow-md rounded-md px-1 py-3">
      <div className="flex gap-2 items-center">
        <Avatar className="h-8 w-8">
          <AvatarFallback>AZ</AvatarFallback>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div className="flex-col -space-y-1 hidden lg:flex">
          <h4 className="text-sm font-semibold">Aziz Khan</h4>
          <p className="text-xs text-gray-400">@azizcodes</p>
        </div>
      </div>
    </div>
  );
};

export default user;
