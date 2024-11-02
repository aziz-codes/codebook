"use client";
import React, { FC, useEffect, useState } from "react";

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import UserDateProfile from "./layouts/user-date-profile";
import {
  Bookmark,
  Check,
  Copy,
  Ellipsis,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

import { Badge } from "./ui/badge";
import TextBox from "./text-box";
import Monaco from "./editor/monaco";
interface SnippetProps {
  _id: string;
  title: string;
  programmingLanguage: string;
  description: string;
  tags: string[];
  resource: string;
  code: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}
interface SnippetComponentProps {
  snippet: SnippetProps; 
}
const Snippet: React.FC<SnippetComponentProps> = ({ snippet }) => {
  const [copied, setCopied] = useState(false);
 

  const handleCopy = () => {
    navigator.clipboard
      .writeText(snippet.code)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <Card className="w-full overflow-hidden pt-2  shadow-lg border dark:border-[#181a20] border-gray-300 !ring-0 !outline-none ">
      <CardHeader className="p-0 px-2">
        <div className="flex justify-between ">
          <UserDateProfile
            date={snippet.createdAt}
            username={snippet.user.username}
            image={snippet.user.avatar}
          />
          <button className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
            <Ellipsis />
          </button>
        </div>
        <div>
          <Label className="line-clamp-3 leading-5">
             {snippet.description}
          </Label>
          <div className="flex flex-wrap gap-2 py-2">
           {snippet.tags.slice(0,4).map((tag,index)=>(
              <Badge className="dark:bg-codeHeader text-gray-200" key={index}>{index === 3 ? tag.concat(" + "+snippet.tags.length.toString()):tag}</Badge>
           ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="my-0 p-0 mt-2 mb-1 px-2 relative  rounded-md border-codeHeader">
        <div className="flex items-center justify-between py-2 bg-codeHeader px-2 rounded-tl-md rounded-tr-md text-gray-300 ">
          <p className="text-xs">{snippet.programmingLanguage.toLowerCase()}</p>
          <div
            className="text-xs flex items-center gap-1 cursor-pointer"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "copied!" : "copy code"}
          </div>
        </div>
        <Monaco code={snippet.code} language={snippet.programmingLanguage.toLowerCase()} />
      </CardContent>
      <CardFooter className="mt-2 px-0 py-4 flex flex-col items-start">
        <div className="flex items-center gap-3 px-2">
          <Button
            className="bg-transparent flex items-center"
            variant="secondary"
          >
            <ThumbsUp className="stroke-sky-400 fill-sky-400 cursor-pointer hover:scale-105 transition-all duration-75 ease-linear hover:text-gray-400" />
            &nbsp; <Label className="text-sm mt-1">200 likes</Label>
          </Button>
          <Button
            className="bg-transparent flex items-center"
            variant="secondary"
          >
            <MessageSquare /> &nbsp; <Label className="">129 comments</Label>
          </Button>
          <Button
            className="bg-transparent flex items-center"
            variant="secondary"
          >
            <Bookmark className="cursor-pointer hover:scale-105 transition-all duration-75 ease-linear hover:text-gray-400" />
            &nbsp; <Label>bookmark</Label>
          </Button>
        </div>
        <div className="flex justify-start items-center gap-1 px-2 mt-6  w-full">
          <div className="flex w-full items-center border  rounded-md px-2">
            <TextBox />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Snippet;
