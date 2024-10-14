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
 <div className={`w-full flex justify-between gap-4 border border-red-500 mt-${topMargin}`}>
  {/* Left side content */}
  <div className="flex flex-col gap-4 w-8/12">
    <Create />
    <Post />
    <Post />
    <Post />
  </div>

  {/* Right side content */}
  <div className="w-4/12 border">right side</div>
</div>

    </MainWrapper>
  );
};

export default HomePage;
