import React from "react";

const UserProfileSkeleton = () => {
  return (
    <div className="bg-bgCard w-full rounded-md px-4 py-4 grid grid-cols-12 gap-2 animate-pulse">
      {/* Avatar and Followers Section */}
      <div className="col-span-12 md:col-span-3 flex flex-col p-4 justify-center items-center">
        <div className="rounded-full md:rounded-md h-44 w-44 bg-gray-400"></div>
        <div className="py-3 text-center">
          <div className="h-4 w-32 bg-gray-400 rounded-md mb-2"></div>
          <div className="flex items-center gap-1 mt-2">
            <div className="h-4 w-12 bg-gray-400 rounded-md"></div>
            <div className="h-4 w-20 bg-gray-400 rounded-md ml-2"></div>
            <div className="h-4 w-12 bg-gray-400 rounded-md ml-4"></div>
          </div>
        </div>
      </div>

      {/* Stats and Bio Section */}
      <div className="col-span-12 md:col-span-7 overflow-hidden p-4 flex flex-col gap-5 items-center md:items-start">
        {/* Stats Section */}
        <div className="flex gap-2 items-center space-x-6 flex-wrap">
          {[1, 2, 3].map((_, index) => (
            <div className="flex flex-col space-y-1" key={index}>
              <div className="h-4 w-24 bg-gray-400 rounded-md"></div>
              <div className="h-4 w-12 bg-gray-400 rounded-md"></div>
            </div>
          ))}
        </div>

        {/* Bio Section */}
        <div className="w-full">
          <div className="h-4 w-40 bg-gray-400 rounded-md mb-2"></div>
          <div className="h-4 w-full bg-gray-400 rounded-md mb-2"></div>
          <div className="h-20 w-full bg-gray-400 rounded-md"></div>
        </div>

        {/* Buttons Section */}
        <div className="flex items-center space-x-4 max-w-xs w-full">
          <div className="h-10 w-full bg-gray-400 rounded-md"></div>
          <div className="h-10 w-full bg-gray-400 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
