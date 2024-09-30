"use client";
import React from "react";

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import UserDateProfile from "./layouts/user-date-profile";
import { Bookmark, Ellipsis, MessageSquare, ThumbsUp } from "lucide-react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

import { Badge } from "./ui/badge";
import TextBox from "./text-box";
import Monaco from "./editor/monaco";
const Snippet = () => {
  const language = "javascript";
  const code = `const adjustHeight = () => {
      if (inputRef.current) {
        inputRef.current.style.height = "34px";  
        inputRef.current.style.height = {inputRef.current.scrollHeight}px  
      }
    };`;
  return (
    <Card className="w-full overflow-hidden pt-2 mb-8   shadow-lg border dark:border-[#181a20] border-gray-300">
      <CardHeader className="p-0 px-2">
        <div className="flex justify-between ">
          <UserDateProfile
            date="25 Mar"
            username="azizcodes"
            image="https://github.com/shadcn.png"
          />
          <button className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
            <Ellipsis />
          </button>
        </div>
        <div>
          <Label className="line-clamp-3 leading-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            maxime accusantium numquam. Non est, aspernatur atque asperiores
            officiis inventore, laborum nihil tempora quod explicabo mollitia
            sapiente sunt dolore doloribus iure!
          </Label>
          <div className="flex flex-wrap gap-2 py-2">
            <Badge className="dark:bg-gray-400">Javascript</Badge>
            <Badge className="dark:bg-gray-400">React JS</Badge>
            <Badge className="dark:bg-gray-400">Node JS</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="my-0 p-0 mt-2 mb-1 px-0 relative">
        {/* <CodeHighlighter language={language} code={code} /> */}
        <Monaco code={code} language={language} />
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
