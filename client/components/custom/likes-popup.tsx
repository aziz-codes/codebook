"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/services";
import IconLoader from "@/utils/components/icon-loader";
import ButtonLoader from "@/utils/components/button-loader";

type User = {
  username: string;
  avatar: string;
  id: string;
};

interface LikesResponse {
  success: boolean;
  likes: User[];
}

const LikesPopup = ({
  post,
  open,
  setOpen,
}: {
  post: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const { isLoading, data, error } = useQuery<LikesResponse, Error>({
    queryKey: [`likes/${post}`],
    queryFn: async () => await getRequest(`/post/likes/${post}`),
    enabled: open, // Only fetch when modal is open
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base">Likes</DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center my-1">
            <ButtonLoader />
          </div>
        )}
        {error && <p>Error loading likes.</p>}
        {!data?.likes?.length && !isLoading && <p>No likes yet.</p>}

        {data?.likes?.map((like) => (
          <div
            key={like.id}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-muted"
            onClick={() => router.push(`/${like.username}`)}
          >
            <Avatar className="h-6 w-6">
              <AvatarFallback>{like.username[0]}</AvatarFallback>
              <AvatarImage src={like.avatar} />
            </Avatar>
            <span className="text-sm">{like.username}</span>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default LikesPopup;
