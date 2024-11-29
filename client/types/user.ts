export type User = {
    _id: string;
    name: string;
    avatar: string;
    username: string;
  };

  export type UserProfileType = {
   user:{
    _id: string;
    username: string;
    name: string;
    avatar: string;
    bio: string;
    tagline: string;
   }
    postCount: number;
    snippetCount: number;
    followers: number;
    following: number;
  };