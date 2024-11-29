"use client"
import UserCard from '@/components/uers/card'
import { useSession } from 'next-auth/react'
import React from 'react'

const Test = () => {
  const {data:session} = useSession();
  return (
    <div className="flex flex-wrap gap-3">
  <UserCard name="Aziz" username="azizcodes" avatar={session?.user.image as string} _id="" />
  <UserCard name="Aziz" username="azizcodes" avatar={session?.user.image as string} _id="" />
  <UserCard name="Aziz" username="azizcodes" avatar={session?.user.image as string} _id="" />
  <UserCard name="Aziz" username="azizcodes" avatar={session?.user.image as string} _id="" />
  <UserCard name="Aziz" username="azizcodes" avatar={session?.user.image as string} _id="" />
  {/* Add more UserCard components as needed */}
</div>

  )
}

export default Test