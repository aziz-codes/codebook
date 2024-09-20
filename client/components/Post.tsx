"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FeedImage } from "@/constants/images";
import { Bookmark, Ellipsis, Heart, MessageCircle } from "lucide-react";
 
import { Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import HeartSvg from "@/helpers/heart-svg";
import CommentSvg from "@/helpers/comment-svg";
import BookmarkSvg from "@/helpers/bookmark-svg";

const SinglePost = () => {
  const [liked, setLiked] = useState(false);

  let [likes, setLikes] = useState(24);

  const post = {
    userName: "John Doe",
    createdAt: "2 days ago",
    content:
      "I have fallen in love with this design, how people are so damn creative these days.",
    image: FeedImage.src,
  };
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
  return (
    <Card className="rounded-md !border-none mb-4">
      {/* User Info and Action Button */}
      <div className="flex justify-between items-center px-4  py-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>AZ</AvatarFallback>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <div>
            <p className="text-sm font-semibold   text-white">
              {post.userName}
            </p>
            <p className="text-xs text-gray-500">{post.createdAt}</p>
          </div>
        </div>
        <button className="text-gray-300    hover:text-gray-100">
          <Ellipsis />
        </button>
      </div>
      <CardContent className="p-0">
        {/* Post Content */}
        <div className="mb-4 px-4">
          <p className="text-gray-300 ">{post.content}</p>
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
          <div className="flex items-center space-x-2 text-sm relative">
            {/* <Heart
              className="cursor-pointer w-7 h-7 transition-colors duration-300 ease-in-out"
              stroke={liked ? "red" : "white"}
              fill={liked ? "red" : "none"}
              onClick={handleLike}
            /> */}
            <HeartSvg stroke={liked ? "red": "white"} fill={liked ? "red": "none"} onClick={handleLike} />
           

            <span className="font-semibold">{likes} Likes</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer text-sm">
            <CommentSvg  />
            <span className="font-semibold">34 Comments</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <BookmarkSvg />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <div className="w-full flex items-center border rounded-bl-md rounded-br-md border-l-0 border-r-0">
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
        </div>
      </CardFooter>
    </Card>
  );
};

export default SinglePost;
// test commit
