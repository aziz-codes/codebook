import React from "react";
import Post from "@/components/Post";
import { auth } from "@/auth";
import MainWrapper from "@/layouts/main-wrapper";
import { topMargin } from "@/utilities";
const HomePage = async () => {
  const session = await auth();

  return (
    <MainWrapper classes="w-full  ">
      <div className={`w-full max-w-lg mt-${topMargin}`}>
        {!session?.user ? (
          "No session"
        ) : (
          <>
            <Post />
            <Post />
            <Post />
          </>
        )}
      </div>
    </MainWrapper>
  );
};

export default HomePage;
