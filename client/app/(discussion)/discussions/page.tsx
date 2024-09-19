"use client";
import React, { useState } from "react";

import SearchInput from "@/components/custom/search-input";
import DiscussionCard from "@/components/disucssion/discussion-card";
import Lanuages from "@/components/disucssion/languages";
import { discussionFilter } from "@/constants/filter-list";
import { discussions } from "@/constants/discussion/discussion-items";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { users } from "@/constants/users";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { CircleCheck } from "lucide-react";
const Discussion = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pb-6">
        {/* Search Input: Takes full width on small screens and 60% on large screens */}
        <div className="col-span-1 lg:col-span-7">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Select and Button: Split equally (20% each) on large screens */}
        <div className="grid grid-cols-2 col-span-1 lg:col-span-5 gap-3">
          <Select>
            <SelectTrigger className="w-full py-4">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>All</SelectLabel>
                {discussionFilter.map((item) => (
                  <SelectItem
                    value={item}
                    key={item}
                    className="hover:!bg-bgHover cursor-pointer"
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Button
          size="sm"
          variant="outline"
          className="!ring-0 !outline-none !border-none focus:!outline-none bg-green-800 hover:bg-green-800 "
          onClick={()=>router.push('/create-discussion')}
        >
          Start Discussion
        </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="hidden md:flex md:col-span-3  flex-col gap-2">
          <h4 className="font-semibold text-sm">Categories</h4>
          <Lanuages />
        </div>

        <div className="col-span-12 md:col-span-6  flex flex-col gap-3">
          <h4 className="font-semibold text-sm">Discussions</h4>
          {discussions.map((item,index)=>(

          <DiscussionCard key={index} item={item}/>
          ))}
          
        </div>

        <div className="hidden md:flex md:col-span-3 flex-col gap-3">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-sm">Top Contributors</h4>
            <p className="text-gray-400 text-xs">last 30 days</p>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            {users.map((user, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{user.first_name}</AvatarFallback>
                    <AvatarImage src={user.avatar} />
                  </Avatar>
                  <Label className="text-xs">{user.first_name}</Label>
                </div>
                <div className="flex items-center space-x-1">
                 
                  <CircleCheck
                    className={`h-4 w-4 ${index === 0 && "text-green-500"}`}
                  />
                  <span className="text-xs">400</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Discussion;
