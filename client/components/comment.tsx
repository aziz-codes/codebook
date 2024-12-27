"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Heart } from "lucide-react";
import { CommentType } from "@/types/post";
import ReactTimeago from "react-timeago";
import { useRouter } from "next/navigation";
import { customFormatter } from "@/utils/utils";

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const router = useRouter();
  return (
    <div className="flex space-x-3 mb-4 w-full ">
      <Avatar
        className="w-8 h-8 cursor-pointer"
        onClick={() => router.push(`/${comment.userDetails.username}`)}
      >
        <AvatarImage
          src={comment.userDetails.avatar}
          alt={comment.userDetails.username}
        />
        <AvatarFallback>{comment.userDetails.username[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <div className="bg-bgHover px-3 py-2 rounded-lg w-full">
          <div className="flex justify-between items-start">
            <p
              className="font-semibold text-slate-300 text-sm cursor-pointer"
              onClick={() => router.push(`/${comment.userDetails.username}`)}
            >
              {comment.userDetails.username}
            </p>
            <div className="text-[10px] text-gray-400">
              <ReactTimeago
                date={comment.createdAt}
                formatter={customFormatter}
              />
            </div>
          </div>
          <p className="mt-1 text-xs first-letter:uppercase">{comment.text}</p>
        </div>
        <div className="flex space-x-4 items-center text-xs mt-1">
          {comment.likes.length > 0 && <p className="text-gray-400 text-[10px]"> {comment.likes.length} {comment.likes.length > 1?"likes": "like"}</p>}
        </div>
      </div>
    </div>
  );
};

export default Comment;
