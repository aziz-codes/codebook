"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ProfileCard = () => {
  const { data: session } = useSession();
  const stats = [
    {
      name: "Posts",
      count: "3.2K",
    },
    {
      name: "Discussions",
      count: "08",
    },
    {
      name: "Snippets",
      count: "43",
    },
    {
      name: "Bounties",
      count: "12/4",
    },
  ];
  return (
    <div className="bg-bgCard w-full rounded-md px-4 py-4 grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-4 flex flex-col  p-4 justify-center items-center">
        <Avatar className="rounded-full md:rounded-md h-44 w-44">
          <AvatarFallback>
            {session?.user.name?.charAt(0)}
            {session?.user.name?.charAt(1)}
          </AvatarFallback>
          <AvatarImage src={session?.user.image as string} />
        </Avatar>
        <div className="py-3 text-center">
          <Label className="text-center text-lg capitalize">
            {session?.user.name}
          </Label>
          <p className="text-sm">{session?.user.username}</p>
          <Label className="font-[400]">Frontend Web Developer</Label>
        </div>
      </div>
      <div className="col-span-12  md:col-span-7  overflow-hidden  p-4 flex flex-col gap-5 items-center md:items-start">
        <div className="flex gap-2 items-center space-x-6 flex-wrap">
          {stats.map((stat) => (
            <div className="flex flex-col space-y-1" key={stat.name}>
              <Label className="font-[400]">{stat.name}</Label>
              <p className="text-center text-sm font-semibold">{stat.count}</p>
            </div>
          ))}
        </div>
        {/* BIO */}
        <Label className="line-clamp-3 font-normal leading-5 max-w-xs">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
          accusamus quia, ab quaerat eveniet, enim corporis modi iste reiciendis
          consectetur distinctio itaque esse qui saepe sed beatae sit alias.
          Corporis.enwkfnweknfkw wefwfnkw fwnfwbfwewm fw wfnwkfek
        </Label>
        <div className="flex items-center  space-x-4 max-w-xs">
          <Button size="sm" variant="secondary" className="flex-1">
            Following
          </Button>
          <Button size="sm" variant="secondary" className="flex-1">
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
