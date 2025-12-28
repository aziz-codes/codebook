import { users } from "@/constants/users";
interface Language {
  name: string;
  count: number;
  color: string;
}

export const languages: Language[] = [
  { name: "JavaScript", count: 14, color: "bg-yellow-500" },
  { name: "Python", count: 22, color: "bg-green-500" },
  { name: "Java", count: 18, color: "bg-red-500" },
  { name: "TypeScript", count: 9, color: "bg-blue-500" },
  { name: "C++", count: 11, color: "bg-indigo-500" },
  { name: "C#", count: 16, color: "bg-violet-500" },
  { name: "Go", count: 7, color: "bg-blue-600" },
  { name: "Ruby", count: 5, color: "bg-rose-500" },
  { name: "PHP", count: 12, color: "bg-purple-500" },
  { name: "Swift", count: 6, color: "bg-orange-400" },
  { name: "Kotlin", count: 4, color: "bg-pink-500" },
  { name: "R", count: 3, color: "bg-teal-500" },
  { name: "Rust", count: 8, color: "bg-orange-600" },
  { name: "Objective-C", count: 5, color: "bg-slate-500" },
  { name: "Scala", count: 2, color: "bg-red-600" },
  { name: "Shell", count: 6, color: "bg-gray-700" },
  { name: "Dart", count: 3, color: "bg-cyan-500" },
  { name: "Perl", count: 4, color: "bg-fuchsia-500" },
  { name: "Lua", count: 2, color: "bg-emerald-500" },
  { name: "Haskell", count: 1, color: "bg-purple-700" },
  { name: "Elixir", count: 1, color: "bg-indigo-600" },
  { name: "Clojure", count: 2, color: "bg-lime-500" },
  { name: "MATLAB", count: 5, color: "bg-yellow-600" },
  { name: "VBA", count: 2, color: "bg-green-700" },
  { name: "Groovy", count: 3, color: "bg-blue-700" },
  { name: "Fortran", count: 1, color: "bg-pink-600" },
  { name: "Ada", count: 1, color: "bg-amber-500" },
  { name: "Erlang", count: 1, color: "bg-red-700" },
  { name: "COBOL", count: 1, color: "bg-gray-600" },
  { name: "VBScript", count: 1, color: "bg-indigo-700" },
  { name: "Other", count: 0, color: "bg-gray-400" },
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
    description: "how to configure docker in windows?",
    tags: ["docker", "windows", "suggestion"],
    comments: 45,
    date: "01 month ago",
    isAnswered: true,
  },
];
