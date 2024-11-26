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
    __v: number;
    likes: Like[];
    commentCount: number;
  };
  

  export type CommentType ={
    _id: string;
    postId: string;
    text: string;
    createdAt: string;
    userDetails:{
      avatar:string;
      username:string;
    }
  }