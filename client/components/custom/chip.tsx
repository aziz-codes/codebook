import React from 'react'

const Chip = ({text}:{text:string}) => {
  return (
    <div className='px-1 rounded-full border w-full py-1 text-center max-w-20 text-xs font-light whitespace-nowrap overflow-hidden text-ellipsis'>{text}</div>
  )
}

export default Chip