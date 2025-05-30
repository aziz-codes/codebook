import React from "react";
import { DollarSign, User, Calendar, Clock } from "lucide-react";
import SingleAvatar from "../single-avatar";
import Image from "next/image";
const BountyCard: React.FC = () => {
  return (
    <div className="max-w-md   bg-bgCard text-white rounded-lg shadow-lg overflow-hidden p-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-400">Featured</span>
        <span className="text-sm bg-blue-600 text-white py-1 px-3 rounded-full">
          In Process
        </span>
      </div>
      <h2 className="text-2xl font-bold mb-2">Fix Bug in Login System</h2>
      <div className="flex items-cener space-x-6">
        <div className="flex items-center mb-4 space-x-2">
          <SingleAvatar />
          <div>
            <p className="text-sm text-gray-400">Manager</p>
            <p className="text-sm font-medium">John Doe</p>
          </div>
        </div>
        <div className="flex items-center mb-6">
          <DollarSign className="w-6 h-6 text-green-400 mr-2" />
          <div>
            <p className="text-sm text-gray-400">Reward</p>
            <p className="text-sm font-medium">$200</p>
          </div>
        </div>
      </div>
      <p className="text-gray-400 mb-6">
        We are facing an issue with the login system where users cannot log in
        using social media accounts. We need someone to debug and fix this
        issue.
      </p>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Calendar className="w-6 h-6 text-gray-400 mr-2" />
          <div>
            <p className="text-sm text-gray-400">Posted on</p>
            <p className="text-sm font-medium">May 20, 2024</p>
          </div>
        </div>
        <div className="flex items-center">
          <Clock className="w-6 h-6 text-red-400 mr-2" />
          <div>
            <p className="text-sm text-gray-400">Deadline</p>
            <p className="text-sm font-medium">June 1, 2024</p>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <span className="text-sm font-medium text-gray-400">Participants:</span>
        <div className="flex ml-2">
          <Image
            src="https://reqres.in/img/faces/9-image.jpg"
            alt="participant"
            className=" rounded-full border-2 border-gray-900"
            height={32}
            width={32}
          />
          <Image
            src="https://reqres.in/img/faces/10-image.jpg"
            alt="participant"
            className="w-8 h-8 rounded-full border-2 border-gray-900 -ml-2"
            height={32}
            width={32}
          />
          <div className="w-8 h-8 rounded-full border-2 border-gray-900 bg-blue-600 text-white flex items-center justify-center -ml-2">
            +3
          </div>
        </div>
      </div>
      <button className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors duration-300">
        View Bounty Details
      </button>
    </div>
  );
};

export default BountyCard;
//test commit
