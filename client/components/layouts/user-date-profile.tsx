import React from "react";

interface IAvatarProps {
  date: string;
  username: string;
  image: string;
}
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
const UserDateProfile = ({ date, username, image }: IAvatarProps) => {
  return (
    <div className="flex items-center gap-1">
      <Avatar>
        <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
        <AvatarImage src={image} />
      </Avatar>
      <div className="flex flex-col -space-y-1">
        <h4 className="text-sm font-semibold">{username}</h4>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </div>
  );
};

export default UserDateProfile;
