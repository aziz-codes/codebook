import React from "react";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import TextToChip from "@/components/text-chip";
import ImageHanlder from "@/components/image-hanlder";
import { Button } from "@/components/ui/button";
import MainWrapper from "@/layouts/main-wrapper";
const CreateDiscussion = () => {
  return (
    <MainWrapper classes="flex flex-col gap-4 bg-bgCard p-4 rounded-md">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
        <h2 className="font-medium text-2xl">Start a new discussion</h2>
        <div>
        <Button
          size="sm"
          variant="outline"
          className="!ring-0 !outline-none !border-none focus:!outline-none bg-green-800 hover:bg-green-800 "
        >
          Start Discussion
        </Button>
      </div>
        </div>
        <p className="text-sm   max-w-md">
          Share your thoughts and ideas with the community. Engage in meaningful
          conversations and collaborate with programmers.
        </p>
      </div>
      <div className="flex flex-col">
        <Input
          placeholder="Add a meaningful title"
          className="focus:ring-0 outline-none !ring-0 bg-transparent"
        />
        <div className="flex items-center gap-2">
          <Info className="w-3 text-gray-400" />
          <p className="text-gray-400 text-xs">
            make your title short and meaningfull
          </p>
        </div>
      </div>
      <div>
        <TextToChip />
        <div className="flex items-center gap-2">
          <Info className="w-3 text-gray-400" />
          <p className="text-gray-400 text-xs">
            type and hit space or enter, backspace to remove
          </p>
        </div>
      </div>
      {/* textarea */}

      <div className="grid w-full mt-3">
        <Textarea
          placeholder="Add a decription"
          id="message-2"
          className="!ring-0 !outline-none bg-transparent"
          rows={6}
        />
      </div>

      <ImageHanlder />
     
    </MainWrapper>
  );
};

export default CreateDiscussion;
