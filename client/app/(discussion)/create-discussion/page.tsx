import React from "react";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import TextToChip from "@/components/text-chip";
import ImageHanlder from "@/components/image-hanlder";
import { Button } from "@/components/ui/button";
const CreateDiscussion = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="py-4">
        <h2 className="font-bold">Start a new discussion</h2>
        <p className="text-xs line-clamp-2 max-w-md">
          Share your thoughts and ideas with the community. Engage in meaningful
          conversations and collaborate with peoples across the globe.
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
      {/* textarea */}

      <div className="grid w-full mt-3">
        <Textarea
          placeholder="Describe your problem"
          id="message-2"
          className="!ring-0 !outline-none "
          rows={6}
        />
        <p className="text-xs text-muted">Describe your issue properly</p>
      </div>

      <ImageHanlder />
      <div>
        <Button size="sm">Create Discussion</Button>
      </div>
    </div>
  );
};

export default CreateDiscussion;
