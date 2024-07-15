import React from "react";
import Snippet from "@/components/snippet";
import MainWrapper from "@/layouts/main-wrapper";
import { childRoutesClass } from "@/utilities";
const Snippets = () => {
  return (
    <MainWrapper classes={childRoutesClass}>
      <div className="w-full mx-auto md:mx-0 max-w-md sm:max-w-lg md:max-w-full">
        <Snippet />
        <Snippet />
      </div>
    </MainWrapper>
  );
};

export default Snippets;
