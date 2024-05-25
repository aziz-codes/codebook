import React from "react";
import BountyCard from "@/components/bounty-card";

interface Resource {
  title: string;
  url: string;
}

interface Bounty {
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

const Bounties: React.FC = () => {
  const bounties: Bounty[] = [
    {
      title: "Fix Bug in Login System",
      category: "JavaScript",
      description:
        "We are facing an issue with the login system where users cannot log in using social media accounts. We need someone to debug and fix this issue.",
      reward: 200,
      postedBy: "JohnDoe",
      postedDate: "May 20, 2024",
      deadline: "June 1, 2024",
      status: "Claimed",
      resources: [
        {
          title: "GitHub Issue",
          url: "https://github.com/example/repo/issues/123",
        },
        { title: "Documentation", url: "https://example.com/docs" },
      ],
    },
    // Add more bounties here...
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 place-items-center md:place-items-start">
      {bounties.map((bounty, index) => (
        <BountyCard key={index} {...bounty} />
      ))}
    </div>
  );
};

export default Bounties;
