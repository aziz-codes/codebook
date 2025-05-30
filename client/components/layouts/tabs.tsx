"use client";
import React, { useEffect, useState } from "react";
import { TrendingUp, CodeXml, LayoutGrid, Gem, Bookmark } from "lucide-react";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Posts, Bounties, Snippets, Discussions } from "../user/tabs";
import { useSession } from "next-auth/react";
import { UserProfileType } from "@/types/user";
const UserProfileTabs = ({ user }: { user: UserProfileType }) => {
  const { data: session } = useSession();
  const [tabs, setTabs] = useState([
    {
      label: "Posts",
      component: <Posts />,
      icon: LayoutGrid,
      isActive: true,
    },
    {
      label: "Snippets",
      component: <Snippets />,
      icon: CodeXml,
      isActive: false,
    },
    {
      label: "Discussion",
      component: <Discussions />,
      icon: TrendingUp,
      isActive: false,
    },
    {
      label: "Bounties",
      component: <Bounties />,
      icon: Gem,
      isActive: false,
    },
  ]);

  useEffect(() => {
    if (session?.user.id === user.user._id) {
      setTabs((prevTabs) => {
        // avoid adding Bookmarks again if already present
        const alreadyHasBookmarks = prevTabs.some(
          (tab) => tab.label === "Bookmarks"
        );
        if (alreadyHasBookmarks) return prevTabs;

        return [
          ...prevTabs,
          {
            label: "Bookmarks",
            component: <div>Bookmarks</div>,
            icon: Bookmark,
            isActive: false,
          },
        ];
      });
    }
  }, [session?.user.id, user.user._id]);

  const handleClickItem = (index: number) => {
    const newTabs = tabs.map((tab, i) => ({
      ...tab,
      isActive: i === index,
    }));
    setTabs(newTabs);
  };

  const activeTab = tabs.find((tab) => tab.isActive === true);

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
      <div>{activeTab?.component}</div>
    </div>
  );
};

export default UserProfileTabs;
