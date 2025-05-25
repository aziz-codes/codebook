"use client";
import { Smile } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // ShadCN Popover
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useSession } from "next-auth/react";
import ButtonLoader from "@/utils/components/button-loader";
import { postRequest } from "@/services";
import { useQueryClient } from "@tanstack/react-query";
import { CommentType } from "@/types/post";

interface CommentProps {
  post_id: string;
  placeholder?: string;
}

const TextBox: React.FC<CommentProps> = ({
  placeholder = "Add a comment",
  post_id,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const handleEmojiSelect = (item: any) => {
    setComment(comment.concat(item.native));
    setOpen(false); // Close popover after selecting emoji
  };

  const adjustHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "34px";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [comment]);

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim() === "") return;

    const tempId = crypto.randomUUID(); // temporary ID
    const newComment: CommentType = {
      _id: tempId,
      post: post_id,
      text: comment.trim(),
      likes: [],
      createdAt: new Date().toISOString(),
      userDetails: {
        _id: session?.user.id as string,
        username: session?.user.username as string,
        avatar: session?.user.image as string,
      },
    };

    // Optimistically update the comments
    queryClient.setQueryData<CommentType[]>(
      ["comments", post_id],
      (old = []) => [newComment, ...old]
    );

    setComment(""); // Clear the input immediately
    setLoading(true);

    try {
      const payload = {
        user: session?.user.id,
        text: comment.trim(),
        post: post_id,
      };

      await postRequest(`/post/comment/${post_id}`, payload);

      // Optional: revalidate to get updated comment with real _id
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["comments", post_id] });
    } catch (error) {
      console.error("Failed to comment:", error);

      // Rollback optimistic update
      queryClient.setQueryData<CommentType[]>(
        ["comments", post_id],
        (old = []) => old.filter((c) => c._id !== tempId)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center w-full relative gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Smile className="h-4 w-4 cursor-pointer hover:scale-105 transition-all duration-75 ease-linear hover:text-gray-400" />
        </PopoverTrigger>
        <PopoverContent className="!p-0 w-full max-w-xs">
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme="dark"
            previewPosition="none"
            emojiSize={20}
            emojiButtonSize={32}
          />
        </PopoverContent>
      </Popover>

      <form onSubmit={handleComment} className="flex items-center   flex-1">
        <textarea
          ref={inputRef}
          placeholder={placeholder}
          className="resize-none max-h-32 scrollbar-none overflow-y-auto w-full py-2 outline-none bg-transparent text-sm"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              const form = e.currentTarget.form;
              if (form) {
                form.requestSubmit(); // triggers onSubmit
              }
            }
          }}
          style={{ height: "34px" }}
        ></textarea>
        <div className="flex items-center gap-1">
          {comment.length > 0 &&
            (!loading ? (
              <Button
                variant="link"
                className="!no-underline text-sky-600  p-0"
                type="submit"
              >
                Post
              </Button>
            ) : (
              <ButtonLoader />
            ))}
        </div>
      </form>
    </div>
  );
};

export default TextBox;

// this branch will keep the next js 14 and react 18 version.
