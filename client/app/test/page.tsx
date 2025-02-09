"use client";

import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRequest, postRequest } from "@/services";
import { Post } from "@/types/post";
type GetPostsResponse = {
  count: number;
  result: Post[];
};

const Test = () => {
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();

  const { data, error, isLoading } = useQuery<GetPostsResponse, Error>({
    queryKey: ["test"],
    queryFn: async () => await getRequest("/post"),
  });

  const { mutate: toggleLike } = useMutation({
    mutationFn: async (postId: string) => {
      console.log("mutation function called", postId);
      return await postRequest(`/post/like/${postId}`, {
        userId: session?.user.id,
      });
    },
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ["test"] });
      const previousPosts = queryClient.getQueryData<GetPostsResponse>([
        "test",
      ]);
      queryClient.setQueryData<GetPostsResponse>(["test"], (old) => {
        if (!old) return { count: 0, result: [] };
        return {
          ...old,
          result: old.result.map((post) => {
            if (post._id === postId) {
              const isLiked = post.likes.some(
                (like) => like.user === session?.user.id
              );
              const updatedLikes = isLiked
                ? post.likes.filter((like) => like.user !== session?.user.id)
                : [
                    ...post.likes,
                    { user: session?.user.id as string, userIds: [], count: 1 },
                  ];

              return {
                ...post,
                likes: updatedLikes,
              };
            }
            return post;
          }),
        };
      });
      return { previousPosts };
    },
    onError: (err, postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["test"], context.previousPosts);
      }
    },
    onSettled: () => {
      // Optionally: Remove this line to prevent re-fetching entirely
      // queryClient.invalidateQueries({ queryKey: ["test"] });
    },
  });

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts</div>;
  if (status === "loading") return <h3>Session pending..</h3>;
  const handleLike = (postId: string) => {
    toggleLike(postId);
    console.log("like clicked", postId);
  };
  return (
    <div>
      {data?.result.map((post) => {
        const isLiked = post.likes.some(
          (like) => like.user === session?.user.id
        ); // Replace with real session ID logic

        return (
          <div key={post._id} className="mb-4 border p-4 rounded">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p className="text-sm text-gray-500">Likes: {post.likes.length}</p>
            <button
              className={`mt-2 px-4 py-2 rounded ${
                isLiked ? "bg-red-500" : "bg-gray-300"
              }`}
              onClick={() => handleLike(post._id)}
            >
              {isLiked ? "Liked" : "Like"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Test;
