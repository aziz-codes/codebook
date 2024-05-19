"use client";
import React from "react";
import { Bell, Mail, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  // const list = ["User"]

  return (
    <div className="relative h-full bg-white dark:bg-slate-900 shadow flex items-center px-6 justify-between ">
      <div className="brand font-semibold">CodeBook</div>
      <div className="w-[50%]">
        <div className="flex gap-1 rounded-md border items-center justify-between py-1">
          <input
            type="text"
            placeholder="Search"
            className="outline-none border-0 px-1 w-full"
          />
          <Search className="text-gray-400 h-5 w-5" />
        </div>
      </div>
      <div className="actionIcons flex items-center space-x-5">
        <Mail className="text-gray-400 h-5 w-5 cursor-pointer hover:scale-105 transition-transform ease-in" />
        <Bell className="text-gray-400 h-5 w-5 cursor-pointer hover:scale-105 transition-transform ease-in" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-6 w-6 cursor-pointer">
              <AvatarFallback>Az</AvatarFallback>
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
