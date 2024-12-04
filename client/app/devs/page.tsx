import DevCard from "@/components/uers/dev-card";
import MainWrapper from "@/layouts/main-wrapper";
import { getRequest } from "@/services";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
 
type API={
  users: any[],

}
const Peoples = async(req:NextRequest) => {
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
 
  const res:API = await getRequest(`/user/developers/${token?.id}`);
   console.log('res is ',res.users);
  return <MainWrapper classes="flex flex-wrap gap-3">
       {res.users.map((user,index)=>(
        <DevCard user={user} key={index}/>
       ))}
   
  </MainWrapper>;
};

export default Peoples;
