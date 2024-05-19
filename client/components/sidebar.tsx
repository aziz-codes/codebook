import React from "react";
import User from "@/components/user";
import Navlinks from "./navlinks";
const Sidebar = () => {
  return (
    <div className="w-full flex flex-col py-4 px-2 ">
      <User />
      <Navlinks />
    </div>
  );
};

export default Sidebar;
