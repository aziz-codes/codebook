import { getSessionToken } from "@/actions/getSession";
import React from "react";

const Test = async () => {
  const accessToken = await getSessionToken();

  const token = accessToken?.split("codebook2025");

  console.log("token is ", token![1]);

  return (
    <div className="flex flex-wrap w-full overflow-auto text-xs whitespace-pre-wrap">
      {JSON.stringify(token![1])}
    </div>
  );
};

export default Test;
