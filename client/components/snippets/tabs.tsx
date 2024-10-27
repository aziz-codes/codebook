import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const SnippetTab = () => {
  return (
    <Tabs defaultValue="for-you" className="w-full p-0">
    <TabsList className='w-full p-0 border-2 '>
      <TabsTrigger value="for-you" className='flex-1 h-full m-0 rounded-md'>For You</TabsTrigger>
      <TabsTrigger value="following">Following</TabsTrigger>
    </TabsList>
    <TabsContent value="for-you" className='flex-1'>For you Tab</TabsContent>
    <TabsContent value="following">Following Tab</TabsContent>
  </Tabs>
  
  )
}

export default SnippetTab