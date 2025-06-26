import { LoaderCircle } from "lucide-react";
import React from "react";

const MainLoader = () => {
  return (
    <div className="flex h-screen w-full flex-col fixed justify-center items-center bg-slate-800 opacity-100 top-0 left-0 z-50">
      <h2>CodeBook</h2>
      <LoaderCircle className="size-7 rounded-full animate-spin transition-all duration-700 ease-linear" />
    </div>
  );
};

export default MainLoader;
