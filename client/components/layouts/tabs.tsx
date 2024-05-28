"use client";
import React, { useState } from "react";
import { TrendingUp, CodeXml, LayoutGrid, Gem } from "lucide-react";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
const UserProfileTabs = () => {
  const [tabs, setTabs] = useState([
    {
      label: "Posts",
      icon: LayoutGrid,
      isActive: true,
    },
    {
      label: "Snippets",
      icon: CodeXml,
      isActive: false,
    },
    {
      label: "Discussion",
      icon: TrendingUp,
      isActive: false,
    },
    {
      label: "Bounties",
      icon: Gem,
      isActive: false,
    },
  ]);

  const handleClickItem = (index: number) => {
    const newTabs = tabs.map((tab, i) => ({
      ...tab,
      isActive: i === index,
    }));
    setTabs(newTabs);
  };

  return (
    <div className="w-full max-w-5xl flex flex-col mt-8">
      <Separator />
      <div className="w-full flex justify-center gap-8">
        {tabs.map((tab, index) => {
          const TabIcon = tab.icon;
          return (
            <div
              key={index}
              className={`flex items-center  gap-2 py-4 ${
                tab.isActive
                  ? "border-t dark:border-white border-slate-800 "
                  : ""
              } cursor-pointer`}
              onClick={() => handleClickItem(index)}
            >
              <TabIcon className="w-4" />
              <Label className="cursor-pointer text-sm">{tab.label}</Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserProfileTabs;
