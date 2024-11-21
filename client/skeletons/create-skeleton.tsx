import React from 'react'

const CreateSkeleton = () => {
  return (
    <div className="max-w-full bg-semiDark p-4 rounded-lg shadow-md mb-3 animate-pulse">
  {/* Top Section: Textbox and user icon */}
  <div className="flex items-center gap-3">
    {/* User Avatar */}
    <div className="min-w-10 h-10 w-10 rounded-full bg-gray-700"></div>
    {/* Input Placeholder */}
    <div className="w-full bg-gray-800 rounded-full px-4 py-2"></div>
  </div>

  {/* Divider */}
  <div className="border-t border-gray-700 my-4"></div>

  {/* Bottom Section: Options */}
  <div className="flex justify-between text-sm gap-3">
    {/* Snippet Button */}
    <div className="flex items-center justify-center sm:justify-start gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-md flex-1">
      <div className="h-6 w-6 bg-gray-800 rounded-full"></div>
      <div className="hidden sm:block w-16 h-3 bg-gray-800 rounded"></div>
    </div>
    {/* Discussion Button */}
    <div className="flex items-center justify-center sm:justify-start gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-md flex-1">
      <div className="h-6 w-6 bg-gray-800 rounded-full"></div>
      <div className="hidden sm:block w-20 h-3 bg-gray-800 rounded"></div>
    </div>
    {/* Bounty Button */}
    <div className="flex items-center justify-center sm:justify-start gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-md flex-1">
      <div className="h-6 w-6 bg-gray-800 rounded-full"></div>
      <div className="hidden sm:block w-16 h-3 bg-gray-800 rounded"></div>
    </div>
  </div>
</div>

  )
}

export default CreateSkeleton