"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
const UserAvatar = () => {
  const { data: user } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-6 w-6 cursor-pointer">
          <AvatarFallback>
            {user?.user.name?.charAt(0)}
            {user?.user.name?.charAt(1)}
          </AvatarFallback>
          <AvatarImage src={user?.user.image as string} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
        <DropdownMenuRadioItem
          value="right"
          className="cursor-pointer"
          onClick={() =>
            signOut({
              callbackUrl: "http://localhost:3000/auth",
            })
          }
        >
          Logout
        </DropdownMenuRadioItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
