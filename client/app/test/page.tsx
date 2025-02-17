import React from "react";
import { Textarea } from "@/components/ui/textarea";

const Test = () => {
  return (
    <div className="w-full max-w-xs border p-4 h-48">
      <Textarea
        placeholder="Type your message here..."
        rows={1} // Start small
        className="w-full resize-none overflow-y-auto max-h-44 !border-none !outline-none !ring-0
      "
      />
    </div>
  );
};

export default Test;
