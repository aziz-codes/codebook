import React from "react";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";
import { Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
 

const UserCard = async () => {
  const session = await auth();
  const user = session?.user;
  return (
    <section className="w-full max-w-5xl flex row mt-6  ">
      <div className="flex flex-col justify-start gap-2 ">
        <Avatar className="h-32 w-32  border-2 mx-auto">
          <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
          <AvatarImage src={user?.image as string} />
        </Avatar>

        <div className="flex items-center gap-8 mx-auto">
          <div className="flex flex-col space-y-1 ">
            <Label>300</Label>
            <p className="text-gray-400 dark:text-muted text-sm">Followers</p>
          </div>
          <div className="flex flex-col space-y-1 ">
            <Label>25</Label>
            <p className="text-gray-400 dark:text-muted text-sm">Following</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 my-2 mx-auto">
          <Globe className="w-4" />
          <Link
            href="#"
            className="text-xs text-sky-500 whitespace-nowrap text-ellipsis overflow-hidden"
          >
            https://www.aziz-codes.com
          </Link>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <h4 className="font-semibold">{user?.username}</h4>
        <Label className="dark:text-muted text-gray-400 max-w-xs line-clamp-2">
          Frontend web developer
        </Label>
        <div className="flex items-center px-2 mt-6 max-w-sm  gap-8">
          <div className="flex flex-col space-y-1 ">
            <Label>25</Label>
            <p className="text-gray-400 dark:text-muted text-sm">Discussion</p>
          </div>
          <div className="flex flex-col space-y-1 ">
            <Label>25</Label>
            <p className="text-gray-400 dark:text-muted text-sm">Snippets</p>
          </div>
          <div className="flex flex-col space-y-1 ">
            <Label>25</Label>
            <p className="text-gray-400 dark:text-muted text-sm">Bounties</p>
          </div>
        </div>
        {/* <Separator className="my-2 max-w-xs" /> */}
        <div className="flex flex-row gap-2 flex-wrap mt-2 justify-between space-y-2">
          <div className="flex items-center gap-8">
            {/* <div className="flex flex-col space-y-1 ">
              <Label>300</Label>
              <p className="text-gray-400 dark:text-muted text-sm">Followers</p>
            </div>
            <div className="flex flex-col space-y-1 ">
              <Label>25</Label>
              <p className="text-gray-400 dark:text-muted text-sm">Following</p>
            </div> */}
            {/* <div className="flex flex-col space-y-1 ">
              <Label>25</Label>
              <p className="text-gray-400 dark:text-muted text-sm">Posts</p>
            </div> */}
          </div>
          <div className="flex items-center space-x-4">
            <Button
              size="sm"
              className="p-0 px-4 rounded-3xl text-sm h-0 py-3.5"
            >
              Follow
            </Button>
            <Button
              size="sm"
              className="p-0 px-4 rounded-3xl text-sm h-0 py-3.5"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </section>
    // <div className="w-full   flex flex-row p-2 gap-1">
    //   <div className="flex-1">
    // <Avatar className="h-28 w-28  border-2 mx-auto">
    //   <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
    //   <AvatarImage src={user?.image as string} />
    // </Avatar>
    //     <div className="text-center">
    //       <h4 className="font-semibold">{user?.name}</h4>
    // <Label className="dark:text-muted text-gray-400 ">
    //   Frontend web developer
    // </Label>

    // <div className="flex items-center px-2 my-4 justify-around">
    //   <div className="flex flex-col space-y-1">
    //     <Label>300</Label>
    //     <p className="text-muted text-sm">Followers</p>
    //   </div>
    //   <div className="flex flex-col space-y-1">
    //     <Label>25</Label>
    //     <p className="text-muted text-sm">Following</p>
    //   </div>
    // </div>
    //     </div>
    //   </div>
    //   <div>
    //     <p className="text-sm text-gray-400 mt-2 px-2">
    //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quas
    //       molestiae dolorum cupiditate, libero deserunt, quidem magni esse quod
    //       temporibus consequuntur illum aperiam natus qui aut vitae neque
    //     </p>
    // <div className="flex items-center justify-center gap-2 my-2">
    //   <Globe className="w-4" />
    //   <Link
    //     href="#"
    //     className="text-xs text-sky-500 whitespace-nowrap text-ellipsis overflow-hidden"
    //   >
    //     https://www.aziz-codes.com
    //   </Link>
    // </div>
    //   </div>
    // </div>
  );
};

export default UserCard;
