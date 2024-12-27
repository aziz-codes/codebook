"use client";
import React from "react";
import SinglePost from "@/components/Post";
import MainWrapper from "@/layouts/main-wrapper";
import { topMargin } from "@/utilities";

import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/services";
import { useSession } from "next-auth/react";
import PostSkeleton from "@/skeletons/post-skeleton";
import dynamic from "next/dynamic";
import CreateSkeleton from "@/skeletons/create-skeleton";
import { Post } from "@/types/post";
import MainLoader from "@/utils/components/main-loader";
import { Loader, LoaderCircle } from "lucide-react";
const CreatePost = dynamic(() => import("@/components/create"), {
  ssr: false,
  loading: () => <CreateSkeleton />,
});

type GetPostsResponse = {
  count: number;
  result: Post[];
};

const HomePage = () => {
  const { data: session, status } = useSession();
  const { data, error, isLoading } = useQuery<GetPostsResponse, Error>({
    queryKey: ["posts"],
    queryFn: async () => await getRequest("/post"),
  });

  const sessionId = (session?.user.id as string) || null;
  if (status === "loading") {
    return <MainLoader />;
  }
  return (
    <MainWrapper classes="w-full">
      <div className={`w-full flex justify-center gap-12 mt-${topMargin}`}>
        <div className="flex flex-col gap-4 lg:w-1/2 lg:max-w-lg w-full">
          <CreatePost />
          {error && (
            <h4 className="text-center my-20">
              Something went wrong, pelase try again
            </h4>
          )}
          {isLoading || sessionId === null ? (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <PostSkeleton key={index} />
              ))}
            </>
          ) : (
            !error &&
            data &&
            data.result.map((post) => (
              <SinglePost key={post._id} post={post} sessionId={sessionId} />
            ))
          )}
        </div>

        <div className="w-4/12 hidden lg:flex justify-center rounded-md ">
          right side
          <LoaderCircle className="animate-spin transition-all duration-500 h-5 w-5" />
        </div>
      </div>
    </MainWrapper>
  );
};

export default HomePage;
// test commit
