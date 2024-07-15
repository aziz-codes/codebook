import React from "react";
import Post from "@/components/Post";
import { auth } from "@/auth";
import MainWrapper from "@/layouts/main-wrapper";
const HomePage = async () => {
  const session = await auth();

  return (
    <MainWrapper classes="w-full px-32">
      <div className="w-full max-w-lg">
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
