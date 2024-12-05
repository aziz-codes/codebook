"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar,AvatarFallback,AvatarImage } from "../ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/services";
type User={
    username: string;
    avatar: string;
    id: string;
}
interface LikesResponse{
    success: boolean;
    likes: User[]
}
const LikesPopup = ({ children,post }: { children: React.ReactNode,post:string }) => {
const router = useRouter();
   const {isLoading,data,error} = useQuery<LikesResponse,Error>({
    queryKey: [`likes/${post}`],
    queryFn: async () => await getRequest(`/post/likes/${post}`),
   })


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 h-auto max-h-56 overflow-y-auto shadow-md !border-bgHover">
        <DropdownMenuGroup>
         {isLoading && "Loading"}
         {error && "Error"}
         {!data && "No data"}
         {data?.likes?.map((like)=>(
            <DropdownMenuItem key={like.id} className="hover:!bg-bgHover rounded-md cursor-pointer" onClick={()=>router.push(`/${like.username}`)}>
              <div className="flex items-center gap-2">
                 <Avatar className="h-6 w-6">
                    <AvatarFallback>{like.username[0]}</AvatarFallback>
                    <AvatarImage src={like.avatar} />
 
                 </Avatar>
                <span>{like.username}</span>
              </div>
            </DropdownMenuItem>
         ))}          
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LikesPopup;
