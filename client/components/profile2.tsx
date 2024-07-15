"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  MapPin,
  Tag,
  Twitter,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

const Profile2 = () => {
  return (
    <Card className="w-full max-w-md border-0 bg-[--background] dark:bg-semiDark ">
      <CardHeader className="p-0 px-3 ">
        <div className="flex space-x-4 items-center  ">
          <Avatar className="w-36 h-36">
            <AvatarImage src="https://github.com/aziz-codes.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <h4 className="font-semibold">John Doe</h4>
              <p className="text-gray-400 text-xs">johndoe</p>
            </div>
            {/* <p>
              Frotend web developer, who talk about javascript, react and node
              js
            </p> */}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-0 px-3 py-3  ">
        <div className="flex items-center space-x-4 py-2">
          <div className="flex-col">
            <label>Followers</label>
            <h4 className="font-bold text-center">78.3k</h4>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <div className="flex-col">
            <label>Following</label>
            <h4 className="font-bold text-center">2.3k</h4>
          </div>
        </div>
        <Button
          size="sm"
          className="w-full bg-[#A1D6E2] mb-3 !ring-0 !outline-none   max-w-[200px] text-[#1995AD] hover:bg-[#1995AD] hover:text-[white]"
        >
          Follow
        </Button>
      </CardContent>
    </Card>
  );
};

export default Profile2;
