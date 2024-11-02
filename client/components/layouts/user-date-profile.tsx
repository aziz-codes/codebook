import React from "react";
import TimeAgo from "react-timeago";
interface IAvatarProps {
  date: string;
  username: string;
  image: string;
}
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
const UserDateProfile = ({ date, username, image }: IAvatarProps) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
        <AvatarImage src={image} />
      </Avatar>
      <div className="flex flex-col -space-y-1">
        <h4 className="text-sm font-semibold">{username}</h4>
        <div className="text-[11px] text-muted-foreground">
          <TimeAgo
            date={date}
            locale="en-US"
            timeStyle="twitter"
            // style={{ fontSize: "11px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDateProfile;
