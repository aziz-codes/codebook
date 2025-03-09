"use client";
import React, { useEffect, useRef } from "react";
import { Textarea } from "../ui/textarea";

interface Props {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const EditableContainer: React.FC<Props> = ({ content, setContent }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Focus the input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Textarea
      ref={inputRef}
      placeholder="Share your thoughts."
      rows={1} // Start small
      className="w-full resize-none overflow-y-auto max-h-56 !border-none !outline-none !ring-0 scrollbar-none placeholder:text-gray-400 "
      onChange={(e) => setContent(e.target.value)}
      value={content}
    />
  );
};

export default EditableContainer;
