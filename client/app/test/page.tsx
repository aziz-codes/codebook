import { getSessionToken } from "@/actions/getSession";
import React from "react";

const Test = async () => {
  const accessToken = await getSessionToken();

  return (
    <div className="flex flex-wrap w-full overflow-auto text-xs">
      Access token is {accessToken}
    </div>
  );
};

export default Test;
