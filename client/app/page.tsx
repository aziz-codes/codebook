"use client";

import React, { useRef, useState, useEffect } from "react";
import SinglePost from "@/components/Post";
import MainWrapper from "@/layouts/main-wrapper";
import { topMargin } from "@/utilities";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getRequest } from "@/services";
import PostSkeleton from "@/skeletons/post-skeleton";
import CreateSkeleton from "@/skeletons/create-skeleton";
import MainLoader from "@/utils/components/main-loader";
import { LoaderCircle } from "lucide-react";

import { Post } from "@/types/post";

// Dynamically import CreatePost
const CreatePost = dynamic(() => import("@/components/create"), {
  ssr: false,
  loading: () => <CreateSkeleton />,
});
// const refetch = useSelector((state)=>state.)
// Backend response shape
type GetPostsResponse = {
  count: number;
  result: Post[];
  page: number;
  hasMore: boolean;
};

const HomePage = () => {
  const { data: session, status } = useSession();
  const sessionId = session?.user?.id ?? null;
  const [dropDownId, setDropdownId] = useState<string | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
    refetch,
  } = useInfiniteQuery<GetPostsResponse, Error>({
    queryKey: ["posts"],
    initialPageParam: 1,
    enabled: false,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getRequest(`/post?page=${pageParam}&limit=10`);
      return res as GetPostsResponse;
    },
    getNextPageParam: (lastPage) =>
      lastPage?.hasMore ? lastPage.page + 1 : undefined,
  });

  // Ref to observe bottom of post list
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Set up IntersectionObserver
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  useEffect(() => {
    refetch();
  }, []);

  if (status === "loading") return <MainLoader />;

  return (
    <MainWrapper classes="w-full">
      <div
        className={`w-full flex justify-center gap-12 mt-${
          typeof topMargin === "number" ? topMargin : 20
        }`}
      >
        <div className="flex flex-col gap-4 lg:max-w-xl w-full">
          <CreatePost />

          {error && (
            <h4 className="text-center my-20 text-red-600">
              Something went wrong, please try again.
            </h4>
          )}

          {isLoading || sessionId === null ? (
            Array.from({ length: 6 }).map((_, index) => (
              <PostSkeleton key={index} />
            ))
          ) : (
            <>
              {data?.pages
                ?.flatMap((page) => page?.result || [])
                ?.filter(
                  (post): post is Post =>
                    post !== null &&
                    post !== undefined &&
                    typeof post === "object" &&
                    "_id" in post
                )
                .map((post) => (
                  <SinglePost
                    key={post._id}
                    post={post}
                    sessionId={sessionId}
                    dropDownId={dropDownId!}
                    setDropdownId={setDropdownId}
                  />
                ))}

              {/* Sentinel div for IntersectionObserver */}
              <div ref={loadMoreRef} />

              {isFetchingNextPage && (
                <div className="text-center py-4 flex justify-center text-sm text-gray-500">
                  <LoaderCircle className="animate-spin transition-all duration-500 h-5 w-5" />
                </div>
              )}
            </>
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
