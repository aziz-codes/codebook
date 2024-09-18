import React from 'react'
import {languages} from '@/constants/discussion/discussion-items'
const Lanuages = () => {
  return (
    <>
    {languages.map((language,index)=>(
        <div className='flex items-center' key={index}>
        
            <label>{language.name}</label>
        </div>
    ))}
    </>
  )
}

export default Lanuages