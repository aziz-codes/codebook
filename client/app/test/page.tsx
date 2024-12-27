"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import useCustomMutation from "@/hooks/use-custom-mutation"; // Import your custom mutation hook
import { postRequest } from "@/services/index"; // Import your postRequest function

const Test = () => {
  const [inputValue, setInputValue] = useState("");

  // Using the custom mutation hook
  const { mutate,isPending } = useCustomMutation({
    mutationFn: async (data: { name: string }) => postRequest("/test", data),
    onSuccess: (data) => {
      console.log("Data posted successfully:", data);
      alert("Data posted successfully!");
    },
    onError: (error) => {
      console.error("Error posting data:", error);
      alert("Failed to post data.");
    },
    invalidateQueriesKeys: ["test"], // Cache invalidation or data refetching
  });

  const handlePost = () => {
    if (!inputValue.trim()) {
      alert("Please enter something before posting!");
      return;
    }

    // Pass the payload to mutate function
    mutate({ name: inputValue });
  };

  return (
    <div className="flex flex-col gap-2 max-w-sm">
      <input
        type="text"
        placeholder="Enter something"
        className="px-2 py-1.5 rounded-md border outline-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button onClick={handlePost} >
      {isPending ? "Loading": "Post"}
      </Button>
    </div>
  );
};

export default Test;
