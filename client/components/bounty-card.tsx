import React from "react";
import { Label } from "./ui/label";
interface Resource {
  title: string;
  url: string;
}
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

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
    <Card className="max-w-sm ">
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center text-sm text-gray-600 py-2">
          <div className="flex items-center">
            <span>Posted by: {postedBy}</span>
          </div>
          <div>
            <span>Posted on: {postedDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Label className="text-lg font-bold">Bounty</Label>

          <span className="text-lg font-semibold text-green-600">
            {reward}$
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="w-full   border-gray-200  flex justify-between items-center">
          <span className="text-sm text-gray-600">Deadline: {deadline}</span>
          <span
            className={`text-sm font-semibold ${
              status === "Open" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="mt-4 w-full flex justify-end">
          <Button size="sm">Bounty Info</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BountyCard;
