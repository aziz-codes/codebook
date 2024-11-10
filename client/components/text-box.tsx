"use client"
import { Smile } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button';

const TextBox = ({placeholder="Add a comment"}) => {
    const [input, setInput] = useState("");  
    const inputRef = useRef<HTMLTextAreaElement>(null);  
  
    
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
    <div className="flex justify-between items-center w-full ">
      <textarea
        placeholder={placeholder}
        ref={inputRef}
        className="resize-none overflow-hidden w-full p-2 outline-none bg-transparent"
        value={input}
        onChange={(e) => setInput(e.target.value)}  
        style={{ height: "34px" }}  
      ></textarea>
    <div className='flex items-center gap-1'>
    {input.length > 0 && <Button variant="link" className='!no-underline text-sky-600  p-0 '>Post</Button>}
    <Smile className="h-5 w-5 cursor-pointer hover:scale-105 transition-all duration-75 ease-linear hover:text-gray-400" />
    </div>
    </div>
  )
}

export default TextBox