import React from "react";
import Post from "@/components/Post";
import { auth } from "@/auth";
const HomePage = async () => {
  const session = await auth();

  return (
    <div className="w-full max-w-lg">
      {!session?.user ? "No session" : <Post />}
    </div>
  );
};

export default HomePage;
