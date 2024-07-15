import React from "react";
import UserCard from "@/components/user-card";
import UserProfileTabs from "@/components/layouts/tabs";
import MetroProfile from "@/components/metro-profile";
import Profile2 from "@/components/profile2";
import UserStats from "@/charts/user-stats";

const UserProfile = () => {
  const solved = 24;
  const total = 3199;
  const attempting = 5;
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex gap-3">
        {/* <Profile2 /> */}
        {/* <UserStats solved={solved} total={total} attempting={attempting} /> */}
        <MetroProfile />
      </div>
      <div className="w-full flex justify-center">
        <UserProfileTabs />
      </div>
    </div>
  );
};

export default UserProfile;
