"use client";
import React from "react";
import { Label } from "./ui/label";
import DropDown from "./drop-down";
import { buttonVariants } from "./ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "./ui/input";
import Link from "next/link";
const DiscussionHeader = () => {
  const options = ["Javascript", "Python", "PHP", "CSS"];
  const handleSelect = (language: string) => {
    console.log(language);
  };
  return (
    <div className="flex flex-col gap-3   py-2 w-full">
      <div className="flex justify-between items-center w-full">
        <div>
          <Label className="text-xl font-bold">Discussions</Label>
          <p className="text-gray-600 text-sm">
            Join the conversation and share your thoughts.
          </p>
        </div>
        <div className="flex items-center">
          <Link
            href="/create-discussion"
            className={buttonVariants({
              variant: "ghost",
              className: "px-2 border",
              size: "sm",
            })}
          >
            <Plus />
            Create
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-2 justify-between">
        <div className="flex gap-1 flex-1 dark:bg-background py-1 px-2 rounded-md border items-center justify-between ">
          <Input
            placeholder="Search"
            className="!outline-none border-0 px-1 w-full  !ring-0 h-full  focus:ring-0 focus:ring-offset-0 focus:bg-transparent"
          />
          <Search className="text-gray-400 h-5 w-5" />
        </div>
        <div className="">
          <DropDown options={options} onSelect={handleSelect} />
        </div>
      </div>
    </div>
  );
};

export default DiscussionHeader;
