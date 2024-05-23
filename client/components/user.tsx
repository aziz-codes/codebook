import React from "react";
import { auth } from "@/auth";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const user = async () => {
  const session = await auth();

  const user = session?.user;
  return (
    <div className="w-full flex justify-center lg:justify-start lg:border shadow-md rounded-md px-1 py-3 hover:scale-105 transition-transform duration-150 ease-linear cursor-pointer">
      <div className="flex gap-2 items-center">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          <AvatarImage src={user?.image as string} />
        </Avatar>
        <div className="flex-col -space-y-1 hidden lg:flex">
          <h4 className="text-sm font-semibold">{user?.name as string}</h4>
          <p className="text-xs text-gray-400">{user?.username as string}</p>
        </div>
      </div>
    </div>
  );
};

export default user;
