import React from "react";
import UserCard from "@/components/user-card";
import UserProfileTabs from "@/components/layouts/tabs";
import MetroProfile from "@/components/metro-profile";
import Profile2 from "@/components/profile2";
import UserStats from "@/charts/user-stats";
import MainWrapper from "@/layouts/main-wrapper";
import ProfileCard from "@/test/profile-card";
import { childRoutesClass, topMargin } from "@/utilities";

const UserProfile = () => {
  return (
    <MainWrapper classes={`${childRoutesClass} flex flex-col gap-6 mt-${topMargin}`}>
      <ProfileCard />
      <div className="w-full flex justify-center">
        <UserProfileTabs />
      </div>
    </MainWrapper>
  );
};

export default UserProfile;
