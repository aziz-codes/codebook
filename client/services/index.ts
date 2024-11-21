import { baseUrl } from "@/server-utils";


export const getRequest = async(endpoint:string):Promise<any>=>{
   try{
      const response =  await fetch(`${baseUrl}${endpoint}`);
      const data = await response.json();
      return data;
   }
   catch(err){
    console.log(err);
   }
}


export const postRequest = async(endpoint:string,data:any):Promise<any> =>{
     const res = await fetch(`${baseUrl}${endpoint}`,{
      method: "POST",
       body: JSON.stringify(data)
     },

     
   )
   return res;
}