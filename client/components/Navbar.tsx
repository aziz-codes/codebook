"use client";
import React from "react";
import { Bell, Mail, Moon, Search, Sun } from "lucide-react";

import { useTheme } from "next-themes";

import { Input } from "@/components/ui/input";
import UserAvatar from "./user-avatar";

const Navbar = () => {
  const { setTheme } = useTheme();

  return (
    <div className="relative h-full bg-background border-b shadow flex items-center px-4 justify-between ">
      <div className="brand font-semibold">CodeBook</div>
      <div className="w-[50%]">
        <div className="flex gap-1 rounded-md border items-center justify-between py-1 px-2 bg-white dark:bg-background">
          {/* <input
            type="text"
            placeholder="Search"
            className="outline-none border-0 px-1 w-full"
          /> */}
          <Input
            placeholder="Search"
            className="!outline-none border-0 px-1 w-full !ring-0 h-6 bg-background focus:ring-0 focus:ring-offset-0 "
          />

          <Search className="text-gray-400 h-5 w-5" />
        </div>
      </div>
      <div className="actionIcons flex items-center space-x-5">
        <Mail className="text-gray-400 h-5 w-5 cursor-pointer hover:scale-105 transition-transform ease-in" />
        <Bell className="text-gray-400 h-5 w-5 cursor-pointer hover:scale-105 transition-transform ease-in" />
        <Sun onClick={() => setTheme("light")} />
        <Moon onClick={() => setTheme("dark")} />
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
