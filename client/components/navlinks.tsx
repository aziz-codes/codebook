"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  HomeIcon,
  Users,
  TrendingUp,
  CodeXml,
  BadgeCent,
  Mail,
} from "lucide-react";

import { cn } from "@/lib/utils";

const Navlinks = () => {
  const pathName = usePathname();
  const links = [
    {
      label: "Home",
      icon: HomeIcon,
      path: "/",
    },
    {
      label: "Developers",
      icon: Users,
      path: "/devs",
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
      label: "Messages",
      icon: Mail,
      path: "/messages",
    },

    {
      label: "Bounties",
      icon: BadgeCent,
      path: "/bounties",
    },
  ];
  return (
    <div className="mt-5 flex flex-col gap-4">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathName === link.path;

        return (
          <Link
            key={link.label}
            href={link.path}
            className={`
              flex w-full py-1.5 px-3 rounded-md gap-4    hover:bg-bgHover ${
                isActive ? "bg-bgHover" : ""
              }`}
          >
            <LinkIcon className="w-5" />
            <p className={`${cn("hidden lg:block  ")}`}>{link.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Navlinks;
