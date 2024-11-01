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