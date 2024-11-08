"use client";
import React, { useRef, useEffect } from 'react';

interface Props {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const EditableContainer: React.FC<Props> = ({ content, setContent }) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    // Save the HTML content, which includes <br> for line breaks
    setContent(e.currentTarget.innerHTML);
  };

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.height = 'auto'; 
      divRef.current.style.height = `${divRef.current.scrollHeight}px`;
    }
  }, [content]);

  useEffect(()=>{
    divRef.current?.focus();
  },[])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      
      e.preventDefault();
      document.execCommand('insertHTML', false, '<br><br>');
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full h-auto scrollbar-none transition-all">
      <div
        ref={divRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className={`relative p-3 overflow-hidden w-full rounded-lg focus:outline-none resize-none whitespace-pre-wrap
          ${content === '' ? 'before:content-[attr(data-placeholder)] before:text-gray-400 before:absolute' : ''}`}
        data-placeholder="What's on your mind today?"
      ></div>
    </div>
  );
};

export default EditableContainer;
