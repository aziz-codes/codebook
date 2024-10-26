"use client";
import React, { useState, useRef, useEffect } from 'react';

const EditableContainer: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [parentHeight, setParentHeight] = useState<number>(56); // Default height for `h-14` (56px)
  const divRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.textContent || '');
  };

  useEffect(() => {
    if (divRef.current) {
      const newHeight = divRef.current.scrollHeight; 
      setParentHeight(newHeight > 56 ? newHeight : 56); // Minimum height of 56px (h-14) if empty
    }
  }, [content]);

  return (
    <div
      className="flex flex-col gap-4 w-full max-h-96 min-h-14 flex-1 border overflow-y-auto scrollbar-none transition-all"
      style={{ height: `${parentHeight}px` }}
    >
      <div
        ref={divRef}
        contentEditable
        onInput={handleInput}
        className={`relative p-3 overflow-y-auto w-full rounded-lg focus:outline-none 
          ${content === '' ? 'before:content-[attr(data-placeholder)] before:text-gray-400 before:absolute' : ''}`}
        data-placeholder="What's on your mind today?"
      >
        {/* Editable content */}
      </div>
    </div>
  );
};

export default EditableContainer;
