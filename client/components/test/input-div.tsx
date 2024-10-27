"use client";
import React, { useState, useRef, useEffect } from 'react';

const EditableContainer: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const divRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.textContent || '');
  };

  useEffect(() => {
    if (divRef.current) {
       
      divRef.current.style.height = 'auto'; 
      divRef.current.style.height = `${divRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <div className="flex flex-col gap-4 w-full h-auto  scrollbar-none transition-all">
      <div
        ref={divRef}
        contentEditable
        onInput={handleInput}
        className={`relative p-3 overflow-hidden w-full rounded-lg focus:outline-none resize-none
          ${content === '' ? 'before:content-[attr(data-placeholder)] before:text-gray-400 before:absolute' : ''}`}
        data-placeholder="What's on your mind today?"
      ></div>
    </div>
  );
};

export default EditableContainer;
