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
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Flag,
  Heart,
  Loader,
  MoreHorizontal,
} from "lucide-react";
import { CommentType, Post } from "@/types/post";
import { useRouter } from "next/navigation";
import ReactTimeago from "react-timeago";
import { customFormatter } from "@/utils/utils";
import { deleteRequest, getRequest, postRequest } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ReportDialog } from "@/modules/reports/report-dialog";
import { commentReportReasons } from "@/utils/report-reasons";
import CommentText from "./comment-text";
import { Separator } from "@/components/ui/separator";
import CommentReplies from "./comment/comment-replies";

interface CommentProps {
  comment: CommentType;
  isOpen: boolean;
  toggleDropdown: () => void;
  detailed?: boolean;
  post: Post;
  getUsername: (username: string, commentId: string) => void;
}

const getCommentReplies = async (commentId: string) => {
  const data = await getRequest(`/post/comment/replies/${commentId}`);
  if (!data || !data.success) {
    throw new Error("Failed to fetch replies");
  }
  return data.replies;
};

const CommentDetailed: React.FC<CommentProps> = ({
  comment,
  isOpen,
  toggleDropdown,
  detailed,
  post,
  getUsername,
}) => {
  const { data: session } = useSession();
  console.log("comment is ", comment);
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [repliesFetched, setRepliesFetched] = useState(false);
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

  //replies cacehed
  const {
    data: replies = [],
    isLoading: repliesLoading,
    refetch: fetchReplies,
  } = useQuery({
    queryKey: ["replies", comment._id],
    queryFn: () => getCommentReplies(comment._id),
    enabled: false,
  });

  const handleDeleteComment = async (commentId: string) => {
    deleteComment(commentId);
  };

  const { mutate: likeComment, isPending: liking } = useMutation({
    mutationFn: (commentId: string) =>
      postRequest(`/post/comment/react/${commentId}`, {
        userid: session?.user.id,
      }),
    onMutate: async (commentId: string) => {
      // Cancel any outgoing refetches so they don't overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: ["comments", comment.post] });

      // Snapshot current cache
      const previousComments = queryClient.getQueryData<CommentType[]>([
        "comments",
        comment.post,
      ]);

      // Optimistically update the cache
      queryClient.setQueryData<CommentType[]>(
        ["comments", comment.post],
        (oldComments) => {
          if (!oldComments) return [];

          return oldComments.map((c) => {
            if (c._id === comment._id) {
              const alreadyLiked = c.likes.includes(session?.user.id || "");
              const newLikes = alreadyLiked
                ? c.likes.filter((id) => id !== session?.user.id)
                : [...c.likes, session?.user.id!];

              return {
                ...c,
                likes: newLikes, // this is now string[]
              };
            }
            return c;
          });
        }
      );

      return { previousComments };
    },

    onError: (err, _variables, context) => {
      console.error("Something went wrong");
      // Revert to previous state
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["comments", comment.post],
          context.previousComments
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", comment.post] });
    },
  });

  const handleLikeComment = () => {
    setLiked(!liked);
    if (liking) return;
    likeComment(comment._id);
  };

  const handleReply = (username: string, commentId: string) => {
    getUsername("@" + username, commentId);
  };

  const handleFetchCommentReplies = async () => {
    if (!showReplies && !repliesFetched) {
      await fetchReplies();
      setRepliesFetched(true);
    }
    setShowReplies(!showReplies);
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

      <div className="space-y-2 py-3">
        {/* <Separator /> */}

        {/* Comment block */}
        <div className="flex items-start space-x-3">
          <Avatar
            className="h-8 w-8"
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
            <div className="flex items-center space-x-2 mb-1 justify-between">
              <div className="flex items-center gap-4">
                <p
                  className="font-semibold text-sm cursor-pointer"
                  onClick={() =>
                    router.push(`/${comment.userDetails.username}`)
                  }
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
              <DropdownMenu open={isOpen} onOpenChange={toggleDropdown}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {comment.userDetails._id !== session?.user.id && (
                    <DropdownMenuItem onClick={() => setReportModal(true)}>
                      Report
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
                onClick={handleLikeComment}
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

              {comment.replies > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFetchCommentReplies}
                  className="p-0 h-auto text-xs text-muted-foreground"
                >
                  {showReplies ? (
                    <>
                      <ChevronUp className="h-3 w-3 mr-1" />
                      Hide replies
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3 mr-1" />
                      View replies ({comment.replies})
                    </>
                  )}
                </Button>
              )}
            </div>
            {repliesLoading && (
              <div className="flex items-center justify-center mt-2">
                <Loader className="h-5 w-5 animate-spin" />
              </div>
            )}
            {/* Replies Section */}
            {showReplies && (
              <div className="ml-11 space-y-2 border-l-2 border-muted pl-4 mt-2">
                {replies.reverse().map((reply: any) => (
                  <CommentReplies
                    key={reply._id}
                    comment={reply}
                    parentComment={comment._id}
                    post={post}
                    getUsername={getUsername}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentDetailed;
