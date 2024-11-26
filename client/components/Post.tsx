"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis, Heart } from "lucide-react";
import TimeAgo from "react-timeago";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AnimatePresence, motion } from "framer-motion";
import HeartSvg from "@/helpers/heart-svg";
import CommentSvg from "@/helpers/comment-svg";
import { useRouter } from "next/navigation";
import BookmarkSvg from "@/helpers/bookmark-svg";
import TextBox from "./text-box";
import { postRequest,getRequest } from "@/services/index";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommentType, Post } from "@/types/post";
import PostDropdown from "./custom/post-dropdown";

 import Comment from '@/components/comment'
 

type PostProps = {
  post: Post;
  sessionId: string;
};

const SinglePost: FC<PostProps> = ({ post, sessionId }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const postLikes = post.likes.map((like)=>like.user)
  const [liked, setLiked] = useState<null | boolean>(null);
  useEffect(()=>{
    setLiked(postLikes.includes(sessionId))
  },[sessionId]);
  
  const [open, setOpen] = useState(false);
  const [openCommentBox, setCommentBox] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  // handle like functionality
  const handleLike = async (postId: string) => {
    const isCurrentlyLiked = liked;
    if (loading) return;

    setLikes((prev) => (isCurrentlyLiked ? prev - 1 : prev + 1));
    setLiked(!isCurrentlyLiked);

    try {
      setLoading(true);
      await postRequest(`/post/like/${postId}`, { userId: sessionId });
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    } catch (error) {
      console.error("Failed to update likes:", error);
      setLikes((prev) => (isCurrentlyLiked ? prev + 1 : prev - 1));
      setLiked(isCurrentlyLiked);
      setLoading(false);
    }
  };

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
  useEffect(() => {
    document.body.classList.remove("pointer-events-none");
    document.body.style.pointerEvents = "";
  }, [open]);

  const handleComment = async () => {
    if (comment.trim() === "") {
      return;
    }
    setLoading(true);
    try {
      const payload = {
        user: sessionId,
        text: comment.trim(),
        post: post._id,
      };
      await postRequest(`/post/comment/${post._id}`, payload);
      setComment("");
      setCommentBox(false);
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    } catch (error) {
      console.error("Failed to comment:", error);
      setLoading(false);
    }
  };
  

  // fetching comments for each post.

  const { data:comments, error, isLoading } = useQuery<CommentType[],Error>({
    queryKey: [`comments/${post._id}`],
    queryFn: async () => await getRequest(`/post/comment/${post._id}`),
  });

 


  return (
    <Card className="rounded-md !border-none mb-4 group">
      {/* User Info and Action Button */}
      <div className="flex justify-between items-center px-4 py-4">
        <div className="flex items-center gap-1.5">
          <Avatar
            className="cursor-pointer"
            onClick={() => router.push(`user/${post.user.username}`)}
          >
            <AvatarFallback>{post.user.name.slice(0, 2)}</AvatarFallback>
            <AvatarImage src={post.user.avatar} />
          </Avatar>
          <div className="flex flex-col -space-y-0.5">
            <p
              className="text-sm font-semibold cursor-pointer text-white"
              onClick={() => router.push(`user/${post.user.username}`)}
            >
              {post.user.username} 
            </p>

            <div className="text-[10px] text-gray-400">
              <TimeAgo date={post.createdAt} formatter={customFormatter} />
            </div>
          </div>
        </div>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Ellipsis
              className="cursor-pointer hover:text-gray-400"
              onClick={() => setOpen(true)}
            />
          </DropdownMenuTrigger>

          <PostDropdown
            isPostOwner={isPostOwner}
            post={post._id}
            setOpen={setOpen}
          />
        </DropdownMenu>
      </div>
      <CardContent className="p-0">
        {/* Post Content */}
        <div className="mb-4 px-4">
          <p
            className="text-gray-300 first-letter:capitalize"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="w-full h-96 overflow-hidden">
            <img
              src={post.image}
              alt="Post"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="px-3 py-3 flex items-center justify-between select-none border-t">
          <div className="flex items-center space-x-1 text-sm relative">
            <HeartSvg
              stroke={liked ? "red" : "white"}
              fill={liked ? "red" : "none"}
              onClick={() => handleLike(post._id)}
              className="w-6 h-6 cursor-pointer"
            />
            <span className="text-xs">
              {likes > 0 ? likes : null}
              {likes < 1 ? " " : likes === 1 ? " Like" : " Likes"}
            </span>
          </div>

          <div className="flex items-center space-x-1 cursor-pointer text-sm">
            <CommentSvg
              className="w-6 h-6 cursor-pointer"
              onClick={() => setCommentBox(!openCommentBox)}
            />
            <span className="text-xs hover:underline">
              {post.commentCount < 1 ? null : post.commentCount}{" "}
              {post.commentCount < 1 ? " Comment" : " Comments"}
            </span>
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
              <div className="px-3">
                <h4 className="text-sm mt-1 mb-2">comments are {comments?.length}</h4>
                {isLoading && "Loading comments"}
                {comments?.map((comment, index) => (
                  <Comment comment={comment} key={index}   />
                ))}
              </div>
              <div className="flex w-full items-center border-b rounded-md px-3">
                <TextBox
                  comment={comment}
                  setComment={setComment}
                  onComment={handleComment}
                  loading={loading}
                />
              </div>
            </CardFooter>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default SinglePost;
