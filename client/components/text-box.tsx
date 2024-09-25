"use client"
import { Smile } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

const TextBox = () => {
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
    <div className="flex justify-between  px-2 items-center w-full ">
      <textarea
        placeholder="Enter a comment"
        ref={inputRef}
        className="resize-none overflow-hidden w-full p-2 outline-none bg-transparent"
        value={input}
        onChange={(e) => setInput(e.target.value)} // Set input state on change
        style={{ height: "34px" }} // Initial height
      ></textarea>
         <Smile className="cursor-pointer hover:scale-105 transition-all duration-75 ease-linear hover:text-gray-400" />
    </div>
  )
}

export default TextBox