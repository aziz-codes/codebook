"use client";
import React, { useEffect, useState } from "react";
import Snippet from "@/components/snippet";
import MainWrapper from "@/layouts/main-wrapper";
import { childRoutesClass, topMargin } from "@/utilities";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SnippetProps } from "@/types/api-types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  
const Snippets = () => {
  const router = useRouter();
  const [snippets,setSnippets] = useState([]);
  const [loading,setLoading]  = useState(false);
  useEffect(()=>{
      const getData = async()=>{
        try{
          setLoading(true);
          const response = await fetch('http://localhost:8000/snippets');
          const data = await response.json();
           setSnippets(data.result);
           setLoading(false);
           console.log('data is ',snippets)
        }
        catch(err){
          console.log('something went wrong',err);
          setLoading(false);
        }
      }
      getData();
  },[])
  return (
    <MainWrapper classes={`${childRoutesClass} grid grid-cols-12 gap-3`}>
      {/* Snippets Section */}

      <div
        className={`w-full mx-auto md:mx-0 max-w-md sm:max-w-lg md:max-w-full col-span-12 md:col-span-9 gap-4 flex flex-col mt-${topMargin}`}
      >
     <Tabs
  defaultValue="for-you"
  className="w-full p-0 !ring-0 !outline-none"
>
  <TabsList className="w-full p-0 bg-bgCard">
    <TabsTrigger
      value="for-you"
      className="flex-1 h-full m-0 rounded-md data-[state=active]:bg-bgHover !ring-0 !outline-none"
    >
      For You
    </TabsTrigger>
    <TabsTrigger
      value="following"
      className="flex-1 h-full m-0 rounded-md data-[state=active]:bg-bgHover !ring-0 !outline-none focus-within:!outline"
    >
      Following
    </TabsTrigger>
  </TabsList>
  <TabsContent value="for-you" className="flex-1 flex flex-col gap-6  !py-0 m-0 relative top-6">
    {loading ? "Loading data":snippets?.map((snippet,index)=>(
      <Snippet key={index} snippet={snippet}/>
       
    ))}
  </TabsContent>
  <TabsContent value="following" className="flex-1 flex flex-col gap-6  !py-0 m-0 relative top-6">
     <div>following snippets</div>
  </TabsContent>
</Tabs>

      </div>

      {/* Fixed Sidebar Section */}
      <div className="hidden md:flex md:col-span-3 flex-col">
        <div
          className="sticky top-14 px-2 py-3 flex flex-col gap-3  border-l "
          style={{ height: "calc(100vh - 3.5rem)" }}
        >
          <Button
            size="sm"
            variant="outline"
            className="!ring-0 w-full !outline-none !border-none focus:!outline-none bg-green-800 hover:bg-green-800 "
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

// test commit
