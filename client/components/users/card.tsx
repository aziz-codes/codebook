"use client";
import { User } from "@/types/user";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { deleteRequest, postRequest } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import ButtonLoader from "@/utils/components/button-loader";
import { useSession } from "next-auth/react";
import { Users, UserPlus, UserCheck, Check } from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

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
      queryClient.invalidateQueries({
        queryKey: [`${session?.user.username}-follow-list`],
      });
      toast({
        description: `You're now following ${user.name}`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: "Something went wrong, please try again",
      });
    },
  });

  const { mutate: Unfollow, isPending: unFollowLoading } = useMutation({
    mutationFn: deleteFollower,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${session?.user.username}-follow-list`],
      });
      toast({
        description: `You unfollowed ${user.name}`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
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

  const isFollowing =
    user.isFollowing || user.followers?.includes(session?.user.id as string);
  const followersCount = user.followers?.length || 0;
  const followingCount = user.following?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
    >
      <Card className="w-full h-full flex flex-col overflow-hidden border dark:border-[#181a20] border-gray-300 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Avatar className="h-14 w-14 border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                  <AvatarImage
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name || user.username}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {(user.name || user.username || "U")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-base truncate">
                    {user.name || user.username}
                  </h3>
                  {user.username === "aziz-codes" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="flex-shrink-0 w-4 h-4"
                      title="Verified Account"
                    >
                      {/* <div className="relative flex items-center justify-center w-full h-full">
                        <div className="absolute inset-0 bg-blue-500 rounded-full" />
                        <Check
                          className="h-2.5 w-2.5 text-white relative z-10"
                          strokeWidth={3}
                        />
                      </div> */}
                    </motion.div>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm text-muted-foreground truncate">
                    @{user.username}
                  </p>
                  {user.username === "aziz-codes" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        delay: 0.1,
                      }}
                      className="flex-shrink-0"
                      title="Verified Account"
                    >
                      <div className="relative flex items-center justify-center w-3.5 h-3.5">
                        <div className="absolute inset-0 bg-blue-500 rounded-full" />
                        <Check
                          className="h-2 w-2 text-white relative z-10"
                          strokeWidth={3}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
                {user.tagline && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {user.tagline}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-0 flex-1 flex flex-col">
          {/* Bio */}
          {user.bio && (
            <p className="text-sm text-foreground/80 line-clamp-2 leading-relaxed">
              {user.bio}
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="font-medium">{followersCount}</span>
              <span className="text-xs">followers</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span className="font-medium">{followingCount}</span>
              <span className="text-xs">following</span>
            </div>
          </div>

          <Separator />

          {/* Action Button */}
          <div className="flex items-center justify-end mt-auto">
            {isFollowing ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleUnFollow(user._id)}
                disabled={unFollowLoading || !session?.user.id}
                className="w-full sm:w-auto bg-primary/10 hover:bg-primary/20 border-primary/30 hover:border-primary/50 text-primary font-medium transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {unFollowLoading ? (
                  <ButtonLoader />
                ) : (
                  <>
                    <UserCheck className="h-4 w-4 mr-2" />
                    Following
                  </>
                )}
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => handleFollow(user._id)}
                disabled={isPending || !session?.user.id}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                {isPending ? (
                  <ButtonLoader />
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserCard;
