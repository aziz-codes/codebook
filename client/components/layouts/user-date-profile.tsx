"use client";
import React from "react";
import TimeAgo from "react-timeago";
import { useRouter } from "next/navigation";
interface IAvatarProps {
  date: string;
  username: string;
  image: string;
}
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
const UserDateProfile = ({ date, username, image }: IAvatarProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Avatar
        onClick={() => router.push(`/user/${username}`)}
        className="cursor-pointer"
      >
        <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
        <AvatarImage src={image} />
      </Avatar>
      <div className="flex flex-col -space-y-1">
        <h4
          className="text-sm font-semibold cursor-pointer"
          onClick={() => router.push(`/user/${username}`)}
        >
          {username}
        </h4>
        <div className="text-[11px] text-muted-foreground">
          <TimeAgo date={date} locale="en-US" timestyle="twitter" />
        </div>
      </div>
    </div>
  );
};

export default UserDateProfile;
