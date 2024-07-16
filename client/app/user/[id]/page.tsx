import React from "react";
import UserCard from "@/components/user-card";
import UserProfileTabs from "@/components/layouts/tabs";
import MetroProfile from "@/components/metro-profile";
import Profile2 from "@/components/profile2";
import UserStats from "@/charts/user-stats";
import MainWrapper from "@/layouts/main-wrapper";
import ProfileCard from "@/test/profile-card";

const UserProfile = () => {
  return (
    <MainWrapper classes="flex flex-col gap-6">
      <ProfileCard />
      <div className="w-full flex justify-center">
        <UserProfileTabs />
      </div>
    </MainWrapper>
  );
};

export default UserProfile;
