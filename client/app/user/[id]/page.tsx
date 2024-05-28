import React from "react";
import UserCard from "@/components/user-card";
import UserProfileTabs from "@/components/layouts/tabs";

const UserProfile = () => {
  return (
    <div className="flex flex-col ">
      <div className="w-full flex justify-center">
        <UserCard />
      </div>
      <div className="w-full flex justify-center">
        <UserProfileTabs />
      </div>
    </div>
  );
};

export default UserProfile;
