import { User } from '@/types/user'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { postRequest } from '@/services'
import { useMutation,useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import ButtonLoader from '@/utils/components/button-loader'
interface UserProps{
    user: User
    sessionId: string | undefined;
    username: string | undefined |null;
}
const UserCard:React.FC<UserProps> = ({user,sessionId,username }) => {
    const queryClient = useQueryClient();
    const {toast} = useToast();
    const [loading,setLoading] = useState(false);
    const postFollower =async(id:string)=>{
        if(!id) return;
        const payload = {
            followerId: sessionId
        }
        setLoading(true)
        await postRequest(`/user/follow/${id}`,payload)
     }
       const {mutate} = useMutation({
         mutationFn: postFollower,
         onSuccess:()=>{
           queryClient.invalidateQueries({ queryKey: ["userProfile", username] });
           setLoading(false)
         },
         onError: (error) => {
            toast({
             description: "Something went wrong, please try again",
           
            })
            setLoading(false)
         }
       })
    const handleFollow = (id:string)=>{
        mutate(id)
    }
  return (
    <div className="h-24 max-w-full w-full rounded-md border shadow-md flex justify-between px-4 py-4 items-center">
    <div className="flex items-center gap-3">
      <img 
        src={user.avatar} 
        alt={user.username} 
        className="w-14 h-14 rounded-full object-cover border border-gray-300" 
      />
      <div className="flex flex-col -gap-1.5">
        <h4 className="text-lg font-semibold">{user.name}</h4>
        <p className="text-xs text-gray-500">{user.username}</p>
      </div>
    </div>
    <Button variant="outline" className="bg-electric rounded-full hover:bg-blue-600 !ring-0 !outline-none" onClick={()=>handleFollow(user._id)}>
       {loading ? <ButtonLoader />: "Follow"}
    </Button>
  </div>
  )
}

export default UserCard