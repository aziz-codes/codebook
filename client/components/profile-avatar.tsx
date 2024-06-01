import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
interface IAvatarProps {
  username: string;
  image: string;
}
const ProfileAvatar = ({ image, username }: IAvatarProps) => {
  return (
    <Avatar className=" h-28 w-28 rounded-md">
      <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
      <AvatarImage src={image} />
    </Avatar>
  );
};

export default ProfileAvatar;
