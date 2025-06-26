import Link from "next/link";
import React from "react";

interface CommentTextProps {
  text: string;
}

const CommentText: React.FC<CommentTextProps> = ({ text }) => {
  const parts = text.split(/(\s+)/).map((part, index) => {
    // Match @mentions
    if (/^@\w+/.test(part)) {
      return (
        <Link
          href={`/${part.slice(1)}`}
          key={index}
          className="text-sky-500 font-medium"
        >
          {part}
        </Link>
      );
    }
    return <span key={index}>{part}</span>;
  });

  return <p className="text-sm leading-relaxed">{parts}</p>;
};

export default CommentText;
