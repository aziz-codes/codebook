"use client";
import React from "react";
import Post from "@/components/Post";
import MainWrapper from "@/layouts/main-wrapper";
import { topMargin } from "@/utilities";
import Create from "@/components/create";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/services";
import { useSession } from "next-auth/react";
type User = {
  _id: string;
  name: string;
  avatar: string;
  username: string;
};

type PostData = {
  _id: string;
  user: User;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type GetPostsResponse = {
  count: number;
  result: PostData[];
};

const HomePage = () => {
  const {data:session} = useSession();
  const { data, error, isLoading } = useQuery<GetPostsResponse, Error>({
    queryKey: ["posts"],
    queryFn: async () => await getRequest("/post"),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts: {error.message}</p>;
 const sessionId = session?.user.id || "";
 
  return (
    <MainWrapper classes="w-full">
      <div className={`w-full flex justify-center gap-12 mt-${topMargin}`}>
        <div className="flex flex-col gap-4 lg:w-1/2 lg:max-w-lg w-full">
          <Create />
          {data?.result.map((post) => (
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
