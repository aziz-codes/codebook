"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { UserProfileType } from "@/types/user";
import { UsersRound } from "lucide-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteRequest, postRequest } from "@/services";
import { useToast } from "@/hooks/use-toast";
import ButtonLoader from "@/utils/components/button-loader";
import { useParams } from "next/navigation";
type ProfileCardProps = {
  profile: UserProfileType;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ profile: user }) => {
  const {toast} = useToast();
  const {username} = useParams();
  const { data: session } = useSession();
 
  const queryClient = useQueryClient();
  const payload = {
    followerId: session?.user.id
  }
  const deleteFollower = async(id:string)=>{
    if(!id) return;
    
    await deleteRequest(`/user/unfollow/${id}`,payload)
  }
  // mutation for unfollowing
  const {mutate:Unfollow,isPending:unFollowLoading} = useMutation({
    mutationFn: deleteFollower,
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ["userProfile", username] });
 
    },
    onError: (error) => {
      console.log(error);
       toast({
        description: "Something went wrong, please try again",
         })  
      }
  })
  
  const postFollower =async(id:string)=>{
     if(!id) return;
    
     await postRequest(`/user/follow/${id}`,payload)
  }
  // mutation for following
    const {mutate,isPending:followLoading} = useMutation({
      mutationFn: postFollower,
      onSuccess:()=>{
        queryClient.invalidateQueries({ queryKey: ["userProfile", username] });
       
      },
      onError: (error) => {
         toast({
          description: "Something went wrong, please try again",
        
         })
         
      }
    })
  // Function to handle follow button click
  const handleFollow = async (id:string) => {
    mutate(id)
  };
    const handleUnFollow = (id:string)=>{
     Unfollow(id) 
  }

  const stats = [
    {
      name: "Posts",
      count: user.postCount,
    },
    {
      name: "Discussions",
      count: "08",
    },
    {
      name: "Snippets",
      count: user.snippetCount,
    },
    {
      name: "Bounties",
      count: "12/4",
    },
  ];
  const isFollowing = user.followers.some(item => item.followerId === session?.user.id);


  return (
    <div className="bg-bgCard w-full rounded-md px-4 py-4 grid grid-cols-12 gap-2">
      <div className="col-span-12 md:col-span-3 flex flex-col  p-4 justify-center items-center">
        <Avatar className="rounded-full md:rounded-md h-44 w-44">
          <AvatarFallback>
            {user.user.name?.charAt(0)}
            {user.user.name?.charAt(1)}
          </AvatarFallback>
          <AvatarImage src={user.user.avatar} />
        </Avatar>
        <div className="py-3 text-center">
          <Label className="text-center text-sm font-semibold capitalize">
            {user.user.name}
          </Label>
          <div className="flex items-center gap-1 mt-2">
            <UsersRound className="h-4 w-4 text-gray-400" />
            <div className="flex text-xs space-x-1">
              <h4 className="font-semibold">{user.followers.length}</h4>
              <p className="text-gray-400 text-xs">{user.followers.length > 1 ?"Followers":"Follower"}</p>
            </div>
            <div className="flex text-xs space-x-1">
              <h4 className="font-semibold">{user.following}</h4>
              <p className="text-gray-400 text-xs">Following</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-7 overflow-hidden p-4 flex flex-col gap-5 items-center md:items-start">
        <div className="flex gap-2 items-center space-x-6 flex-wrap">
          {stats.map((stat) => (
            <div className="flex flex-col space-y-1" key={stat.name}>
              <Label className="font-[400]">{stat.name}</Label>
              <p className="text-center text-sm font-semibold">{stat.count}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-400">{user.user.username}</p>
          <Label className="font-[400]">{user.user.tagline}</Label>
          <Label
            className="line-clamp-3 font-normal leading-5 max-w-xs text-xs py-2"
            dangerouslySetInnerHTML={{
              __html: user.user.bio.replace(/\n/g, "<br>").slice(0, 165),
            }}
          />
        </div>
        <div className="flex items-center space-x-4 max-w-xs">
          {user.user.username === session?.user.username ? (
            <button className="px-8 py-1.5 rounded-md bg-bgHover">
              Edit Profile
            </button>
          ) : (
            <>
             {isFollowing ? <Button
                size="sm"
                variant="secondary"
                className="flex-1"
                onClick={()=>handleUnFollow(user.user._id)}
                
              >
               {unFollowLoading? <ButtonLoader />: "Following"}
               
              </Button>: <Button
                size="sm"
                variant="secondary"
                className="flex-1"
                onClick={()=>handleFollow(user.user._id)}
                
              >
               {followLoading? <ButtonLoader />: "Follow"}
               
              </Button>}
              <Button size="sm" variant="secondary" className="flex-1">
                Message
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
