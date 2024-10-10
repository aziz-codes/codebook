import React from "react";
import Snippet from "@/components/snippet";
import MainWrapper from "@/layouts/main-wrapper";
import { childRoutesClass } from "@/utilities";

const Snippets = () => {
  return (
    <MainWrapper classes={`${childRoutesClass} grid grid-cols-12 gap-3`}>
      {/* Snippets Section */}
      <div className="w-full mx-auto md:mx-0 max-w-md sm:max-w-lg md:max-w-full col-span-12 md:col-span-9">
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
        <div className="sticky top-0 p-4 bg-white rounded shadow-md h-screen">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          {/* Add your filter components here */}
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
