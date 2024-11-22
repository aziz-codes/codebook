import React, { useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenuRadioItem,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";

type User = {
  _id: string;
  name: string;
  avatar: string;
  username: string;
};

type Like = {
  userIds: string[];
  count: number;
};

type Post = {
  _id: string;
  user: User;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  likes: Like;
  commentCount: number;
};

const PostDropdown = ({ isPostOwner, post }: { isPostOwner: boolean; post: string }) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
const [open,setOpen] = useState(false);
  const deletePost = async (postId: string): Promise<void> => {
    const response = await fetch(`http://localhost:8000/post/${postId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the post");
    }
  };

  const mutation = useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["posts"]});
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleDelete = () => {
    setLoading(true);
    mutation.mutate(post);
  };

  return (
    <DropdownMenuContent className="w-36 group">
      {isPostOwner && (
        <DropdownMenuRadioItem
          value="report"
          className="cursor-pointer px-2 py-1 hover:!bg-bgCard rounded-md"
        >
          Edit Post
        </DropdownMenuRadioItem>
      )}
      <DropdownMenuRadioItem
        value="save"
        className="cursor-pointer px-2 py-1 hover:!bg-bgCard rounded-md"
      >
        Save Post
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem
        value="share"
        className="cursor-pointer px-2 py-1 hover:!bg-bgCard rounded-md"
      >
        Share Post
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem
        value="report"
        className="cursor-pointer px-2 py-1 hover:!bg-bgCard rounded-md"
      >
        Report
      </DropdownMenuRadioItem>
     {isPostOwner&& <div onClick={()=>setOpen(true)}
        
        className="cursor-pointer px-2 py-1 hover:!bg-bgCard rounded-md"
      >
        Delete
      </div>}


      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are You Sure You Want to Delete This Post?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Deleting this post will permanently remove it, including all likes, comments, and associated content
              from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:bg-bgHover">Cancel</AlertDialogCancel>
            <Button
              className="border-none outline-none rounded-md bg-[#EF4444] text-white hover:bg-red-500"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Continue"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenuContent>
  );
};

export default PostDropdown;
