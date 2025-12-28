export interface SnippetType {
  _id: string;
  title: string;
  username: string;
  avatar: string;
  programmingLanguage: string;
  description: string;
  tags: string[];
  isPublic: boolean;
  complexity: "beginner" | "intermediate" | "advanced";
  allowComments: boolean;
  allowForks: boolean;
  resource?: string;
  code: string;
  user: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  __v: number;
}
