"use client";
import React, { FC, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "./ui/input";
import { Tag, X } from "lucide-react";
import { Button } from "./ui/button";
interface PropsTypes {
  chips: string[];
  setChips: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder?: string;
}
const TextToChip: FC<PropsTypes> = ({
  placeholder = "Add upto 5 tags",
  chips,
  setChips,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim() !== "") {
        if (chips.length < 8) {
          setChips([...chips, inputValue.trim()]);
        }

        setInputValue("");
      }
    } else if (e.key === "Backspace" && inputValue === "") {
      e.preventDefault();
      if (chips.length > 0) {
        setChips(chips.slice(0, -1));
      }
    }
  };

  const handleRemoveChip = (index: number) => {
    const tags = [...chips];
    tags.splice(index, 1); // remove 1 element at 'index'
    setChips(tags);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 border border-gray-800 px-2 rounded-md focus-within:ring-[0.5px] focus-within:ring-neon ">
        {chips.map((tag, index) => (
          <Badge
            key={tag}
            variant="secondary"
            className="flex items-center gap-1"
          >
            <Tag className="h-3 w-3" />
            {tag}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => handleRemoveChip(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder={chips.length > 0 ? "" : placeholder}
          className="flex-grow focus:ring-0 outline-none focus:ring-offset-0 !ring-0 border-none p-0 bg-transparent"
        />
      </div>
    </div>
  );
};

export default TextToChip;
