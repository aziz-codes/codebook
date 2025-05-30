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
import { Heart, MoreHorizontal } from "lucide-react";
import { CommentType, Post } from "@/types/post";
import { useRouter } from "next/navigation";
import ReactTimeago from "react-timeago";
import { customFormatter } from "@/utils/utils";
import { deleteRequest, postRequest } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useCustomMutation from "@/hooks/use-custom-mutation";
import { ReportDialog } from "@/modules/reports/report-dialog";
import { commentReportReasons } from "@/utils/report-reasons";

interface CommentProps {
  comment: CommentType;
  isOpen: boolean;
  toggleDropdown: () => void;
  detailed?: boolean;
  post: Post;
}

const CommentDetailed: React.FC<CommentProps> = ({
  comment,
  isOpen,
  toggleDropdown,
  detailed,
  post,
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(false);
  const [reportModal, setReportModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setLiked(comment.likes.includes(session?.user.id as string));
  }, [session?.user.id, comment.likes]);

  const { mutate: deleteComment, isPending } = useMutation({
    mutationFn: async (commentId: string) =>
      await deleteRequest(`/post/comment/${comment.post}`, {
        commentid: commentId,
      }),

    onMutate: async (commentId: string) => {
      await queryClient.cancelQueries({ queryKey: ["comments", comment.post] });

      const previousComments = queryClient.getQueryData<CommentType[]>([
        "comments",
        comment.post,
      ]);

      queryClient.setQueryData<CommentType[]>(
        ["comments", comment.post],
        (old = []) => old.filter((c) => c._id !== commentId)
      );

      return { previousComments };
    },

    onError: (err: any, _commentId: string, context: any) => {
      console.error("Failed to delete comment", err);
      alert("Error deleting comment");

      if (context?.previousComments) {
        queryClient.setQueryData<CommentType[]>(
          ["comments", comment.post],
          context.previousComments
        );
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", comment.post] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDeleteComment = async (commentId: string) => {
    deleteComment(commentId);
  };

  const { mutate: likeComment, isPending: liking } = useMutation({
    mutationFn: (commentId: string) =>
      postRequest(`/post/comment/react/${commentId}`, {
        userid: session?.user.id,
      }),

    onError: (err, variables, context) => {
      console.log("something went wrong");
    },
    onSettled: () => {
      // Always refetch the data after mutation
      queryClient.invalidateQueries({ queryKey: ["comments", comment.post] });
    },
  });

  const handleLikeComment = () => {
    if (liking) return;
    setLiked(!liked);
    likeComment(comment._id);
  };
  const handleReply = (username: string) => {
    console.log(username);
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
      <div className="flex space-x-2 py-2 text-white rounded-lg shadow-sm group ">
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
        <div
          className={`flex-1 ${
            detailed && "bg-bgHover px-3 py-0.5 rounded-md"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p
                className="font-semibold text-slate-300 text-sm cursor-pointer"
                onClick={() => router.push(`/${comment.userDetails.username}`)}
              >
                {comment.userDetails.username}
              </p>
              <div className="text-xs text-gray-400">
                <ReactTimeago
                  date={comment.createdAt}
                  formatter={customFormatter}
                />
              </div>
            </div>
            <DropdownMenu open={isOpen} onOpenChange={toggleDropdown}>
              <DropdownMenuTrigger asChild>
                <MoreHorizontal className="h-4 w-4 text-gray-500 cursor-pointer hover:text-white " />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {comment.userDetails._id !== session?.user.id && (
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-bgHover rounded-md"
                    onClick={() => setReportModal(true)}
                  >
                    Report
                  </DropdownMenuItem>
                )}
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
          <p className="text-sm first-letter:uppercase mt-0.5">
            {comment.text}
          </p>
          <div className="flex items-center space-x-4">
            <Button
              variant="default"
              size="icon"
              className="p-0 bg-transparent hover:bg-transparent w-auto no-underline ring-0 border-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
            >
              <Heart
                className={`h-4 w-4 ${
                  liked
                    ? "fill-red-500 stroke-red-500"
                    : "fill-none stroke-white"
                }`}
                onClick={handleLikeComment}
              />
              {comment.likes.length > 0 && (
                <span className="text-xs text-gray-400 ml-1 no-underline">
                  {comment.likes.length}
                </span>
              )}
            </Button>

            <Button
              variant="link"
              size="sm"
              className="flex items-center space-x-1 text-gray-500 p-0 !no-underline hover:text-white"
              onClick={() => handleReply(comment.userDetails.username)}
            >
              <span className="text-xs">Reply</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentDetailed;
