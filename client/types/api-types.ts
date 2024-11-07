export interface SnippetProps{
 id: string;
 title: string;
 programmingLanguage:string;
 description: string;
 tags:string[];
 resource: string;
 code: string;
  user:{
    id:string;
    name:string;
    avatar:string;
    username:string;
    createdAt:string;
  }
}
type User = {
  _id: string;
  name: string;
  avatar: string;
  username: string;
};


export type PostProps = {
  _id: string;
  user: User;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};