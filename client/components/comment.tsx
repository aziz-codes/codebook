import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import { CommentType } from '@/types/post';

interface CommentProps {
  comment: CommentType;
 
}

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
            <p className="text-xs text-gray-400">{comment.createdAt}</p>
          </div>
          <p className="mt-1 text-xs">{comment.text}</p>
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
