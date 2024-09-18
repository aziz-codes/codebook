import React from 'react'
import {languages} from '@/constants/discussion/discussion-items'
const Lanuages = () => {
  return (
    <>
    {languages.map((language,index)=>(
        <div className='flex items-center justify-between px-2 text-xs hover:bg-bgHover py-1.5 rounded-md cursor-pointer' key={index}>
        
            <label>{language.name}</label> <span>{language.count}</span>
        </div>
    ))}
    </>
  )
}

export default Lanuages