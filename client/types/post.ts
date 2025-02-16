import { User } from "./user";
export interface CommentData {
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}
type Like = {
  userIds: string[];
  count: number;
  user: string;
};
export type Post = {
  _id: string;
  user: User;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
  isBookmarked: boolean;
  likeCount: number;
  __v: number;

  commentCount: number;
  bookmarkUserIds: string[];
  comments?: Comment[];
};

export type CommentType = {
  _id: string;
  post: string;
  text: string;
  likes: string[];
  createdAt: string;
  userDetails: {
    avatar: string;
    username: string;
    _id: string;
  };
};
