"use client";
import React from "react";
import Post from "@/components/Post";
import MainWrapper from "@/layouts/main-wrapper";
import { topMargin } from "@/utilities";
import Create from "@/components/create";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/services";
import { useSession } from "next-auth/react";
import PostSkeleton from "@/skeletons/post-skeleton";
 

 
type User = {
  _id: string;
  name: string;
  avatar: string;
  username: string;
};
type Like={
  userIds: string[];
  count: number;
}
type PostData = {
  _id: string;
  user: User;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  likes: Like;
  commentCount: number;
};

type GetPostsResponse = {
  count: number;
  result: PostData[];
};

const HomePage = () => {
  const {data:session} = useSession();
  const { data, error, isLoading } = useQuery<GetPostsResponse, Error>({
    queryKey: ["posts"],
    queryFn: async () => await getRequest("/postss"),
  });
 
 const sessionId = session?.user.id || "";
 
  return (
    <MainWrapper classes="w-full">
      <div className={`w-full flex justify-center gap-12 mt-${topMargin}`}>
        <div className="flex flex-col gap-4 lg:w-1/2 lg:max-w-lg w-full">
          <Create />
          {error && <h4 className="text-center my-20">Something went wrong, pelase try again</h4>}
          {isLoading ? <>{Array.from({length:6}).map((_,index)=>(
             <PostSkeleton key={index}/>
          ))}</> : data?.result.map((post) => (
            <Post key={post._id} post={post} sessionId={sessionId}/>
          ))}
         
        </div>

        <div className="w-4/12 hidden lg:flex justify-center rounded-md border">
          right side
        </div>
      </div>
    </MainWrapper>
  );
};

export default HomePage;
