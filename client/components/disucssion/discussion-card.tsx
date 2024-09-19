import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { CircleCheck, MessageCircle } from "lucide-react";

import Chip from "../custom/chip";
interface Discussion{
  avatar: string;
  description: string;
  tags:string[];
  comments: number;
  date: string;
  isAnswered: boolean;
}
interface DiscussionProps{
  item: Discussion
}
const DiscussionCard:React.FC<DiscussionProps> = ({item}) => {
  return (
    <div className="flex flex-col gap-3 px-2 pt-2 border-b  cursor-pointer shadow-2xl border rounded-md">
       
        <div className="w-full flex flex-col gap-2">
        {/* first row */}
        <div className="flex items-start gap-2">
          <Avatar className="rounded-none">
            <AvatarFallback>AZ</AvatarFallback>
            <AvatarImage src={item.avatar} alt="az" />
          </Avatar>
          <div className="flex flex-col gap-1">
          <Label className="text-sm line-clamp-2">
            {item.description}
          </Label>
          <div className="flex items-center space-x-2">
            {item.tags.map((tag)=>(

            <Chip text={tag} key={tag}/>
            ))}
           
          </div>
          </div>
        </div>
        <div className="flex gap-8 items-center justify-between">
          <Button
            variant="link"
            className="text-sm m-0 p-0  flex gap-0.5 text-gray-400 items-center"
          >
            <MessageCircle className="h-5" />
            {item.comments} comments
          </Button>

          <Label className="text-gray-400 text-sm ">{item.date}</Label>
         <div className="flex items-center text-xs space-x-2 italic">
         <CircleCheck className={`h-5 ${item.isAnswered && 'text-green-400'}`}/> <span>{item.isAnswered ? "Answered": "Unanswered"}</span>
         </div>
        </div>
      </div>
      
    </div>
  );
};

export default DiscussionCard;
