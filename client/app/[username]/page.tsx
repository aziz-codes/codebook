"use client";
import React from "react";

import UserProfileTabs from "@/components/layouts/tabs";
import { useParams } from "next/navigation";
import MainWrapper from "@/layouts/main-wrapper";

import { childRoutesClass, topMargin } from "@/utilities";
import { UserProfileType } from "@/types/user";
import { getRequest } from "@/services";
import { useQuery } from "@tanstack/react-query";
import UserProfileSkeleton from "@/skeletons/user-profile-skeleton";
import dynamic from "next/dynamic";
import NotFound from "../not-found";
import ButtonLoader from "@/utils/components/button-loader";
const ProfileCard = dynamic(() => import("@/test/profile-card"), {
  ssr: false,
  loading: () => <UserProfileSkeleton />,
});

const UserProfile = () => {
  const { username } = useParams();

  const { data, isLoading, error } = useQuery<UserProfileType>({
    queryKey: ["userProfile", username],
    queryFn: async () => {
      const response = await getRequest(`/user/${username}`);
      if (!response?.user) {
        // Handle the case where the user is not found
        throw new Error("User not found");
      }
      return response;
    },
    enabled: !!username,
    refetchOnWindowFocus: false,
  });

  if (error) return <NotFound />;

  return (
    <MainWrapper
      classes={`${childRoutesClass} flex flex-col gap-6 mt-${topMargin}`}
    >
      {isLoading && <UserProfileSkeleton />}
      {data && <ProfileCard profile={data} />}
      <div className="w-full flex justify-center">
        {isLoading && <ButtonLoader />}
        {data && <UserProfileTabs user={data} />}
      </div>
    </MainWrapper>
  );
};

export default UserProfile;
