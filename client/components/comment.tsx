import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { CommentType } from "@/types/post";
import ReactTimeago from "react-timeago";
import { customFormatter } from "@/utils/utils";

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="flex space-x-3 mb-4 w-full ">
      <Avatar className="w-8 h-8">
        <AvatarImage
          src={comment.userDetails.avatar}
          alt={comment.userDetails.username}
        />
        <AvatarFallback>{comment.userDetails.username[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <div className="bg-bgHover px-3 py-2 rounded-lg w-full">
          <div className="flex justify-between items-start">
            <p className="font-semibold text-slate-300 text-sm">
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
           
            <Heart className={`w-4 h-4 mr-1 hover:text-gray-400 transition-all duration-300 ease-linear cursor-pointer  `} />3
           
        </div>
      </div>
    </div>
  );
};

export default Comment;
