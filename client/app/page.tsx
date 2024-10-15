import React from "react";
import Post from "@/components/Post";
import { auth } from "@/auth";
import MainWrapper from "@/layouts/main-wrapper";
import { topMargin } from "@/utilities";
import Create from "@/components/create";
const HomePage = async () => {
  const session = await auth();
  
  return (
    <MainWrapper classes="w-full">
 <div className={`w-full flex justify-center gap-12   mt-${topMargin}`}>
 
  <div className="flex flex-col gap-4 w-1/2 max-w-lg">
    <Create />
    <Post />
    <Post />
    <Post />
  </div>

 
  <div className="w-4/12 flex justify-end">right side</div>
</div>

    </MainWrapper>
  );
};

export default HomePage;
