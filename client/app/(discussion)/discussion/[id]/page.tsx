import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import Slider from "@/components/slider";
import { Badge } from "@/components/ui/badge";
import {
  Bookmark,
  Ellipsis,
  Flag,
  MessageCircle,
  SquareCheck,
  SquarePen,
  Tags,
  ThumbsUp,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarShortcut,
} from "@/components/ui/menubar";
import { Textarea } from "@/components/ui/textarea";
import UserDateProfile from "@/components/layouts/user-date-profile";
import MainWrapper from "@/layouts/main-wrapper";

const Discussion = () => {
  const menuOptions = [
    { label: "Edit", icon: SquarePen },
    { label: "Bookmark", icon: Bookmark },
    { label: "Report", icon: Flag },
    { label: "Delete", icon: Trash },
  ];

  return (
    <MainWrapper classes="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <UserDateProfile
          date="5 Jun"
          username="azizcodes"
          image="https://github.com/shadcn.png"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="hover:bg-bgCard">
              <MessageCircle className="w-4 h-4" /> &nbsp; Add a comment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] md:max-w-96 lg:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex gap-2 items-center">
                <MessageCircle className="w-5 h-6" /> Add a comment
              </DialogTitle>
              <DialogDescription>
                Make sure your feedback is clear and constructive
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-1">
              <Label>Add a comment</Label>
              <Textarea
                placeholder="leave your comment"
                className="!ring-0"
                rows={5}
              />
            </div>
            <DialogFooter>
              <Button type="submit" size="sm">
                Comment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Label>I am getting cors error on client side</Label>
      <div className="flex gap-2 items-center">
        <Tags className="text-gray-400" />
        <Badge>JavaScript</Badge>
        <Badge>React JS</Badge>
        <Badge>Node JS</Badge>
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto at
        qui delectus illo aperiam sapiente ea aspernatur odio ratione impedit
        quasi repellat molestias voluptas, dolores consectetur non iusto. Alias,
        dicta! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Architecto at qui delectus illo aperiam sapiente ea aspernatur odio
        ratione impedit quasi repellat molestias voluptas, dolores consectetur
        non iusto. Alias, dicta!
      </div>
      <div className="flex justify-center">
        <Slider />
      </div>

      {/* second comment */}
      {Array.from({ length: 2 }).map((_, index) => (
        <div className="p-4 rounded-lg border" key={index}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <Avatar>
                <AvatarFallback>AZ</AvatarFallback>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div className="mt-1">
                <p className="font-semibold">azizcodes</p>
                <p className="text-xs text-gray-500">5 hrs ago</p>
              </div>
              <Badge
                className="rounded-none p-0 bg-transparent hover:bg-transparent"
                title="marked as correct"
              >
                <SquareCheck className="text-green-900" />
              </Badge>
            </div>

            <Menubar>
              <MenubarMenu>
                <MenubarTrigger role="div">
                  <Ellipsis className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 cursor-pointer" />
                </MenubarTrigger>
                <MenubarContent>
                  {menuOptions.map((option, index) => {
                    const Icon = option.icon;
                    return (
                      <MenubarItem
                        key={index}
                        className={`cursor-pointer ${
                          index === menuOptions.length - 1 &&
                          "text-red-500 hover:!text-red-500"
                        }`}
                      >
                        {option.label}
                        <MenubarShortcut>
                          <Icon
                            className={`w-4   ${
                              index === menuOptions.length - 1 && "text-red-500"
                            }`}
                          />
                        </MenubarShortcut>
                      </MenubarItem>
                    );
                  })}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
          <div className="pl-10">
            <p className="mt-2 ">
              this should work for you bro. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Rerum recusandae dignissimos rem
              mollitia consectetur dolorem temporibus ad quidem corporis fugiat
              nam omnis harum libero id, modi amet eum tempore illum.
            </p>
            <div className="flex items-center gap-1  mt-4">
              <ThumbsUp className="cursor-pointer hover:text-gray-400" />
              <span className="text-sm mt-2">12k likes</span>
            </div>
          </div>
        </div>
      ))}
    </MainWrapper>
  );
};

export default Discussion;
