"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HomeIcon, Users, TrendingUp, CodeXml, BadgeCent } from "lucide-react";

import { Poppins } from "next/font/google";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
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
      icon: BadgeCent,
      path: "/bounties",
    },
    {
      label: "Peoples",
      icon: Users,
      path: "/devs",
    },
  ];
  return (
    <div className="mt-5">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathName === link.path;

        return (
          <Link
            key={link.label}
            href={link.path}
            className={buttonVariants({
              variant: isActive ? "secondary" : "ghost",
              className: cn("navLink", { "hidden md:flex": null }),
              size: "sm",
            })}
          >
            <LinkIcon className="w-5" />
            <p className={`${cn("hidden lg:block font-semibold")}`}>
              {link.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default navlinks;
