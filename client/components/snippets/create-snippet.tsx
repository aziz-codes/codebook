"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRequest } from "@/services";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  ArrowLeft,
  Code2,
  FileText,
  Globe,
  Lightbulb,
  Lock,
  Save,
  Search,
  Settings,
  Upload,
} from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import ButtonLoader from "@/utils/components/button-loader";

const CreateSnippet = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<null | string>(null);

  const [chips, setChips] = useState<string[]>([]);

  const [form, setForm] = useState({
    title: "",
    language: selectedLanguage,
    description: "",
    tags: chips,
    resource: "",
    code,
    isPublic: true,
    allowComments: true,
    allowForks: true,
    complexity: "",
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

  const currentLanugae = useMemo(() => {
    return languages.find(
      (lang) => lang.name.toLowerCase() === selectedLanguage?.toLowerCase()
    );
  }, [selectedLanguage]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSwitchChange = (name: string, value: boolean) => {
    setForm({ ...form, [name]: value });
  };

  // Mutation to mutate snippet

  const { isPending, isSuccess, isError, mutate } = useMutation({
    mutationFn: async (data: any) => {
      await queryClient.cancelQueries({ queryKey: ["snippets"] });
      const res = await postRequest("/snippets", data);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save snippet.");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["snippets"] });

      toast("Snippet has been created", {
        position: "top-center",

        action: {
          label: "View",
          onClick: () => alert("snippet saved"),
        },
      });
    },
    onError: (error) => {
      toast(error.message);
      console.log(error.message);
    },
  });

  const handleSubtmit = () => {
    const payload = {
      title: form.title,
      programmingLanguage: form.language,
      description: form.description,
      tags: form.tags,
      resource: form.resource,
      code: form.code,
      allowComments: form.allowComments,
      allowForks: form.allowForks,
      complexity: form.complexity,
      isPublic: form.isPublic,
    };
    mutate(payload);
  };

  return (
    <div className={`flex flex-col gap-6 w-full mb-5 mt-${topMargin}`}>
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            className="hover:bg-background hover:text-muted-foreground text-xs"
            size="sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6" />
            <h1 className="text-lg font-bold">Create Snippet</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSubtmit}>
            {isPending ? (
              <ButtonLoader />
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" /> "Save Draft"
              </>
            )}
          </Button>
          <Button disabled={!form.title || !form.code} size="sm">
            <Upload className="h-4 w-4 mr-2" /> Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8 p-4 border flex flex-col gap-6 rounded-md">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5" />
            Snippet Details
          </div>
          {/* title */}

          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              placeholder="Enter a descriptive title for your snippet..."
              value={form.title}
              onChange={handleChange}
              name="title"
            />
          </div>
          {/* description */}
          <div className="flex flex-col space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              placeholder="Describe what your snippet does and how to use it..."
              rows={4}
              value={form.description}
              onChange={handleChange}
              name="description"
            />
          </div>
          {/* language and complexity*/}
          <div className="flex items-stretch gap-3 flex-col md:flex-row">
            {/* Language Select */}
            <div className="flex flex-col space-y-2 flex-1">
              <label htmlFor="language" className="text-white text-sm">
                Language *
              </label>
              <Select
                onValueChange={(e) => setSelectedLanguage(e.toLowerCase())}
              >
                <SelectTrigger className="flex-1 h-full">
                  <SelectValue placeholder="Select programming language" />
                </SelectTrigger>
                <SelectContent className="max-h-96">
                  <SelectGroup>
                    {/* Search Input */}
                    <div className="flex items-center border-b px-2 py-1 gap-1">
                      <Search className="text-muted h-4 w-4" />
                      <Input
                        placeholder="Search language"
                        className="p-0 h-7 border-none outline-none focus-visible:ring-0 text-sm"
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
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${item.color}`}
                          />
                          {item.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Complexity Select */}
            <div className="flex flex-col space-y-2 flex-1">
              <label htmlFor="complexity" className="text-white text-sm">
                Complexity
              </label>
              <Select
                value={form.complexity}
                onValueChange={(value) => {
                  setForm({ ...form, complexity: value });
                }}
              >
                <SelectTrigger className="flex-1 h-full">
                  <SelectValue placeholder="Select complexity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* resource url */}
          <div className="flex flex-col space-y-2 col-span-6">
            <Label htmlFor="resource">Reference Link</Label>
            <Input
              placeholder="e.g. https://github.com/username/repo"
              className="text-sm"
              id="resource"
              value={form.resource}
              onChange={handleChange}
              name="resource"
            />
          </div>
          {/* chips */}
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
        </div>

        <div className="col-span-12 md:col-span-4 px-2  flex flex-col gap-4">
          <Card className="border-none !m-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Visibility */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {form.isPublic ? (
                    <Globe className="h-4 w-4 text-green-500" />
                  ) : (
                    <Lock className="h-4 w-4 text-orange-500" />
                  )}
                  <div>
                    <Label className="text-sm font-medium">
                      {form.isPublic ? "Public" : "Private"}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {form.isPublic
                        ? "Anyone can view this snippet"
                        : "Only you can view this snippet"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={form.isPublic}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("isPublic", checked)
                  }
                />
              </div>
              <Separator />
              {/* Comments */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Allow Comments</Label>
                  <p className="text-xs text-muted-foreground">
                    Let others comment on your snippet
                  </p>
                </div>
                <Switch
                  checked={form.allowComments}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("allowComments", checked)
                  }
                />
              </div>

              {/* Forks */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Allow Forks</Label>
                  <p className="text-xs text-muted-foreground">
                    Let others fork and modify your snippet
                  </p>
                </div>
                <Switch
                  checked={form.allowForks}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("allowForks", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  Use descriptive titles to help others find your snippet
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  Add relevant tags to improve discoverability
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  Include comments in your code to explain complex parts
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  Test your code before publishing
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Code Editor */}
        <div className=" col-span-12 md:col-span-8 border p-4 rounded-md">
          <div className="h-auto min-h-96 flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3 ">
                <Code2 className="h-5 w-5" />
                Code Editor
              </div>
              {selectedLanguage ? (
                <Badge variant="outline" className="flex items-center gap-1">
                  <div
                    className={`w-2 h-2 rounded-full ${currentLanugae?.color}`}
                  />
                  {currentLanugae?.name}
                </Badge>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  ⚠️ Editor is read-only. Please select a language to start
                  editing.
                </p>
              )}
            </div>
            <Editor
              language={selectedLanguage || ""}
              defaultValue={code}
              theme="vs-dark"
              className="rounded-md border h-auto min-h-96"
              onChange={(value) => setCode(value || "")}
              options={{
                readOnly: !selectedLanguage,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSnippet;
