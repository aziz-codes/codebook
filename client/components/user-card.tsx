import React from "react";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";
import { Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const UserCard = async () => {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="w-full md:max-w-[300px] max-w-full flex flex-col p-2 gap-1">
      <Avatar className="h-28 w-28  border-2 mx-auto">
        <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
        <AvatarImage src={user?.image as string} />
      </Avatar>
      <div className="text-center">
        <h4 className="font-semibold">{user?.name}</h4>
        <Label className="dark:text-muted text-gray-400 ">
          Frontend web developer
        </Label>
        <Separator className="my-4" />
        <div className="flex items-center px-2 my-4 justify-around">
          <div className="flex flex-col space-y-1">
            <Label>300</Label>
            <p className="text-muted text-sm">Followers</p>
          </div>
          <div className="flex flex-col space-y-1">
            <Label>25</Label>
            <p className="text-muted text-sm">Following</p>
          </div>
        </div>
        <Separator className="my-4" />
        <p className="text-sm text-gray-400 mt-2 px-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quas
          molestiae dolorum cupiditate, libero deserunt, quidem magni esse quod
          temporibus consequuntur illum aperiam natus qui aut vitae neque
        </p>
        <div className="flex items-center justify-center gap-2 my-2">
          <Globe className="w-4" />
          <Link
            href="#"
            className="text-xs text-sky-500 whitespace-nowrap text-ellipsis overflow-hidden"
          >
            https://www.aziz-codes.com
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 px-2 my-3 ">
          <Button
            size="sm"
            className="rounded-3xl p-0 px-4 py-0 m-0 mx-auto w-auto md:w-full"
          >
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
