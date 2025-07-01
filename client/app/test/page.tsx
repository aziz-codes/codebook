"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function Test() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Post has been created", {
          position: "top-center",

          action: {
            label: "View",
            onClick: () => console.log("View"),
          },
        })
      }
    >
      Show Toast
    </Button>
  );
}
