import { Bell, Mail, Search } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  return (
    <div className="h-full bg-white dark:bg-slate-900 shadow flex items-center px-2 justify-between">
      <div className="brand font-semibold">CodeBook</div>
      <div className="w-[50%]">
        <div className="flex gap-1 rounded-md border items-center justify-between py-1">
          <input
            type="text"
            placeholder="Search"
            className="outline-none border-0 px-1"
          />
          <Search className="text-gray-400 h-5 w-5" />
        </div>
      </div>
      <div className="actionIcons flex items-center space-x-3">
        <Mail className="text-gray-400 h-6 w-6 cursor-pointer hover:scale-105 transition-transform ease-in" />
        <Bell className="text-gray-400 h-6 w-6 cursor-pointer hover:scale-105 transition-transform ease-in" />
        <Avatar className="h-6 w-6">
          <AvatarFallback>Az</AvatarFallback>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
