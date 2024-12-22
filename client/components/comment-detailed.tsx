"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, MoreHorizontal } from "lucide-react";
import { CommentType } from "@/types/post";
import { useRouter } from "next/navigation";
import ReactTimeago from "react-timeago";
import { customFormatter } from "@/utils/utils";
import { deleteRequest, postRequest } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface CommentProps {
  comment: CommentType;
  isOpen: boolean;
  toggleDropdown: () => void;
}

const CommentDetailed: React.FC<CommentProps> = ({
  comment,
  isOpen,
  toggleDropdown,
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(comment.likes?.includes(session?.user.id as string));
  const [likes, setLikes] = useState(comment.likes.length);
  const router = useRouter();

  const deleteReq = async (commentId: string): Promise<void> => {
    const res = await deleteRequest(`/post/comment/${comment.post}`, {
      commentid: commentId,
    });
    if (!res.ok) {
      throw new Error("Failed to delete comment");
    }
  };

  const { mutate: deleteComment, isPending } = useMutation({
    mutationFn: (commentId: string) => deleteReq(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`comments/${comment.post}`],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: () => {
      console.error("Failed to delete comment");
    },
  });

  const handleDeleteComment = async (commentId: string) => {
    deleteComment(commentId);
  };

  const { mutate: likeComment } = useMutation({
    mutationFn: (commentId: string) => postRequest(`/post/comment/react/${commentId}`, { userid: session?.user.id }),
    onMutate: (commentId: string) => {
      // Cache the previous comments data to roll back if needed
      const previousData = queryClient.getQueryData([`comments/${comment.post}`]);

      // Optimistically update the like status
      queryClient.setQueryData([`comments/${comment.post}`], (oldData: any) => {
        return oldData.map((item: CommentType) => {
          if (item._id === commentId) {
            return {
              ...item,
              likes: liked
                ? item.likes.filter((id: string) => id !== session?.user.id)
                : [...item.likes, session?.user.id],
            };
          }
          return item;
        });
      });

      // Return context to roll back on failure
      return { previousData };
    },
    onError: (err, variables, context) => {
      // Rollback the optimistic update if the mutation fails
      queryClient.setQueryData([`comments/${comment.post}`], context?.previousData);
    },
    onSettled: () => {
      // Always refetch the data after mutation
      queryClient.invalidateQueries({queryKey:[`comments/${comment.post}`]});
    },
  });

  const handleLikeComment = () => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);
    likeComment(comment._id);
  };

  return (
    <div className="flex space-x-2 py-2 text-white rounded-lg shadow-sm group">
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
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p
            className="font-semibold text-slate-300 text-sm cursor-pointer"
            onClick={() => router.push(`/${comment.userDetails.username}`)}
          >
            {comment.userDetails.username}
          </p>
          <DropdownMenu open={isOpen} onOpenChange={toggleDropdown}>
            <DropdownMenuTrigger asChild>
              <MoreHorizontal className="h-4 w-4 text-gray-500 cursor-pointer hover:text-white " />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer hover:bg-bgHover rounded-md">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-bgHover rounded-md">
                Report
              </DropdownMenuItem>
              {comment.userDetails._id === session?.user.id && (
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-bgHover rounded-md text-red-500"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  {isPending ? "Loading..." : "Delete"}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-xs first-letter:uppercase">{comment.text}</p>
        <div className="flex items-center space-x-4">
          <div className="text-xs text-gray-400">
            <ReactTimeago
              date={comment.createdAt}
              formatter={customFormatter}
            />
          </div>
          <Button variant="link" size="icon" className="!p-0 !w-auto !no-underline">
            <Heart className={`h-4 w-4 ${liked && "fill-red-500 stroke-red-500"}`} onClick={handleLikeComment} />
            {comment.likes.length > 0 && (
              <span className="text-xs text-gray-400 ml-1 no-underline">{likes}</span>
            )}
          </Button>

          <Button
            variant="link"
            size="sm"
            className="flex items-center space-x-1 text-gray-500 p-0 !no-underline hover:text-white"
          >
            <span className="text-xs">Reply</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentDetailed;


// 3000 contributions comepleted