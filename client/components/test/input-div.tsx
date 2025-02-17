"use client";
import React from "react";
import { Textarea } from "../ui/textarea";

interface Props {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const EditableContainer: React.FC<Props> = ({ content, setContent }) => {
  return (
    <Textarea
      placeholder="Share your thoughts."
      rows={1} // Start small
      className="w-full resize-none overflow-y-auto max-h-56 !border-none !outline-none !ring-0 scrollbar-none placeholder:text-gray-400 "
      onChange={(e) => setContent(e.target.value)}
      value={content}
    />
  );
};

export default EditableContainer;
