"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
const UserAvatar = () => {
  const router = useRouter();
  const { data: user } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className=" cursor-pointer ring-1 ring-bgCard hover:ring-slate-700">
          <AvatarFallback>
            {user?.user.name?.charAt(0)}
            {user?.user.name?.charAt(1)}
          </AvatarFallback>
          <AvatarImage src={user?.user.image as string} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <div className="px-2 py-3 flex gap-4 items-center">
          <Avatar className="rounded-none">
            <AvatarFallback>
              {user?.user.name?.charAt(0)}
              {user?.user.name?.charAt(1)}
            </AvatarFallback>
            <AvatarImage src={user?.user.image as string} />
          </Avatar>
          <div>
            <h4>{user?.user.name}</h4>
            <p className="text-gray-400   text-xs">{user?.user.username}</p>
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuRadioItem
          value="right"
          className="  cursor-pointer px-2 hover:!bg-bgCard rounded-md "
          onClick={() => router.push(`/${user?.user.username}`)}
        >
          My Profile
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem
          value="right"
          className="cursor-pointer px-2 hover:!bg-bgCard rounded-md "
        >
          Account Settings
        </DropdownMenuRadioItem>

        <DropdownMenuRadioItem
          value="right"
          className="cursor-pointer px-2 hover:!bg-bgCard rounded-md "
          onClick={() =>
            signOut({
              callbackUrl: "http://localhost:3000/login",
            })
          }
        >
          Sign Out
        </DropdownMenuRadioItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
