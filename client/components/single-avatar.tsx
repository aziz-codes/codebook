import React from "react";
import { auth } from "@/auth";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const SingleAvatar = async () => {
  const session = await auth();

  const user = session?.user;
  return (
    <Avatar className="h-8 w-8">
      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
      <AvatarImage src={user?.image as string} />
    </Avatar>
  );
};

export default SingleAvatar;
