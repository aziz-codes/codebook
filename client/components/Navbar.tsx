"use client";
import React from "react";
import { Bell, Mail } from "lucide-react";


import UserAvatar from "./user-avatar";
import ThemeToggle from "./theme-toggle";

const Navbar = () => {
  return (
    <div className="relative h-full bg-[--background] dark:bg-[#121212]   flex items-center px-4 justify-between ">
      <div className="brand font-semibold">Test</div>

      <div className="actionIcons flex items-center space-x-5">


        <Mail className="text-gray-400 h-5 w-5 cursor-pointer hover:scale-105 transition-transform ease-in" />
        <Bell className="text-gray-400 h-5 w-5 cursor-pointer hover:scale-105 transition-transform ease-in" />

        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
