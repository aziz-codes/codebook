import {
  UserX,
  Ban,
  Flag,
  AlertCircle,
  Bomb,
  MessageSquareWarning,
  Copyright,
  HelpCircle,
  LoaderCircle,
} from "lucide-react";
export const postReportReasons = [
  {
    id: "irrelevant",
    icon: <AlertCircle className="h-5 w-5 text-yellow-400" />,
    title: "Irrelevant or low-quality",
    description: "Not helpful or relevant to most developers.",
  },
  {
    id: "spam",
    icon: <Bomb className="h-5 w-5 text-orange-400" />,
    title: "Spam or misleading content",
    description: "Unwanted advertising, repetitive, or deceptive content.",
  },
  {
    id: "harassment",
    icon: <MessageSquareWarning className="h-5 w-5 text-amber-400" />,
    title: "Harassment or offensive behavior",
    description: "Insulting, threatening, or inappropriate conduct.",
  },
  {
    id: "copyright",
    icon: <Copyright className="h-5 w-5 text-blue-400" />,
    title: "Plagiarism or intellectual property violation",
    description: "Unauthorized use of code, ideas, or other content.",
  },
  {
    id: "other",
    icon: <HelpCircle className="h-5 w-5 text-gray-400" />,
    title: "Other",
    description: "Any other issue not listed above.",
  },
];

export const commentReportReasons = [
  {
    id: "spam",
    icon: <Bomb className="h-5 w-5 text-orange-400" />,
    title: "Spam",
    description: "Unwanted or repetitive promotion or links.",
  },
  {
    id: "harassment",
    icon: <MessageSquareWarning className="h-5 w-5 text-amber-400" />,
    title: "Harassment or offensive behavior",
    description: "Rude, abusive, or inappropriate language.",
  },
  {
    id: "off-topic",
    icon: <AlertCircle className="h-5 w-5 text-yellow-400" />,
    title: "Off-topic",
    description: "Not relevant to the discussion or post.",
  },
  {
    id: "other",
    icon: <HelpCircle className="h-5 w-5 text-gray-400" />,
    title: "Other",
    description: "Any other issue not listed above.",
  },
];
