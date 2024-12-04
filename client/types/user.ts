export type User = {
    _id: string;
    name: string;
    avatar: string;
    username: string;
    followers?: string[];
    following?: string[];
  };
export type Follower={
  _id: string;
  followerId: string;
}
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
    followers: Follower[];
    following: number;
  };

  export type DevCardUser={
    _id: string;
    username: string;
    name: string;
    avatar: string;
    bio: string;
    tagline: string;
    follower: number;
    following: number;
    isFollowing: boolean;

  }