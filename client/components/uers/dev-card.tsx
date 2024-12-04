import { DevCardUser } from "@/types/user"
import React from "react"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"

type UserProps={
  user: DevCardUser
}
const DevCard:React.FC<UserProps> = ({user}) => {
  return (
    <Card className="w-[300px] transition-all duration-300 ease-in-out hover:shadow-lg h-auto max-h-max">
    <CardContent className="pt-6">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-sm text-muted-foreground capitalize">{user.tagline}</p>
        </div>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div>
            <span className="font-semibold text-foreground">{user.follower}</span> followers
          </div>
          <div>
            <span className="font-semibold text-foreground">{user.following}</span> following
          </div>
         
        </div>
      </div>
    </CardContent>
    <CardFooter className="justify-center">
      <Button 
        variant={user.isFollowing ? 'outline': 'default'}
        // onClick={handleFollow}
      >
     {user.isFollowing ? "Following": "Follow"}
      </Button>
    </CardFooter>
  </Card>
  )
}

export default DevCard