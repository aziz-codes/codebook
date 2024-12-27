"use client";
import { Smile } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useSession } from "next-auth/react";
import ButtonLoader from "@/utils/components/button-loader";
import { postRequest } from "@/services";
import { useQueryClient } from "@tanstack/react-query";
interface CommentProps {
   post_id:string;  
  placeholder?: string;
 
}
const TextBox: React.FC<CommentProps> = ({
  placeholder = "Add a comment",
  post_id
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const[comment,setComment] = useState("");
const {data:session} = useSession();
const queryClient = useQueryClient();
  const handleEmojiSelect = (item: any) => {
    setComment(comment.concat(item.native));
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

    const handleComment = async () => {
       if (comment.trim() === "") {
         return;
       }
       setLoading(true);
       try {
         const payload = {
           user: session?.user.id,
           text: comment.trim(),
           post: post_id,
         };
         await postRequest(`/post/comment/${post_id}`, payload);
         setComment("");
   
         setLoading(false);
         queryClient.invalidateQueries({ queryKey: ["posts"] });
         queryClient.invalidateQueries({ queryKey: [`comments/${post_id}`] });
       } catch (error) {
         console.error("Failed to comment:", error);
         setLoading(false);
       }
     };


  return (
    <>
      <div className="flex justify-between items-center w-full relative">
        <textarea
          placeholder={placeholder}
          ref={inputRef}
          className="resize-none max-h-32 scrollbar-none overflow-y-auto w-full py-2 outline-none bg-transparent text-sm"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ height: "34px" }}
        ></textarea>
        <div className="flex items-center gap-1">
          <Smile
            className="h-4 w-4 cursor-pointer hover:scale-105 transition-all duration-75 ease-linear hover:text-gray-400"
            onClick={() => setOpen((prev) => !prev)}
          />
          {comment.length > 0 &&
            (!loading ? (
              <Button
                variant="link"
                className="!no-underline text-sky-600  p-0 "
                onClick={handleComment}
              >
                {loading ? "laoding" : "Post"}
              </Button>
            ) : (
              <ButtonLoader />
            ))}
        </div>
        {open && (
          <div className="absolute right-4 top-2 z-50">
            <Picker
              data={data}
              navPosition="none"
              onEmojiSelect={handleEmojiSelect}
              previewPosition="none"
              onClickOutside={() => setOpen(false)}
              theme="dark"
              set="Apple"
              emojiSize={12}
              emojiButtonSize={20}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default TextBox;
// test commit