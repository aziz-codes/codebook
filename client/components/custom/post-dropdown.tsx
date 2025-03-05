import React, { useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenuRadioItem,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { LoaderIcon } from "lucide-react";
import { deleteRequest } from "@/services";
import EditPost from "@/modals/edit-post";
import { Post } from "@/types/post";

type DropdownProps = {
  isPostOwner: boolean;
  postId: string;
  handleAddBookmark: () => void;
  isBookmarked: boolean;
  post: Post;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostDropdown = ({
  isPostOwner,
  postId,
  handleAddBookmark,
  setOpen: childOpen,
  isBookmarked,
  post,
}: DropdownProps) => {
  const [loading, setLoading] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const deletePost = async (postId: string): Promise<void> => {
    const response = await deleteRequest(`/post/${postId}`);

    if (!response.ok) {
      throw new Error("Failed to delete the post");
    }
  };

  const mutation = useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setOpen(false);
      childOpen(false);
      document.body.classList.remove("pointer-events-none");
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
    mutation.mutate(postId);
  };

  return (
    <>
      <DropdownMenuContent className="w-36">
        {isPostOwner && (
          <DropdownMenuRadioItem
            value="edit-post"
            className="cursor-pointer px-2 py-1 hover:!bg-bgCard rounded-md"
            onClick={() => setEditPost(true)}
          >
            Edit Post
          </DropdownMenuRadioItem>
        )}
        <DropdownMenuRadioItem
          value="save"
          className="cursor-pointer px-2 py-1 hover:!bg-bgCard rounded-md"
          onClick={handleAddBookmark}
        >
          {isBookmarked ? "Unsave Post" : "Save Post"}
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
        {isPostOwner && (
          <div
            onClick={() => setOpen(true)}
            className="cursor-pointer px-2 py-1 hover:!bg-bgCard rounded-md text-sm text-red-500"
          >
            Delete
          </div>
        )}
        {/* Delete dialog */}
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are You Sure You Want to Delete This Post?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                Deleting this post will permanently remove it, including all
                likes, comments, and associated content from your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="space-x-2">
              <Button
                onClick={() => {
                  setOpen(false);
                  childOpen(false);
                }}
                size="sm"
              >
                Cancel
              </Button>
              <Button
                className="border-none outline-none rounded-md bg-[#EF4444] text-white hover:bg-red-500 !ring-0 px-3 !py-1.5 "
                onClick={handleDelete}
                disabled={loading}
                size="sm"
              >
                {loading ? (
                  <LoaderIcon className="h-4 w-4 animate-spin duration-300 ease-linear" />
                ) : (
                  "Delete"
                )}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>

      {editPost && (
        <EditPost isOpen={editPost} setIsOpen={setEditPost} post={post} />
      )}
    </>
  );
};

export default PostDropdown;
