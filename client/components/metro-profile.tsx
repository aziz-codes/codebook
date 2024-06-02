import React from "react";
import ProfileAvatar from "./profile-avatar";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import {
  HomeIcon,
  Users,
  TrendingUp,
  CodeXml,
  BadgeCent,
  UserCheck,
} from "lucide-react";
const MetroProfile = () => {
  return (
    <div
      className={`w-full h-auto bg-[--background] dark:bg-semiDark rounded-md py-12 px-6`}
    >
      <div className="flex flex-col md:flex-row gap-4 flex-wrap items-center justify-between">
        <div className="flex gap-4 ">
          <ProfileAvatar
            username="azizcodes"
            image="https://github.com/shadcn.png"
          />
          <div className="flex flex-col max-w-md gap-3">
            <div>
              <h4 className="font-bold">Aziz</h4>

              <p className="line-clamp-3 text-sm font-[500] text-gray-400">
                Frontend web developer, talks about JS, React, Node, PHP, MYSQL
              </p>
            </div>
            <Separator />
            <div className="flex items-center w-full max-w-md  justify-between">
              <div className="flex flex-col space-y-1 " title="discussions">
                <Label className="font-bold">25</Label>
                <p className="text-gray-400  text-sm hidden md:block">
                  Discussions
                </p>
                <TrendingUp className="block md:hidden" />
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col space-y-1 " title="snippets">
                <Label className="font-bold">25</Label>
                <p className="text-gray-400  text-sm hidden md:block">
                  Snippets
                </p>
                <CodeXml className="block md:hidden" />
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col space-y-1 " title="bounties">
                <Label className="font-bold">25</Label>
                <p className="text-gray-400  text-sm hidden md:block">
                  Bounties
                </p>
                <BadgeCent className="block md:hidden" />
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col space-y-1 " title="followers">
                <Label className="font-bold">25</Label>
                <p className="text-gray-400  text-sm hidden md:block">
                  Followers
                </p>
                <Users className="block md:hidden" />
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col space-y-1 " title="Following">
                <Label className="font-bold">25</Label>
                <p className="text-gray-400  text-sm hidden md:block">
                  Follwing
                </p>
                <UserCheck className="block md:hidden" />
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
