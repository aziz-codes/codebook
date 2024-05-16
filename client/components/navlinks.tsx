import React from "react";
import Link from "next/link";
import { HomeIcon, CodeIcon, User } from "lucide-react";
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const navlinks = () => {
  const links = [
    {
      label: "Home",
      icon: HomeIcon,
      path: "/",
    },
    {
      label: "Snippets",
      icon: CodeIcon,
      path: "/",
    },
    {
      label: "Devs",
      icon: User,
      path: "/",
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      {links.map((link, index) => {
        const LinkIcon = link.icon;
        return (
          <Link
            href={link.path}
            className={`${poppins.className} flex flex-row px-2 py-2 rounded-md items-center  bg-white  gap-1`}
            key={index}
          >
            <LinkIcon className="w-5" />

            <p className={"text-xs  "}>{link.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default navlinks;
