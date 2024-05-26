"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
  hasBorder?: boolean;
  hoverEffect?: boolean;
  date?: string;
}
const user = ({ hasBorder = true, hoverEffect = true, date = "" }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();

  const user = session?.user;
  return (
    <div
      className={`w-full flex ${
        date ? "justify-start " : "justify-center lg:justify-start"
      }    shadow-md rounded-md px-1 ${
        hoverEffect &&
        "hover:scale-105 transition-transform duration-150 ease-linear"
      } cursor-pointer ${hasBorder && "lg:border py-3"}`}
      onClick={() => router.push("/user/12")}
    >
      <div className="flex gap-2 items-center">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          <AvatarImage src={user?.image as string} />
        </Avatar>
        <div
          className={`${
            date
              ? "flex flex-col -space-y-0.5"
              : "flex-col -space-y-1.5 hidden lg:flex"
          }`}
        >
          <h4 className="text-sm font-semibold">{user?.name as string}</h4>
          <p className="text-xs text-gray-400">
            {date ? date : (user?.username as string)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default user;
