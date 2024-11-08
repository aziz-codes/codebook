"use client";
import React, { FC, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis } from "lucide-react";
import TimeAgo from "react-timeago";
import { Card, CardContent, CardFooter } from "./ui/card";

import HeartSvg from "@/helpers/heart-svg";
import CommentSvg from "@/helpers/comment-svg";
import { useRouter } from "next/navigation";
import BookmarkSvg from "@/helpers/bookmark-svg";
import TextBox from "./text-box";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type User = {
  _id: string;
  name: string;
  avatar: string;
  username: string;
};

type Post = {
  _id: string;
  user: User;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
type PostProps = {
  post: Post;
};

const SinglePost: FC<PostProps> = ({ post }) => {
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  let [likes, setLikes] = useState(24);

  const handleLike = () => {
    setLiked((prevLiked) => {
      if (prevLiked) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
      return !prevLiked;
    });
  };
  const options = [
    "Report Post",
    "Edit Post",
    "Delete Post",
    "Save Post",
    "Share Post",
  ];
  const customFormatter = (value: number, unit: string, suffix: string) => {
    const shortUnit = {
      second: 'sec',
      minute: 'min',
      hour: 'hr',
      day: 'day',
      week: 'wk',
      month: 'mo',
      year: 'yr',
    }[unit];
  
 
    const formattedUnit = value > 1 ? `${shortUnit}s` : shortUnit;
  
    return `${value} ${formattedUnit} ${suffix}`;
  };
  return (
    <Card className="rounded-md !border-none mb-4">
      {/* User Info and Action Button */}
      <div className="flex justify-between items-center px-4  py-4">
        <div className="flex items-center gap-3">
          <Avatar className="cursor-pointer" onClick={()=>router.push(`user/${post.user.username}`)}>
            <AvatarFallback>{post.user.name.slice(0,2)}</AvatarFallback>
            <AvatarImage src={post.user.avatar} />
          </Avatar>
          <div>
            <p className="text-sm font-semibold cursor-pointer  text-white" onClick={()=>router.push(`user/${post.user.username}`)}>{post.user.username}</p>
            <div className="text-[11px] text-muted-foreground">
            <TimeAgo
  date={post.createdAt}
  formatter={customFormatter}
/>

        </div>

          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Ellipsis className="cursor-pointer hover:text-gray-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36">
            {options.map((option) => (
              <DropdownMenuRadioItem
                key={option}
                value={option}
                className="cursor-pointer px-2 py-1   hover:!bg-bgCard rounded-md"
              >
                {option}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardContent className="p-0">
        {/* Post Content */}
        <div className="mb-4 px-4">
        <p
      className="text-gray-300"
      dangerouslySetInnerHTML={{ __html: post.title }}
    />
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="w-full h-96  overflow-hidden">
            <img
              src={post.image}
              alt="Post"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="px-4 py-4 flex items-center justify-between select-none  ">
          <div className="flex items-center space-x-1 text-sm relative">
            <HeartSvg
              stroke={liked ? "red" : "white"}
              fill={liked ? "red" : "none"}
              onClick={handleLike}
            />

            <span className="font-semibold">{likes} Likes</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer text-sm">
            <CommentSvg />
            <span className="font-semibold">34 Comments</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <BookmarkSvg />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        {/* <div className="w-full flex items-center border rounded-bl-md rounded-br-md border-l-0 border-r-0">
          <Input
            placeholder="Add a comment"
            className="!ring-0 rounded-none bg-transparent border-none"
          />
          <Button
            variant="secondary"
            className="bg-transparen text-sky-500 hover:bg-transparent hover:font-semibold p-0 px-1"
          >
            Post
          </Button>
        </div> */}
        <div className="flex w-full items-center border  rounded-md px-2">
          <TextBox />
        </div>
      </CardFooter>
    </Card>
  );
};

export default SinglePost;
// test commit
