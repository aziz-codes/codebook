"use client"
import React,{useState,useRef} from 'react'
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
import { Button } from '@/components/ui/button'
import Image from 'next/image'
const CreatePost = ({children}:{children:React.ReactNode}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [image,setImage] = useState<null | string>(null)
    const {data:session} = useSession();
    const handleBtnClick = ()=>{
      if(fileRef.current){
        fileRef.current.click();
      }
    }
    const handleFileChange =(event:React.ChangeEvent<HTMLInputElement>)=>{
      const file = event.target.files?.[0];
      if(file){
        const fileReader = new FileReader();
        fileReader.onload = (e)=>{
          if(e.target?.result){
            setImage(e.target.result as string);
          }
        }
        fileReader.readAsDataURL(file);
      }
    }
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      {children}
    </AlertDialogTrigger>
    <AlertDialogContent className='!ring-0 !outline-none'>
      <div className='flex flex-col max-h-96 overflow-y-auto'>
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
        <div className='w-full border flex flex-col'>
           <Button onClick={handleBtnClick}>Add images</Button>
           <input type='file' hidden   accept="image/png, image/jpeg, image/jpg" ref={fileRef} onChange={handleFileChange}/>
          {image &&  <Image height={200} width={300} src={image} alt="attached photo"/>}
        </div>
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