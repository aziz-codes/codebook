import React from 'react';
import { Edit3, Code, MessageSquare, DollarSign } from 'lucide-react'; // Icons for Post, Snippet, Discussion, Bounty

const Create = () => {
  return (
    <div className="max-w-full bg-semiDark p-4 rounded-lg shadow-md">
      {/* Top: Textbox and user icon */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-500">
          {/* User's avatar */}
          <img
            src="/path/to/avatar.jpg"
            alt="User Avatar"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <input
          type="text"
          placeholder="What's on your mind, Aziz?"
          className="w-full bg-bgCard text-gray-300 rounded-full px-4 py-2 focus:outline-none"
        />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-4"></div>

      {/* Bottom: Options (Post, Snippet, Discussion, Bounty) */}
      <div className="flex justify-between text-sm">
        <button className="flex items-center gap-2 text-blue-500 hover:text-blue-400">
          <Edit3 className="h-6 w-6" />
          <span>Post</span>
        </button>
        <button className="flex items-center gap-2 text-green-500 hover:text-green-400">
          <Code className="h-6 w-6" />
          <span>Snippet</span>
        </button>
        <button className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400">
          <MessageSquare className="h-6 w-6" />
          <span>Discussion</span>
        </button>
        <button className="flex items-center gap-2 text-purple-500 hover:text-purple-400">
          <DollarSign className="h-6 w-6" />
          <span>Bounty</span>
        </button>
      </div>
    </div>
  );
};

export default Create;
