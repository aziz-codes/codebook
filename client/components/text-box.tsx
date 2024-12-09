"use client";
import { Smile } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import ButtonLoader from "@/utils/components/button-loader";
interface CommentProps{
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>
  onComment: ()=>void;
  placeholder?: string;
  loading: boolean;
}
const TextBox:React.FC<CommentProps>= ({ placeholder = "Add a comment",comment,setComment,onComment,loading}) => {
 
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState(false);

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
  return (
    <>
      <div className="flex justify-between items-center w-full relative">
        <textarea
          placeholder={placeholder}
          ref={inputRef}
          className="resize-none overflow-hidden w-full py-2 outline-none bg-transparent text-sm"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ height: "34px" }}
        ></textarea>
        <div className="flex items-center gap-1">
          <Smile
            className="h-4 w-4 cursor-pointer hover:scale-105 transition-all duration-75 ease-linear hover:text-gray-400"
            onClick={() => setOpen((prev) => !prev)}
          />
          {comment.length > 0 && (
           !loading ? <Button variant="link" className="!no-underline text-sky-600  p-0 " onClick={onComment}>
              {loading? "laoding":"Post"}
            </Button> : <ButtonLoader />
          )}
        </div>
        {open && (
          <div className="absolute right-2 top-2">
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
