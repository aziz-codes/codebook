import React from "react";
import { LoaderCircle } from "lucide-react";

const IconLoader = ({ height = 4, width = 4 }) => {
  return (
    <LoaderCircle
      className={`h-${height} w-${width} rounded-full animate-spin duration-500 ease-linear`}
    />
  );
};

export default IconLoader;
