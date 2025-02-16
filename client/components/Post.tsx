"use client";
import React, { FC, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis, Minimize2 } from "lucide-react";
import TimeAgo from "react-timeago";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AnimatePresence, motion } from "framer-motion";
import HeartSvg from "@/helpers/heart-svg";
import CommentSvg from "@/helpers/comment-svg";
import { useRouter } from "next/navigation";
import BookmarkSvg from "@/helpers/bookmark-svg";
import TextBox from "./text-box";
import { postRequest, getRequest } from "@/services/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommentType, Post } from "@/types/post";
import PostDropdown from "./custom/post-dropdown";

import Comment from "@/components/comment";
import { customFormatter } from "@/utils/utils";

import LikesPopup from "./custom/likes-popup";
import Image from "next/image";
import PostModal from "./custom/post-modal";
import CommentDetailed from "./comment-detailed";

type PostProps = {
  post: Post;
  sessionId: string;
  isSingleRoute?: boolean;
};
type GetPostsResponse = {
  count: number;
  result: Post[];
};

type GetSinglePostResponse = {
  count: number;
  result: Post;
};

const SinglePost: FC<PostProps> = ({
  post,
  sessionId,
  isSingleRoute = false,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [openPostModal, setPostModelOpen] = useState(false);

  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [openCommentBox, setCommentBox] = useState(isSingleRoute);

  const toggleDropdown = (commentId: string) => {
    setActiveDropdownId((prevId) => (prevId === commentId ? null : commentId));
  };
  // handle like functionality

  const { mutate: toggleLike } = useMutation({
    mutationFn: async (postId: string) => {
      return await postRequest(`/post/like/${postId}`, {
        userId: sessionId,
      });
    },
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      await queryClient.cancelQueries({ queryKey: ["posts", postId] });

      const previousPosts = queryClient.getQueryData<GetPostsResponse>([
        "posts",
      ]);
      const previousSinglePost =
        queryClient.getQueryData<GetSinglePostResponse>(["posts", postId]); // ✅ Corrected

      // Optimistically update the posts list
      queryClient.setQueryData<GetPostsResponse>(["posts"], (old) => {
        if (!old) return { count: 0, result: [] };
        return {
          ...old,
          result: old.result.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  isLiked: !post.isLiked,
                  likeCount: post.isLiked
                    ? post.likeCount - 1
                    : post.likeCount + 1,
                }
              : post
          ),
        };
      });

      // Optimistically update the single post
      queryClient.setQueryData<GetSinglePostResponse>(
        ["posts", postId],
        (old) => {
          if (!old || !old.result) return old;

          return {
            ...old,
            result: {
              ...old.result,
              isLiked: !old.result.isLiked,
              likeCount: Math.max(
                0,
                Number(old.result.likeCount) + (old.result.isLiked ? -1 : 1)
              ),
            },
          };
        }
      );

      return { previousPosts, previousSinglePost };
    },
    onError: (_err, _postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
      if (context?.previousSinglePost) {
        queryClient.setQueryData(
          ["posts", post._id],
          context.previousSinglePost
        ); // ✅ Fixed here
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // queryClient.invalidateQueries({ queryKey: ["posts", post._id] });
    },
  });

  const handleLike = async (postId: string) => {
    toggleLike(postId);
  };

  const isPostOwner = post.user._id === sessionId;

  useEffect(() => {
    document.body.classList.remove("pointer-events-none");
    document.body.style.pointerEvents = "";
  }, [open]);

  // fetching comments for each post.

  const {
    data: comments,
    error,
    isLoading,
  } = useQuery<CommentType[], Error>({
    queryKey: [`comments/${post._id}`],
    queryFn: async () => await getRequest(`/post/comment/${post._id}`),
  });

  const postIsBookmarked = true;

  return (
    <Card className="rounded-md !border-none mb-4 group ">
      {/* User Info and Action Button */}
      <div className="flex justify-between items-center px-4 py-4">
        <div className="flex items-center gap-1.5 select-none">
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
          <div className="w-full h-auto max-h-[500px] aspect-square overflow-hidden relative ">
            <Image
              src={post.image}
              alt="Post"
              fill
              className="object-cover rounded-sm"
              onClick={() => setPostModelOpen(true)}
            />
          </div>
        )}
        {openPostModal && (
          <PostModal
            open={openPostModal}
            post={post}
            setter={setPostModelOpen}
          />
        )}

        <div className="px-3 py-1.5 flex items-center justify-between select-none border-t">
          <div className="flex items-center space-x-1 text-sm relative mt">
            <HeartSvg
              stroke={post.isLiked ? "red" : "white"}
              fill={post.isLiked ? "red" : "none"}
              onClick={() => handleLike(post._id)}
              className="w-6 h-6 cursor-pointer"
            />

            <LikesPopup post={post._id}>
              <span className="text-xs cursor-pointer">
                {post.likeCount > 0 ? post.likeCount : null}
                {post.likeCount < 1
                  ? " "
                  : post.likeCount === 1
                  ? " Like"
                  : " Likes"}
              </span>
            </LikesPopup>
          </div>

          <div
            className={`flex items-center space-x-1 cursor-pointer text-sm  ${
              !isSingleRoute && "hover:bg-bgHover"
            } px-2 py-1 rounded-md transition-colors duration-200`}
            onClick={() => {
              if (!isSingleRoute) {
                setCommentBox(!openCommentBox);
              }
            }}
          >
            <CommentSvg className="w-6 h-6 cursor-pointer    transition-colors duration-200" />
            <span className="text-xs     transition-all duration-200">
              {post.commentCount < 1
                ? null
                : post.commentCount ?? post.comments?.length}
              {post.commentCount < 1 ? " Comment" : " Comments"}
            </span>
          </div>

          <div className="flex items-center space-x-2 cursor-pointer">
            <BookmarkSvg
              className="w-6 h-6 cursor-pointer"
              fill={postIsBookmarked ? "white" : ""}
            />
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
              <div className="px-3 w-full">
                {isSingleRoute && (
                  <div className="flex w-full items-center mb-4 border-b px-2 my-4">
                    <TextBox post_id={post._id} />
                  </div>
                )}

                {comments && comments.length > 0 && (
                  <h4 className="text-xs mt-1 mb-2 text-gray-400">comments</h4>
                )}

                {isLoading && "Loading comments"}
                {comments &&
                  comments
                    ?.slice(0, isSingleRoute ? comments.length : 2)
                    .map((comment, index) =>
                      isSingleRoute ? (
                        <CommentDetailed
                          comment={comment}
                          key={index}
                          isOpen={activeDropdownId === comment._id}
                          toggleDropdown={() => toggleDropdown(comment._id)}
                        />
                      ) : (
                        <Comment comment={comment} key={index} />
                      )
                    )}

                {!isSingleRoute && comments && comments.length > 2 && (
                  <div
                    className="text-center flex items-center justify-center -mt-2 pb-3 px-2 py-1.5 rounded-md text-xs cursor-pointer"
                    onClick={() => {
                      if (post?.image) {
                        setPostModelOpen(true);
                      } else {
                        router.push(`/p/${post._id}`);
                      }
                    }}
                  >
                    <span className="hover:underline">
                      view all {comments.length} comments
                    </span>
                  </div>
                )}
              </div>

              {!isSingleRoute && (
                <div className="flex w-full items-center px-3">
                  <TextBox post_id={post._id} />
                </div>
              )}
            </CardFooter>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default SinglePost;
