"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HomeIcon, Users, TrendingUp, CodeXml, Gem } from "lucide-react";
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const navlinks = () => {
  const pathName = usePathname();
  const links = [
    {
      label: "Home",
      icon: HomeIcon,
      path: "/",
    },
    {
      label: "Snippets",
      icon: CodeXml,
      path: "/snippets",
    },
    {
      label: "Discussion",
      icon: TrendingUp,
      path: "/discussions",
    },
    {
      label: "Bounties",
      icon: Gem,
      path: "/bounties",
    },
    {
      label: "Peoples",
      icon: Users,
      path: "/devs",
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      {links.map((link, index) => {
        const LinkIcon = link.icon;
        return (
          <Link
            href={link.path}
            className={`${
              poppins.className
            } flex flex-row px-3 py-2 rounded-md items-center gap-2 transition-colors duration-200 ${
              link.path === pathName
                ? "bg-gray-100 dark:bg-gray-700"
                : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            key={index}
          >
            <LinkIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {link.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default navlinks;
