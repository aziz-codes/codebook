import React from 'react'

const ModalCommentSkeleton = () => {
  return (
    <div className="flex space-x-2 py-2 text-white rounded-lg shadow-sm group animate-pulse">
  {/* Avatar Skeleton */}
  <div className="w-8 h-8 bg-gray-700 rounded-full"></div>

  {/* Comment Content Skeleton */}
  <div className="flex-1 space-y-2">
    {/* Header Skeleton */}
    <div className="flex items-center justify-between">
      <div className="w-20 h-4 bg-gray-700 rounded"></div>
      <div className="w-4 h-4 bg-gray-700 rounded"></div>
    </div>

    {/* Text Skeleton */}
    <div className="w-full h-4 bg-gray-700 rounded"></div>

    {/* Footer Skeleton */}
    <div className="flex items-center space-x-4">
      <div className="w-16 h-3 bg-gray-700 rounded"></div>
      <div className="w-8 h-4 bg-gray-700 rounded"></div>
      <div className="w-12 h-4 bg-gray-700 rounded"></div>
    </div>
  </div>
</div>

  )
}

export default ModalCommentSkeleton