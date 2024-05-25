import React from "react";
import { Gem } from "lucide-react";
import { Label } from "./ui/label";
interface Resource {
  title: string;
  url: string;
}

interface BountyCardProps {
  title: string;
  category: string;
  description: string;
  reward: number;
  postedBy: string;
  postedDate: string;
  deadline: string;
  status: "Open" | "Claimed" | "Completed";
  resources?: Resource[];
}

const BountyCard: React.FC<BountyCardProps> = ({
  title,
  category,
  description,
  reward,
  postedBy,
  postedDate,
  deadline,
  status,
}) => {
  return (
    <div className="max-w-sm  bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <span className="bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
            {category}
          </span>
        </div>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="mt-4 flex items-center gap-2">
          <Label className="text-black text-lg font-bold">Bounty</Label>
          <span className="text-lg font-semibold text-green-600">
            {reward}$
          </span>
        </div>
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center">
            <span>Posted by: {postedBy}</span>
          </div>
          <div>
            <span>Posted on: {postedDate}</span>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-100 flex justify-between items-center">
        <span className="text-sm text-gray-600">Deadline: {deadline}</span>
        <span
          className={`text-sm font-semibold ${
            status === "Open" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
        <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
          Claim Bounty
        </button>
      </div>
    </div>
  );
};

export default BountyCard;
