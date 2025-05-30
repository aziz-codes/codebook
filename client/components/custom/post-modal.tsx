"use client";
import React, { useState } from "react";
import { DialogHeader } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Image from "next/image";
import { Post, CommentType } from "@/types/post";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ReactTimeago from "react-timeago";
import { customFormatter } from "@/utils/utils";
import TextBox from "../text-box";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/services";
import CommentDetailed from "../comment-detailed";
import ModalCommentSkeleton from "@/skeletons/modal-comments-skeleton";

interface Props {
  post: Post;
  children?: React.ReactNode;
  open: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostModal: React.FC<Props> = ({ open, post, setter }) => {
  const router = useRouter();
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const {
    data: comments,
    error,
    isLoading,
  } = useQuery<CommentType[], Error>({
    queryKey: [`comments/${post._id}`],
    queryFn: async () => await getRequest(`/post/comment/${post._id}`),
  });
  const toggleDropdown = (commentId: string) => {
    setActiveDropdownId((prevId) => (prevId === commentId ? null : commentId));
  };

  return (
    <AlertDialog open={open} onOpenChange={setter}>
      <AlertDialogContent className="sm:max-w-[425px] md:max-w-6xl px-0 ">
        <DialogHeader></DialogHeader>

        <AlertDialogCancel
          // ref={cancelRef}
          className="flex justify-center h-7 w-7 !outline-none border-none !focus:ring-0 !ring-0  hover:bg-bgHover cursor-pointer items-center p-0 !border-0 absolute top-2 right-2 rounded-full"
          // onClick={handleCancel}
        >
          <X className="h-5 w-5" />
        </AlertDialogCancel>
        <div className="w-full flex gap-0 h-[85vh] ">
          <div className="relative w-full h-full  overflow-hidden rounded-md px-3">
            <Image
              src={post.image}
              alt="post thumbnail"
              fill
              className="absolute w-full h-full object-cover blur-md -z-10"
            />
            <Image
              src={post.image}
              alt="post thumbnail"
              fill
              className="w-full h-auto object-contain rounded-3xl z-10"
            />
          </div>
          {/* right side  */}
          <div className="w-full max-w-md  flex flex-col  gap-3">
            <div className="flex items-center gap-1.5 px-4">
              <Avatar
                className="cursor-pointer"
                onClick={() => router.push(`${post.user.username}`)}
              >
                <AvatarFallback>{post.user.name.slice(0, 2)}</AvatarFallback>
                <AvatarImage src={post.user.avatar} />
              </Avatar>
              <div className="flex flex-col -space-y-0.5">
                <p
                  className="text-sm font-semibold cursor-pointer text-white"
                  onClick={() => router.push(`/${post.user.username}`)}
                >
                  {post.user.username}
                </p>

                <div className="text-[10px] text-gray-400">
                  <ReactTimeago
                    date={post.createdAt}
                    formatter={customFormatter}
                  />
                  &nbsp;ago
                </div>
              </div>
            </div>
            <div className="h-auto max-h-24 pb-4 text-sm border-b px-4">
              {post.title}
            </div>
            <div className=" flex-1 flex flex-col gap-2 max-h-full overflow-y-auto scrollbar-none px-4">
              {isLoading &&
                Array.from({ length: 8 }).map((_, index) => (
                  <ModalCommentSkeleton key={index} />
                ))}
              {comments?.length === 0 && (
                <div className="flex items-center h-full justify-center text-xl font-bold">
                  No comments yet !
                </div>
              )}
              {comments?.map((comment, index) => (
                <CommentDetailed
                  comment={comment}
                  key={index}
                  isOpen={activeDropdownId === comment._id}
                  toggleDropdown={() => toggleDropdown(comment._id)}
                  post={post}
                />
              ))}
            </div>
            <div className=" px-4">
              <div className="flex w-full items-center border-b rounded-md  border px-2">
                <TextBox post_id={post._id} />
              </div>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PostModal;
