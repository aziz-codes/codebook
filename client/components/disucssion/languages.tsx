import React from 'react'
import {languages} from '@/constants/discussion/discussion-items'
const Lanuages = () => {
  return (
    <div className='h-[75vh] overflow-y-auto pr-2'>
    {languages.map((language,index)=>(
        <div className='flex items-center justify-between px-2 text-xs hover:bg-bgHover py-1.5  rounded-md cursor-pointer pr-4' key={index}>
        
            <label>{language.name}</label> <span>{language.count}</span>
        </div>
    ))}
    </div>
  )
}

export default Lanuages