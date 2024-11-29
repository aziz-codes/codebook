"use client"
import UserCard from '@/components/uers/card'
import { Button } from '@/components/ui/button'
import { getRequest } from '@/services'
import { User } from '@/types/user'
import ButtonLoader from '@/utils/components/button-loader'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
 
const getFollowers = () => {
    const {data:session} = useSession();
    const [loading,setLoading] = useState(false);
const [data,setData] = useState<User[]>([]);
    useEffect(()=>{
           const getData = async()=>{
            setLoading(true);
            const res = await getRequest(`/user/get-top-followed-users/${session?.user.id}`);
           
            setData(res);
            setLoading(false);
           }
           getData();
    },[session])
  const handleRefresh = ()=>{
    window.location.href="/"
  }
  return (
    <div className="flex flex-col gap-4 h-full  ">
        <div className='flex justify-center items-center'>
        {loading ? <ButtonLoader />: null}
        </div>
    <div className="flex flex-col overflow-y-auto scrollbar-none gap-4 justify-center">
    
      {data.map((user, index) => (
        <UserCard user={user} key={index} sessionId={session?.user.id} username={session?.user.username}/>
      ))}      
    </div>
  
    {/* Continue button */}
    <Button variant="default" className="mt-4 !ring-0 !outline-none" onClick={handleRefresh}>
      Continue
    </Button>
  </div>
  
  )
}

export default getFollowers