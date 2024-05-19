"use client";
import React from "react";
import { Label } from "./ui/label";
import DropDown from "./drop-down";
const DiscussionHeader = () => {
  const options = ["Javascript", "Python", "PHP", "CSS"];
  const handleSelect = (language: string) => {
    console.log(language);
  };
  return (
    <div className="flex justify-between items-center p-4 border-b bg-gray-100 w-full">
      <div>
        <Label className="text-xl font-bold">Discussions</Label>
        <p className="text-gray-600 text-sm">
          Join the conversation and share your thoughts.
        </p>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search discussions..."
          className="px-4 py-2 border rounded-lg mr-4"
        />
        <div className="mr-4">
          <DropDown options={options} onSelect={handleSelect} />
        </div>
        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg relative hover:bg-blue-600">
          <span className="mr-2">✚</span>
          Create
          <span className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm hidden group-hover:block">
            Start a new discussion
          </span>
        </button>
      </div>
    </div>
  );
};

export default DiscussionHeader;
