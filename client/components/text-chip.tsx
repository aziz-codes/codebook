"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "./ui/input";
const TextToChip = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chips, setChips] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim() !== "") {
        setChips([...chips, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  // const handleRemoveChip = (index) => {
  //   setChips(chips.filter((_, i) => i !== index));
  // };
  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {chips.map((chip, index) => (
          <Badge key={index}>{chip}</Badge>
        ))}
      </div>
      {/* <input
        type="text"
        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Type something and press space..."
          /> */}
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="type and hit space"
        className="focus:ring-0 outline-none focus:ring-offset-0 !ring-0"
      />
    </div>
  );
};

export default TextToChip;
