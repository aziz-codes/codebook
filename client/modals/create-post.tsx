"use client"
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
 
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useSession } from 'next-auth/react'
import { Label } from '@/components/ui/label'
import TextBox from '@/components/text-box'
const CreatePost = ({children}:{children:React.ReactNode}) => {
    const {data:session} = useSession();
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      {children}
    </AlertDialogTrigger>
    <AlertDialogContent >
      <div className='flex flex-col'>
        <div className='flex gap-2 items-center'>
        <Avatar className='h-11 w-11'>
            <AvatarFallback>{session?.user.name?.slice(0,2)}</AvatarFallback>
            <AvatarImage src={session?.user.image as string} alt={session?.user.username as string} className='h-full w-full'/>
         </Avatar>
         <div className='flex flex-col'>
            <Label className='font-semibold'>{session?.user.name}</Label>
            <span className='text-xs italic'>{session?.user.username}</span>
         </div>
        </div>
        <TextBox placeholder='What’s on your mind today?'/>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default CreatePost