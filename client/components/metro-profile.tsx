import React from "react";
import ProfileAvatar from "./profile-avatar";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
const MetroProfile = () => {
  return (
    <div
      className={`w-full h-auto bg-[--background] dark:bg-semiDark rounded-md p-4 `}
    >
      <div className="flex flex-col md:flex-row gap-4 flex-wrap items-center justify-between">
        <div className="flex gap-4 ">
          <ProfileAvatar
            username="azizcodes"
            image="https://github.com/shadcn.png"
          />
          <div className="flex flex-col max-w-xs gap-3">
            <div>
              <h4 className="font-bold">Aziz</h4>
              <p className="line-clamp-2 text-sm font-[500]">
                Frontend web developer, talks about JS, React, Node, PHP, MYSQL
              </p>
            </div>
            <Separator />
            <div className="flex items-center  max-w-xs  justify-between">
              <div className="flex flex-col space-y-1 ">
                <Label className="font-bold">25</Label>
                <p className="text-gray-400  text-sm">Discussions</p>
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col space-y-1 ">
                <Label className="font-bold">25</Label>
                <p className="text-gray-400  text-sm">Snippets</p>
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col space-y-1 ">
                <Label className="font-bold">25</Label>
                <p className="text-gray-400  text-sm">Bounties</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Button
            size="sm"
            className=" text-[13px] bg-gray-400 dark:bg-slate-700 text-white"
          >
            Follow
          </Button>

          <Button
            size="sm"
            className="p-0 px-3 text-[13px] text-white bg-[#107EFF] hover:bg-[#006AE6]"
          >
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MetroProfile;
