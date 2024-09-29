"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "./ui/input";

const TextToChip = ({placeholder="Add upto 5 tags"}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chips, setChips] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim() !== "") {
        if (chips.length < 5) {
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

  return (
    <div className="mt-4">
  <div className="flex items-center gap-2 border border-gray-800 px-2 rounded-md focus-within:ring-1 focus-within:ring-neon ">
    {chips.map((chip, index) => (
      <Badge key={index} className="mr-2">
        {chip}
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
