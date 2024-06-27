"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FeedImage } from "@/constants/images";
import { Bookmark, Ellipsis, Heart, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
const SinglePost = () => {
  const { theme } = useTheme();
  const [liked, setLiked] = useState(false);
  const [stroke, setStroke] = useState("white");
  useEffect(() => {
    if (theme === "dark") {
      setStroke("white");
    } else setStroke("black");
  }, [theme]);
  let [likes, setLikes] = useState(24);
  const [animationType, setAnimationType] = useState<
    "increment" | "decrement" | null
  >(null);
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
        setAnimationType("decrement");
        setLikes(likes - 1);
      } else {
        setAnimationType("increment");
        setLikes(likes + 1);
      }
      return !prevLiked;
    });
  };
  return (
    <Card className=" rounded-md shadow-md mb-4 border">
      {/* User Info and Action Button */}
      <div className="flex justify-between items-center px-4  py-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>AZ</AvatarFallback>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {post.userName}
            </p>
            <p className="text-xs text-gray-500">{post.createdAt}</p>
          </div>
        </div>
        <button className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
          <Ellipsis />
        </button>
      </div>
      <CardContent className="p-0">
        {/* Post Content */}
        <div className="mb-4 px-4">
          <p className="text-gray-700 dark:text-gray-300 ">{post.content}</p>
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
            <Heart
              className="cursor-pointer w-7 h-7 transition-colors duration-100 ease-in-out"
              stroke={liked ? "red" : stroke}
              fill={liked ? "red" : "none"}
              onClick={handleLike}
            />
            <span className="font-semibold">{likes} likes</span>
            <AnimatePresence>
              {animationType && (
                <motion.div
                  key={animationType} // Ensure each animation type is treated separately
                  initial={{
                    opacity: 0,
                    y: animationType === "increment" ? -10 : -60,
                  }}
                  animate={{
                    opacity: 1,
                    y: animationType === "increment" ? -40 : -10,
                  }}
                  exit={{
                    opacity: 0,
                    y: animationType === "increment" ? -60 : -10,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 text-lg font-bold text-red-500 whitespace-nowrap"
                  onAnimationComplete={() => setAnimationType(null)} // Ensure the animation completes
                >
                  {animationType === "increment" ? "like++" : "like--"}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer text-sm">
            <MessageCircle className="cursor-pointer w-7 h-7" />
            <span className="font-semibold">34 comments</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <Bookmark className="cursor-pointer w-7 h-7" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <div className="w-full flex items-center border">
          <Input
            placeholder="add a comment"
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
