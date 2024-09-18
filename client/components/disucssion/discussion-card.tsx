import React from 'react'
import ProfileAvatar from '../profile-avatar';
interface Users{
    id: number;
    email:string;
    first_name:string;
    last_name:string;
    avatar: string;
}
const DiscussionCard = async() => {
    const res = await fetch('https://reqres.in/api/users');
    const data = await res.json();
    const users:Users[] = data.data;
     
  return (
    <div className='flex flex-col gap-3'>
       {users.map((user,index)=>(
         <ProfileAvatar username={user.first_name} image={user.avatar} key={index}/>
       ))}
    </div>
  )
}

export default DiscussionCard