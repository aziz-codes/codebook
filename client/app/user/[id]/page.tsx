import React from "react";
import UserCard from "@/components/user-card";
import UserProfileTabs from "@/components/layouts/tabs";
import MetroProfile from "@/components/metro-profile";

const UserProfile = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex ">
        {/* <UserCard /> */}
        <MetroProfile />
      </div>
      <div className="w-full flex justify-center">
        <UserProfileTabs />
      </div>
    </div>
  );
};

export default UserProfile;
