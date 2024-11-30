"use client"
import React, { useEffect, useState } from 'react'
import UserCard from '@/components/uers/card'
import { Button } from '@/components/ui/button'
import { getRequest } from '@/services'
import { User } from '@/types/user'
import ButtonLoader from '@/utils/components/button-loader'
import { useSession } from 'next-auth/react'
 import { expertise } from '@/utils/utils'

 type Expertise={
  label: string,
  items: string[]
 }
const getFollowers = () => {
    const {data:session} = useSession();
    const [loading,setLoading] = useState(false);
const [data,setData] = useState<User[]>([]);
const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
 
const [search,setSearch] = useState("");

 

const handleChipSelect = (chip: string) => {
  setSelectedExpertise((prev) =>
    prev.includes(chip) ? prev.filter((item) => item !== chip) : [...prev, chip]
  );
};

const filteredExpertise = expertise.map((category) => ({
  ...category,
  items: category.items.filter((item: string) =>
    item.toLowerCase().includes(search.toLowerCase())
  ),
}));
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
    <div className="flex flex-col h-full  scrollbar-none">
    <div className="flex flex-grow flex-col md:flex-row gap-3 h-[90%]">
      {/* Main Section */}
      <div className="w-full md:w-[80%] max-h-full overflow-y-auto scrollbar-none flex flex-col gap-2">
         {/* loop through expertise */}
         <input type="text" placeholder='Search' className='px-2 py-1.5 rounded-md w-full max-w-sm border outline-none ' value={search} onChange={(e)=>setSearch(e.target.value)} />
         {filteredExpertise.map((category) => (
        <div key={category.label} className="mb-6">
          {/* Category Heading */}
          <h4 className="text-gray-400 font-semibold mb-2">{category.label}</h4>
          
          {/* Chips */}
          <div className="flex flex-wrap gap-2 text-xs">
            {category.items.map((item) => (
              <div
                key={item}
                className={`cursor-pointer px-4 py-1.5 rounded-full text-sm border ${
                  selectedExpertise.includes(item)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => handleChipSelect(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
      </div>

      {/* Suggestions Section */}
      <div className="w-full md:w-[20%] flex flex-col">
        <h4 className='text-center'>Accounts to Follow</h4>
        <div className="flex justify-center items-center mb-4">
          {loading ? <ButtonLoader /> : null}
        </div>
        <div className="flex flex-col overflow-y-auto gap-4 scrollbar-none ">
          {data.map((user, index) => (
            <UserCard
              user={user}
              key={index}
              sessionId={session?.user.id}
              username={session?.user.username}
            />
          ))}
            {data.map((user, index) => (
            <UserCard
              user={user}
              key={index}
              sessionId={session?.user.id}
              username={session?.user.username}
            />
          ))}
        </div>
      </div>
    </div>

    {/* Continue Button */}
    <div className=" flex justify-end border-gray-200 h-[10%] my-3 items-center">
      <Button
        variant="default"
        className="w-full md:w-auto !ring-0 !outline-none"
        onClick={handleRefresh}
      >
        Continue
      </Button>
    </div>
  </div>
  
  )
}

export default getFollowers