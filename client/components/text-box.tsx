"use client"
import { Smile } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button';
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const TextBox = ({placeholder="Add a comment"}) => {
    const [input, setInput] = useState("");  
    const inputRef = useRef<HTMLTextAreaElement>(null);  
    const [open, setOpen] = useState(false);
    const [emojis, setEmojis] = useState<string[]>([]);  
  
    const handleEmojiSelect = (item: any) => {
      setEmojis((prev) => [...prev, item.native]);  
      setInput(input.concat(item.native))
    };
    
    const adjustHeight = () => {
      if (inputRef.current) {
        inputRef.current.style.height = "34px";  
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;  
      }
    };
  
 
    useEffect(() => {
      adjustHeight();  
    }, [input]);
  return (
    <>
    <div className="flex justify-between items-center w-full relative">
      <textarea
        placeholder={placeholder}
        ref={inputRef}
        className="resize-none overflow-hidden w-full py-2 outline-none bg-transparent text-sm"
        value={input}
        onChange={(e) => setInput(e.target.value)}  
        style={{ height: "34px" }}  
      ></textarea>
    <div className='flex items-center gap-1'>
    <Smile className="h-5 w-5 cursor-pointer hover:scale-105 transition-all duration-75 ease-linear hover:text-gray-400" onClick={()=>setOpen((prev)=>!prev)}/>
    {input.length > 0 && <Button variant="link" className='!no-underline text-sky-600  p-0 '>Post</Button>}
    </div>
    {open && (
        <div className='absolute right-2 top-2'>
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
  )
}

export default TextBox