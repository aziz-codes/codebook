import React from "react";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

import TextToChip from "@/components/text-chip";
const CreateDiscussion = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="py-4">
        <h2 className="font-bold">Start a new discussion</h2>
        <p className="text-xs line-clamp-2 max-w-md">
          Share your thoughts and ideas with the community. Engage in meaningful
          conversations and collaborate with fellow developers.
        </p>
      </div>
      <div className="flex flex-col">
        <Input
          placeholder="Add a meaningful title"
          className="focus:ring-0 outline-none !ring-0"
        />
        <div className="flex items-center gap-2">
          <Info className="w-3 text-gray-400" />
          <p className="text-muted text-xs">
            make your title short and meaningfull
          </p>
        </div>
      </div>
      <div>
        <TextToChip />
        <div className="flex items-center gap-2">
          <Info className="w-3 text-gray-400" />
          <p className="text-muted text-xs">type and hit space or enter</p>
        </div>
      </div>
    </div>
  );
};

export default CreateDiscussion;
