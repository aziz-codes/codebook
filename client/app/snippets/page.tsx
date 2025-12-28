"use client";
import React from "react";
import { getRequest } from "@/services";
import Snippet from "@/components/snippet";
import { SnippetType } from "@/types/snippets";
import MainWrapper from "@/layouts/main-wrapper";
import { childRoutesClass, topMargin } from "@/utilities";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";

const Snippets = () => {
  const router = useRouter();

  const {
    data: snippets,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery<SnippetType[]>({
    queryKey: ["snippets"],
    queryFn: async () => {
      const res = await getRequest("/snippets");

      return res;
    },
  });
  console.log("SNippets are");
  return (
    <MainWrapper classes={`${childRoutesClass} grid grid-cols-12 gap-3`}>
      {/* Snippets Section */}
      <div
        className={`w-full mx-auto md:mx-0 max-w-md sm:max-w-lg md:max-w-full col-span-12 md:col-span-9 gap-4 flex flex-col mt-${topMargin}`}
      >
        <Tabs
          defaultValue="following"
          className="w-full p-0 !ring-0 !outline-none"
        >
          <TabsList className="w-full p-0 bg-bgCard">
            <TabsTrigger
              value="following"
              className="flex-1 h-full m-0 rounded-md data-[state=active]:bg-bgHover !ring-0 !outline-none focus-within:!outline"
            >
              Following
            </TabsTrigger>
            <TabsTrigger
              value="for-you"
              className="flex-1 h-full m-0 rounded-md data-[state=active]:bg-bgHover !ring-0 !outline-none"
            >
              For You
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="for-you"
            className="flex-1 flex flex-col gap-6 !py-0 m-0 relative top-6"
          >
            For You
          </TabsContent>

          <TabsContent
            value="following"
            className="flex-1 flex flex-col gap-6 !py-0 m-0 relative top-6"
          >
            {isLoading && <h3>Loading...</h3>}

            {isError && (
              <h4 className="text-red-500 text-center">
                Failed to load snippets. {JSON.stringify(snippets)}
              </h4>
            )}

            {isSuccess && snippets?.length === 0 && (
              <p className="text-muted-foreground text-center">
                No snippets found.
              </p>
            )}

            {isSuccess &&
              snippets?.length > 0 &&
              snippets.map((snippet) => (
                <Snippet key={snippet._id} snippet={snippet} />
              ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Fixed Sidebar Section */}
      <div className="hidden md:flex md:col-span-3 flex-col">
        <div
          className="sticky top-14 px-2 py-3 flex flex-col gap-3 items-center mt-1"
          style={{ height: "calc(100vh - 3.5rem)" }}
        >
          <Button
            size="sm"
            variant="outline"
            className="!ring-0 w-full !outline-none h-10 !p-0 !border-none focus:!outline-none bg-green-800 hover:bg-green-800"
            onClick={() => router.push("/create-snippet")}
          >
            Create Snippet
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Button */}
      <div className="md:hidden fixed bottom-4 right-4">
        <button className="p-2 bg-blue-500 text-white rounded-full">
          Open Filters
        </button>
      </div>
    </MainWrapper>
  );
};

export default Snippets;
