"use client";
import { User } from "@/types/user";
import React from "react";
import { Button } from "../ui/button";
import { deleteRequest, postRequest } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import ButtonLoader from "@/utils/components/button-loader";
import { useSession } from "next-auth/react";
interface UserProps {
  user: User;
  sessionId?: string | undefined;
  username?: string | undefined | null;
}
const UserCard: React.FC<UserProps> = ({ user }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const username = session?.user.username;
  const payload = {
    followerId: session?.user.id,
  };
  const postFollower = async (id: string) => {
    if (!id) return;

    await postRequest(`/user/follow/${id}`, payload);
  };

  const deleteFollower = async (id: string) => {
    if (!id) return;
  
    await deleteRequest(`/user/unfollow/${id}`, payload);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: postFollower,
    onSuccess: () => {
    
      queryClient.invalidateQueries({ queryKey: [`${session?.user.username}-follow-list`] });
    },
    onError: (error) => {
      toast({
        description: "Something went wrong, please try again",
      });
    },
  });

  const { mutate: Unfollow, isPending: unFollowLoading } = useMutation({
    mutationFn: deleteFollower,
    onSuccess: () => {
      console.log("validating unfollowers for ", username);
      queryClient.invalidateQueries({ queryKey: [`${session?.user.username}-follow-list`] });
    },
    onError: (error) => {
      console.log(error);
      toast({
        description: "Something went wrong, please try again",
      });
    },
  });

  const handleFollow = (id: string) => {
    mutate(id);
  };

  const handleUnFollow = (id: string) => {
    Unfollow(id);
  };

  return (
    <div className="h-auto max-w-full w-full flex-wrap rounded-md border shadow-md flex justify-between px-4 py-4 items-center">
      <div className="flex items-center gap-3">
        <img
          src={user.avatar}
          alt={user.username}
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
        />
        <div className="flex flex-col -gap-1.5">
          <h4 className="text-sm font-semibold truncate max-w-[70px]">
            {user.name}
          </h4>

          <p className="text-xs text-gray-500">{user.username}</p>
        </div>
      </div>
      {user.followers?.includes(session?.user.id as string) ? (
        <Button
          size="sm"
          variant="outline"
          className="bg-electric rounded-full hover:bg-blue-600 !ring-0 !outline-none"
          onClick={() => handleUnFollow(user._id)}
        >
          {unFollowLoading ? <ButtonLoader /> : "Following"}
        </Button>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="bg-electric rounded-full hover:bg-blue-600 !ring-0 !outline-none"
          onClick={() => handleFollow(user._id)}
        >
          {isPending ? <ButtonLoader /> : "Follow"}
        </Button>
      )}
    </div>
  );
};

export default UserCard;
