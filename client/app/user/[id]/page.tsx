import React from "react";
import UserCard from "@/components/user-card";

const UserProfile = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <UserCard />
      <div>tabs</div>
    </div>
  );
};

export default UserProfile;
