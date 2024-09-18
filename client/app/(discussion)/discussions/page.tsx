"use client"
import React from 'react'
 
import SearchInput from '@/components/custom/search-input'
import DiscussionCard from '@/components/disucssion/discussion-card'
import Lanuages from '@/components/disucssion/languages'

const Discussion = () => {
  return (
    <>
    <div className='flex items-center gap-3 pb-3'>
       <SearchInput value='' onChange={()=>{}}/>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
    
      <div className='hidden md:flex md:col-span-3 border flex-col gap-3'>
        <h4>Categories</h4>
        <Lanuages />
      </div>

    
      <div className='col-span-12 md:col-span-6  flex flex-col gap-3'>
       <DiscussionCard />
       <DiscussionCard />
       <DiscussionCard />
      </div>

     
      <div className='hidden md:flex md:col-span-3 border flex-col gap-3'>
        Top Contributors
      </div>
    </div>
    </>
  )
}

export default Discussion
