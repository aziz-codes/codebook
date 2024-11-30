"use client";
import React from "react";
import { CodeXml, TrendingUp, BadgeCent } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import CreatePost from "@/modals/create-post";
const Create = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="max-w-full bg-semiDark p-4 rounded-lg shadow-md mb-3">
      {/* Top: Textbox and user icon */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-500">
          {/* User's avatar */}
          <Avatar>
            <AvatarFallback>{session?.user.name?.slice(0, 2)}</AvatarFallback>
            <AvatarImage src={session?.user.image as string} alt="user" />
          </Avatar>
        </div>
        <CreatePost>
          <div className="w-full bg-bgCard hover:bg-bgHover cursor-pointer text-gray-300 rounded-full px-4 py-2 focus:outline-none">
            {`What's on your mind, ${session?.user.username ?? "..."}?`}
          </div>
        </CreatePost>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-4"></div>

      {/* Bottom: Options (Post, Snippet, Discussion, Bounty) */}
      <div className="flex justify-between text-sm">
        <button
          className="flex items-center justify-center sm:justify-start gap-2 text-green-500 hover:text-green-400 hover:bg-bgHover px-3 py-1.5 rounded-md flex-1"
          onClick={() => router.push("/create-snippet")}
        >
          <CodeXml className="h-6 w-6" />
          <span className="font-semibold hidden sm:block">Snippet</span>
        </button>
        <button
          className="flex items-center justify-center sm:justify-start  gap-2 text-purple-500 hover:text-purple-400 hover:bg-bgHover px-3 py-1.5 rounded-md flex-1"
          onClick={() => router.push("/create-discussion")}
        >
          <TrendingUp className="h-6 w-6" />
          <span className="font-semibold hidden sm:block">Discussion</span>
        </button>
        <button
          className="flex items-center justify-center sm:justify-start  gap-2  text-yellow-500 hover:text-yellow-400 hover:bg-bgHover px-3 py-1.5 rounded-md flex-1"
          onClick={() => router.push("/bounties")}
        >
          <BadgeCent className="h-6 w-6" />
          <span className="font-semibold hidden sm:block">Bounty</span>
        </button>
      </div>
    </div>
  );
};

export default Create;
