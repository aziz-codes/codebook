import React from 'react'

const PostSkeleton = () => {
  return (
    <div className="rounded-md border bg-bgCard mb-4 animate-pulse">
    {/* User Info and Action Button */}
    <div className="flex justify-between items-center px-4 py-4">
      <div className="flex items-center gap-2">
        {/* Avatar */}
        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
        <div className="flex flex-col space-y-1">
          <div className="w-24 h-4 bg-gray-700 rounded"></div>
          <div className="w-16 h-3 bg-gray-800 rounded"></div>
        </div>
      </div>
      {/* Ellipsis */}
      <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
    </div>
  
    {/* Post Content */}
    <div className="px-4 mb-4">
      <div className="w-full h-5 bg-gray-700 rounded mb-2"></div>
      <div className="w-3/4 h-5 bg-gray-700 rounded"></div>
    </div>
  
    {/* Post Image */}
    <div className="w-full h-96 bg-gray-600 rounded"></div>
  
    {/* Post Actions */}
    <div className="px-4 py-3 flex items-center justify-between select-none border-t">
      {/* Likes */}
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
        <div className="w-10 h-3 bg-gray-800 rounded"></div>
      </div>
  
      {/* Comments */}
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
        <div className="w-16 h-3 bg-gray-800 rounded"></div>
      </div>
  
      {/* Bookmark */}
      <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
    </div>
  
     
  </div>
  
  )
}

export default PostSkeleton