"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Search } from "lucide-react";
import { topMargin } from "@/utilities";
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
import TextToChip from "../text-chip";
import { Button } from "../ui/button"; // Assuming a Button component is available in your UI library
import { Checkbox } from "../ui/checkbox"; // Assuming a Checkbox component

const CreateSnippet = () => {
  const [search, setSearch] = useState("");
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [chips, setChips] = useState<string[]>([]);

  const [form, setForm] = useState({
    title: "",
    language: selectedLanguage,
    description: "",
    tags: chips,
    resource: "",
    code,
  });
  useEffect(() => {
    setForm({ ...form, code: code });
  }, [code]);
  useEffect(() => {
    setForm({ ...form, tags: chips });
  }, [chips.length]);
  useEffect(() => {
    setForm({ ...form, language: selectedLanguage });
  }, [selectedLanguage]);
  const filteredList = useMemo(() => {
    return languages.filter((item) => item.name.toLowerCase().includes(search));
  }, [search]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubtmit = async() => {
    const payload = {
      title:form.title,
      programmingLanguage:form.language,
      description:form.description,
      tags:form.tags,
      resource:form.resource,
      code:form.code,
      user:"6723d78cb953346dc24ff9ec",
    };
    try{
         const res = await fetch('http://localhost:8000/snippets',{
          method: "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify(payload)
         })
         if(res.ok){
          alert('data saved');
         }
         else{
          alert('something went wrong..')
         }
    }
    catch(err){
      console.log(err);
    }
  };

  console.log(form);

  return (
    <div className={`flex flex-col gap-6 w-full mb-5 mt-${topMargin}`}>
      <h4 className="text-center text-lg font-semibold">
        Create a Code Snippet
      </h4>

      {/* Title and Language */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="flex flex-col space-y-1 col-span-8">
          <label htmlFor="title" className="text-white text-sm">
            Title
          </label>
          <Input
            placeholder="e.g. Understanding Hoisting in JavaScript"
            value={form.title}
            onChange={handleChange}
            name="title"
          />
        </div>
        <div className="flex flex-col space-y-1 col-span-4">
          <label htmlFor="language" className="text-white text-sm">
            Language
          </label>
          <Select onValueChange={(e) => setSelectedLanguage(e.toLowerCase())}>
            <SelectTrigger className="w-full py-4">
              <SelectValue placeholder="Select programming language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* Search for language */}
                <div className="flex w-full items-center border-b gap-1 my-1">
                  <Search className="text-muted h-5 w-5" />
                  <Input
                    placeholder="Search language"
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

      {/* Description */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="description" className="text-white text-sm">
          Description
        </label>
        <Textarea
          placeholder="Explain, what your code does?"
          rows={4}
          value={form.description}
          onChange={handleChange}
          name="description"
        />
      </div>

      {/* Tags and Resource */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="flex flex-col space-y-1 col-span-6">
          <label htmlFor="tags" className="text-white text-sm">
            Tags
          </label>
          <TextToChip
            placeholder="Type and hit enter or space, backspace to remove"
            chips={chips}
            setChips={setChips}
          />
        </div>
        <div className="flex flex-col space-y-1 col-span-6">
          <label htmlFor="resource" className="text-white text-sm">
            Resource
          </label>
          <Input
            placeholder="GitHub repo or Blog post URL (optional)"
            name="resource"
            value={form.resource}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Code Editor */}
      <div className="h-[60vh] flex flex-col">
        <label htmlFor="code" className="text-white text-sm">
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

      {/* Terms and Conditions Checkbox */}
      <div className="items-top flex space-x-2">
        <Checkbox
          id="terms1"
          onCheckedChange={(checked) => setTermsAccepted(!!checked)}
        />
        <div className="grid gap-1 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
          <p className="text-xs text-muted-foreground">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

      {/* Create Snippet Button */}

      <Button
        size="sm"
        variant="outline"
        className="!ring-0 !outline-none max-w-xs !border-none focus:!outline-none bg-green-800 hover:bg-green-800 "
        disabled={!termsAccepted}
        onClick={handleSubtmit}
      >
        Create Snippet
      </Button>
    </div>
  );
};

export default CreateSnippet;
