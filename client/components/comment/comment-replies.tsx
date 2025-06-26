"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Flag, Heart, MoreHorizontal } from "lucide-react";
import { CommentType, Post } from "@/types/post";
import { useRouter } from "next/navigation";
import ReactTimeago from "react-timeago";
import { customFormatter } from "@/utils/utils";
import { deleteRequest, postRequest } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ReportDialog } from "@/modules/reports/report-dialog";
import { commentReportReasons } from "@/utils/report-reasons";
import CommentText from "../comment-text";

interface CommentRepliesProps {
  comment: CommentType;
  post: Post;
  getUsername: (username: string, commentId: string) => void;
  parentComment: string;
}

const CommentReplies: React.FC<CommentRepliesProps> = ({
  comment,
  post,
  getUsername,
  parentComment,
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [liked, setLiked] = useState(false);
  const [reportModal, setReportModal] = useState(false);

  useEffect(() => {
    setLiked(comment.likes.includes(session?.user.id as string));
  }, [session?.user.id, comment.likes]);

  const { mutate: deleteComment, isPending } = useMutation({
    mutationFn: async (commentId: string) =>
      await deleteRequest(`/post/comment/${comment.post}`, {
        commentid: commentId,
      }),

    onMutate: async (commentId: string) => {
      await queryClient.cancelQueries({
        queryKey: ["replies", comment.parentId],
      });
      const previousReplies = queryClient.getQueryData<CommentType[]>([
        "replies",
        comment.parentId,
      ]);
      queryClient.setQueryData<CommentType[]>(
        ["replies", comment.parentId],
        (old = []) => old.filter((c) => c._id !== commentId)
      );
      return { previousReplies };
    },

    onError: (err, _commentId, context: any) => {
      console.error("Failed to delete reply", err);
      if (context?.previousReplies) {
        queryClient.setQueryData<CommentType[]>(
          ["replies", comment.parentId],
          context.previousReplies
        );
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["replies", comment.parentId],
      });

      queryClient.invalidateQueries({ queryKey: ["comments", post._id] });
    },
  });

  const { mutate: likeReply, isPending: liking } = useMutation({
    mutationFn: (commentId: string) =>
      postRequest(`/post/comment/react/${commentId}`, {
        userid: session?.user.id,
      }),
    onError: () => {
      console.log("Failed to like reply");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["replies", comment.parentId],
      });
    },
  });

  const handleLikeReply = () => {
    if (liking) return;
    setLiked(!liked);
    likeReply(comment._id);
  };

  const handleReply = (username: string, commentId: string) => {
    getUsername("@" + username, parentComment);
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId);
  };

  return (
    <>
      {reportModal && (
        <ReportDialog
          isOpen={reportModal}
          onClose={() => setReportModal(false)}
          reportReasons={commentReportReasons}
          comment={comment}
          post={post}
        />
      )}
      <div className="flex items-start space-x-3">
        <Avatar
          className="h-6 w-6"
          onClick={() => router.push(`/${comment.userDetails.username}`)}
        >
          <AvatarImage
            src={comment.userDetails.avatar || "/placeholder.svg"}
            alt={comment.userDetails.username}
          />
          <AvatarFallback>
            {comment.userDetails.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <p
                className="font-semibold text-xs cursor-pointer"
                onClick={() => router.push(`/${comment.userDetails.username}`)}
              >
                {comment.userDetails.username}
              </p>
              <p className="text-xs text-gray-400">
                <ReactTimeago
                  date={comment.createdAt}
                  formatter={customFormatter}
                />
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {comment.userDetails._id !== session?.user.id && (
                  <DropdownMenuItem onClick={() => setReportModal(true)}>
                    <Flag className="mr-2 h-4 w-4" /> Report
                  </DropdownMenuItem>
                )}
                {comment.userDetails._id === session?.user.id && (
                  <DropdownMenuItem
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-500"
                  >
                    {isPending ? "Deleting..." : "Delete"}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(comment.text)}
                >
                  Copy
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <CommentText text={comment.text} />

          <div className="flex items-center space-x-4 mt-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLikeReply}
              className="p-0 h-auto text-xs"
            >
              <Heart
                className={`h-3 w-3 mr-1 ${
                  liked ? "fill-red-500 text-red-500" : "text-white"
                }`}
              />
              {comment.likes.length > 0 && comment.likes.length}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto text-xs"
              onClick={() =>
                handleReply(comment.userDetails.username, comment._id)
              }
            >
              Reply
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentReplies;
