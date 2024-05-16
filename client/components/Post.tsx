import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis } from "lucide-react";
import React from "react";

const SinglePost = () => {
  const post = {
    userName: "John Doe",
    createdAt: "2 days ago",
    content: "This is an example post content.",
    image: "https://via.placeholder.com/600x400",
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 border">
      {/* User Info and Action Button */}
      <div className="flex justify-between items-center mb-4 px-4  py-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>AZ</AvatarFallback>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {post.userName}
            </p>
            <p className="text-xs text-gray-500">{post.createdAt}</p>
          </div>
        </div>
        <button className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
          <Ellipsis />
        </button>
      </div>

      {/* Post Content */}
      <div className="mb-4 px-4">
        <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="w-full h-96 bg-gray-200 dark:bg-gray-700   overflow-hidden">
          <img
            src={post.image}
            alt="Post"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default SinglePost;
