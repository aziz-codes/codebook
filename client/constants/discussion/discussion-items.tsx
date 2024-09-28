import { users } from "@/constants/users";
interface Language {
  name: string;
  count: number;
}

export const languages: Language[] = [
  {
    name: "JavaScript",
    count: 14,  
  },
  {
    name: "Python",
    count: 22,
  },
  {
    name: "Java",
    count: 18,
  },
  {
    name: "TypeScript",
    count: 9,
  },
  {
    name: "C++",
    count: 11,
  },
  {
    name: "C#",
    count: 16,
  },
  {
    name: "Go",
    count: 7,
  },
  {
    name: "Ruby",
    count: 5,
  },
  {
    name: "PHP",
    count: 12,
  },
  {
    name: "Swift",
    count: 6,
  },
  {
    name: "Kotlin",
    count: 4,
  },
];

export const discussions = [
  {
    avatar: users[0].avatar,
    description:
      "i having an issue with streaming my camera rtsp using node server and react in the frontend",
    tags: ["node js", "react", "webrtc"],
    comments: 12,
    date: "14 days ago",
    isAnswered: true,
  },
  {
    avatar: users[1].avatar,
    description:
      "getting cors policy error while accessing server localhost:50000",
    tags: ["node js", "express", "frontend"],
    comments: 31,
    date: "1 days ago",
    isAnswered: false,
  },
  {
    avatar: users[3].avatar,
    description:
      "how to configure docker in windows?",
    tags: ["docker", "windows", "suggestion"],
    comments: 45,
    date: "01 month ago",
    isAnswered: true,
  },
];
