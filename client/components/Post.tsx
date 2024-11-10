"use client";
import React, { FC, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis } from "lucide-react";
import TimeAgo from "react-timeago";
import { Card, CardContent, CardFooter } from "./ui/card";
import {AnimatePresence,motion} from 'framer-motion'
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
  sessionId: string;
};

const SinglePost: FC<PostProps> = ({ post, sessionId }) => {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [openCommentBox, setCommentBox] = useState(false);
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
    { label: "Report Post", ownerOnly: false },
    { label: "Edit Post", ownerOnly: true },
    { label: "Delete Post", ownerOnly: true },
    { label: "Save Post", ownerOnly: false },
    { label: "Share Post", ownerOnly: false },
  ];
  const isPostOwner = post.user._id === sessionId;
  const customFormatter = (value: number, unit: string, suffix: string) => {
    const shortUnit = {
      second: "sec",
      minute: "min",
      hour: "hr",
      day: "day",
      week: "wk",
      month: "mo",
      year: "yr",
    }[unit];

    const formattedUnit = value > 1 ? `${shortUnit}s` : shortUnit;

    return `${value} ${formattedUnit} ${suffix}`;
  };
  return (
    <Card className="rounded-md !border-none mb-4">
      {/* User Info and Action Button */}
      <div className="flex justify-between items-center px-4  py-4">
        <div className="flex items-center gap-3">
          <Avatar
            className="cursor-pointer"
            onClick={() => router.push(`user/${post.user.username}`)}
          >
            <AvatarFallback>{post.user.name.slice(0, 2)}</AvatarFallback>
            <AvatarImage src={post.user.avatar} />
          </Avatar>
          <div>
            <p
              className="text-sm font-semibold cursor-pointer  text-white"
              onClick={() => router.push(`user/${post.user.username}`)}
            >
              {post.user.username}
            </p>
            <div className="text-[11px] text-muted-foreground">
              <TimeAgo date={post.createdAt} formatter={customFormatter} />
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Ellipsis className="cursor-pointer hover:text-gray-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36">
            {options
              .filter((option) => !option.ownerOnly || isPostOwner)
              .map((option) => (
                <DropdownMenuRadioItem
                  key={option.label}
                  value={option.label}
                  className="cursor-pointer px-2 py-1   hover:!bg-bgCard rounded-md"
                >
                  {option.label}
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
        <div className="px-3 py-4 flex items-center justify-between select-none border-t">
          <div className="flex items-center space-x-1 text-sm relative">
            <HeartSvg
              stroke={liked ? "red" : "white"}
              fill={liked ? "red" : "none"}
              onClick={handleLike}
              className="w-6 h-6 cursor-pointer  "
            />

            <span className=" text-xs">{likes} Likes</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer text-sm">
            <CommentSvg
              className="w-6 h-6 cursor-pointer "
              onClick={() => setCommentBox(!openCommentBox)}
            />
            <span className=" text-xs hover:underline">34 Comments</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <BookmarkSvg className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
      </CardContent>
      <AnimatePresence>
      {openCommentBox && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <CardFooter className="p-0 flex-col items-start flex">
            <div className="flex w-full items-center border-b rounded-md px-3">
              <TextBox />
            </div>
          </CardFooter>
        </motion.div>
      )}
    </AnimatePresence>
    </Card>
  );
};

export default SinglePost;
// test commit
