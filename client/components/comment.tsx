import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import { CommentType } from '@/types/post';
import ReactTimeago from 'react-timeago';

interface CommentProps {
  comment: CommentType;
 
}

const customFormatter = (value: number, unit: string, suffix: string) => {
  const shortUnit = {
    second: "sec",
    minute: "min",
    hour: "hr",
    day: "day",
    week: "wk",
    month: "mo",
    year: "yr",
  }[unit];

  const formattedUnit = value > 1 ? `${shortUnit}s` : shortUnit;

  return `${value} ${formattedUnit} ${suffix}`;
};

const Comment: React.FC<CommentProps> = ({ comment}) => {
  return (
    <div className="flex space-x-3 mb-4">
      <Avatar className="w-8 h-8">
        <AvatarImage src={comment.userDetails.avatar} alt={comment.userDetails.username} />
        <AvatarFallback>{comment.userDetails.username[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <div className="bg-bgHover p-3 rounded-lg">
          <div className="flex justify-between items-start">
            <p className="font-normal text-sm">{comment.userDetails.username}</p>
            <div className="text-[10px] text-gray-400">
              <ReactTimeago date={comment.createdAt} formatter={customFormatter} />
            </div>
            
          </div>
          <p className="mt-1 text-xs first-letter:uppercase">{comment.text}</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm">
            <Heart
              className={`w-4 h-4 mr-1  `}
            />
           3
          </Button>
          <Button variant="ghost" size="sm">
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
