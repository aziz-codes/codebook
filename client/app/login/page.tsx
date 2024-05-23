import React from "react";
import { Button } from "@/components/ui/button";

import { signIn } from "next-auth/react";
const page = () => {
  return (
    <div>
      <Button
        onClick={() =>
          signIn("github", {
            callbackUrl: "http://localhost:3000",
          })
        }
      >
        Sign in with Github
      </Button>
    </div>
  );
};

export default page;
