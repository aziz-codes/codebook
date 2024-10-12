"use client"
import React from "react";
import Snippet from "@/components/snippet";
import MainWrapper from "@/layouts/main-wrapper";
import { childRoutesClass, topMargin } from "@/utilities";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Snippets = () => {
  const router = useRouter()
  return (
    <MainWrapper classes={`${childRoutesClass} grid grid-cols-12 gap-3`}>
      {/* Snippets Section */}
      <div className={`w-full mx-auto md:mx-0 max-w-md sm:max-w-lg md:max-w-full col-span-12 md:col-span-9 mt-${topMargin}`}>
        <Snippet />
        <Snippet /> 
        <Snippet />
        <Snippet />
         <Snippet />
        <Snippet /> 
        <Snippet />
        <Snippet />
      </div>

      {/* Fixed Sidebar Section */}
      <div className="hidden md:block md:col-span-3 ">
        <div className="sticky top-14 px-2 py-3  border-l h-screen">
        <Button
          size="sm"
          variant="outline"
          className="!ring-0 w-full !outline-none !border-none focus:!outline-none bg-green-800 hover:bg-green-800 "
          onClick={()=>router.push('/create-snippet')}
        >
          Create Snippet
        </Button>
          
        </div>
      </div>

      {/* Mobile Sidebar Button */}
      <div className="md:hidden fixed bottom-4 right-4">
        <button className="p-2 bg-blue-500 text-white rounded-full">
        Open Filters
        </button>
      </div>
    </MainWrapper>
  );
};

export default Snippets;

// test commit