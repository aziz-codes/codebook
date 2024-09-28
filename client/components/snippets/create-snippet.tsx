"use client";
import React, { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Editor from "@monaco-editor/react";
import { languages } from "@/constants/discussion/discussion-items";
const CreateSnippet = () => {
  const [search, setSearch] = useState("");
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const filteredList = useMemo(() => {
    return languages.filter((item) => item.name.toLowerCase().includes(search));
  }, [search]);

  return (
    <div className="flex flex-col gap-3 w-full mb-5">
      <h4 className="text-center text-lg font-semibold">
        Create a code snippet
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="flex flex-col space-y-1 col-span-8">
          <label htmlFor="description" className="text-white text-sm">
            Title
          </label>
          <Input placeholder="title" />
        </div>
        <div className="flex flex-col space-y-1 col-span-4">
          <label htmlFor="description" className="text-white text-sm">
            Language
          </label>
          <Select onValueChange={(e) => setSelectedLanguage(e.toLowerCase())}>
            <SelectTrigger className="w-full py-4">
              <SelectValue placeholder="Select programming language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <div className="flex w-full items-center border-b gap-1 my-1">
                  <Search className="text-muted h-5 w-5" />
                  <Input
                    placeholder="search"
                    className="p-0 h-8 border-none outline-none focus-visible:ring-0"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                  />
                </div>
                {filteredList.map((item) => (
                  <SelectItem
                    value={item.name}
                    key={item.name}
                    className="hover:!bg-bgHover cursor-pointer"
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="description" className="text-white text-sm">
          Description
        </label>

        <Textarea placeholder="explain, what your code does?" rows={4} />
      </div>

      <div className="h-[60vh] flex flex-col">
        <label htmlFor="description" className="text-white text-sm">
          Add your code
        </label>
        <Editor
          height="100%"
          language={selectedLanguage}
          defaultValue={code}
          theme="vs-dark"
          className="rounded-md border-2"
          onChange={(value) => setCode(value || "")}
        />
      </div>
    </div>
  );
};

export default CreateSnippet;
