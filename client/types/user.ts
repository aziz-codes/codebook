export type User = {
    _id: string;
    name: string;
    avatar: string;
    username: string;
  };

  export type UserProfileType = {
   user:{
    username: string;
    name: string;
    avatar: string;
   }
    postCount: number;
    snippetCount: number;
  };