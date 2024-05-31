import React from "react";
import SingleAvatar from "../single-avatar";
interface IAvatarProps {
  date: string;
  username: string;
}
const UserDateProfile = ({ date, username }: IAvatarProps) => {
  return (
    <div className="flex items-center gap-1">
      <SingleAvatar />
      <div className="flex flex-col -space-y-1">
        <h4 className="text-sm font-semibold">{username}</h4>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </div>
  );
};

export default UserDateProfile;
