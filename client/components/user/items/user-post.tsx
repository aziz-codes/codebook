import React from 'react'

const UserPost = ({hasImage}:{hasImage?:boolean}) => {
  return (
    <div className={`rounded-md border p-4 ${hasImage ? 'h-[320px]' : 'h-[160px]'}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-sm">Username</span>
        <span className="text-xs text-gray-500">2h ago</span>
      </div>
      <div className={`content ${hasImage ? 'h-[180px]' : 'h-[100px]'}`}>
        {hasImage ? (
          <div className="bg-gray-300 h-full w-full rounded-md"></div> // Placeholder for the image
        ) : (
          <p className="text-sm text-gray-700">Your post content goes here</p> // Text content when no image
        )}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>5 Likes</span>
        <span>2 Comments</span>
      </div>
    </div>

  
  
  )
}

export default UserPost