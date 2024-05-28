import React from "react";
import UserCard from "@/components/user-card";

const UserProfile = () => {
  return (
    <div className="flex flex-col ">
      <div className="w-full flex justify-center">
        <UserCard />
      </div>
      <div>tabs</div>
    </div>
  );
};

export default UserProfile;
