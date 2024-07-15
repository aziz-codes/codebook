"use client";
import React from "react";
import { Bell, Mail, SearchIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UserAvatar from "./user-avatar";
import ThemeToggle from "./theme-toggle";

const Navbar = () => {
  return (
    <div className="relative h-full bg-[--background] dark:bg-[#121212]   flex items-center px-4 justify-between ">
      <div className="brand font-semibold">Test</div>
      {/* <div className="w-[50%]"></div> */}
      <div className="actionIcons flex items-center space-x-5">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <SearchIcon className="text-gray-400 h-5 w-5 cursor-pointer hover:scale-105 !ring-0 focus-within:!ring-0 transition-transform ease-in" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark:bg-red-500 bg-green-500">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
        <Mail className="text-gray-400 h-5 w-5 cursor-pointer hover:scale-105 transition-transform ease-in" />
        <Bell className="text-gray-400 h-5 w-5 cursor-pointer hover:scale-105 transition-transform ease-in" />

        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
