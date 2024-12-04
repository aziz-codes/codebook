import React from 'react'
import UserPost from '../items/user-post'

const Posts = () => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
      <UserPost hasImage/>
      <UserPost />
    </div>
  )
}

export default Posts