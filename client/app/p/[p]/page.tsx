"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import MainWrapper from "@/layouts/main-wrapper";

import { Post } from "@/types/post";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/services";
import SinglePost from "@/components/Post";
import { useSession } from "next-auth/react";
import PostSkeleton from "@/skeletons/post-skeleton";
import NotFound from "@/app/not-found";

type GetPostsResponse = {
  count: number;
  result: Post;
};

const SinglePage = () => {
  const { p } = useParams();
  const { data: session } = useSession();
  const [dropDownId, setDropdownId] = useState<any>(null);
  const { data, error, isLoading } = useQuery<GetPostsResponse>({
    queryKey: ["posts", p],
    queryFn: async () => await getRequest(`/post/${p}`),
  });

  const sessionId = session?.user.id;
  if (isLoading) {
    return (
      <MainWrapper classes="w-full flex justify-center px-4 lg:px-8">
        <div className="w-full max-w-5xl py-8">
          <PostSkeleton />
        </div>
      </MainWrapper>
    );
  }
  if (error || !data?.result) return <NotFound />;

  return (
    <MainWrapper classes="w-full flex justify-center px-4 lg:px-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
        {/* Left Section: Single Post */}
        <div className="col-span-2 rounded-lg shadow-md">
          <SinglePost
            post={data.result}
            sessionId={sessionId as string}
            isSingleRoute
            detailed={false}
            dropDownId={dropDownId}
            setDropdownId={setDropdownId}
          />
        </div>

        {/* Right Section: Similar Posts or Other Info */}
        <div className="border rounded-lg shadow-md p-6 w-full">
          <h2 className="text-xl font-semibold mb-4">Similar Posts</h2>
          <ul className="space-y-4">
            <li className="border-b pb-2">
              <h3 className="text-gray-800">Similar Post 1</h3>
              <p className="text-sm text-gray-600">Brief description...</p>
            </li>
            <li className="border-b pb-2">
              <h3 className="text-gray-800">Similar Post 2</h3>
              <p className="text-sm text-gray-600">Brief description...</p>
            </li>
            <li>
              <h3 className="text-gray-800">Similar Post 3</h3>
              <p className="text-sm text-gray-600">Brief description...</p>
            </li>
          </ul>
        </div>
      </div>
    </MainWrapper>
  );
};

export default SinglePage;
