import React from "react";
import Post from "@/components/Post";
import { auth } from "@/auth";
import MainWrapper from "@/layouts/main-wrapper";
import { topMargin } from "@/utilities";
import Create from "@/components/create";
type User = {
  _id: string;
  name: string;
  avatar: string;
  username: string;
};

type Post = {
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
  result: Post[];
};
const HomePage = async () => {
  const session = await auth();
  let posts:Post[] = [];
  try{
     const res = await fetch("http://localhost:8000/post");
     const data:GetPostsResponse = await res.json();
     posts = data.result;
  }
  catch(err){
    console.log(err);
  }
  return (
    <MainWrapper classes="w-full">
 <div className={`w-full flex justify-center gap-12   mt-${topMargin}`}>
 
  <div className="flex flex-col gap-4 lg:w-1/2 lg:max-w-lg w-full">
    <Create/>
    {posts.map((post)=>(
      <Post key={post._id} post={post}/>
       
    ))}
  </div>

 
  <div className="w-4/12 hidden  lg:flex justify-center rounded-md border">right side</div>
</div>

    </MainWrapper>
  );
};

export default HomePage;
