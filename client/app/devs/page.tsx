"use client";

import UserCard from "@/components/users/card";
import MainWrapper from "@/layouts/main-wrapper";
import { getRequest } from "@/services";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

type API = {
  users: User[];
};

const Peoples = () => {
  const { data: session, status } = useSession();
  const { isLoading, data, isError } = useQuery<API, Error>({
    queryKey: [`${session?.user?.username}-follow-list`],
    queryFn: async () => {
      if (!session?.user?.id) {
        throw new Error("User ID is missing"); // Ensure query doesn't run without a valid ID
      }
      return getRequest(`/user/developers/${session.user.id}`);
    },
    enabled: !!session?.user?.id, // Run query only if session.user.id is defined
  });
  // Show a loading state while session data is being loaded
  if (status === "loading") return <h3>Loading...</h3>;

  // Handle unauthenticated users
  if (!session?.user) return <h3>You need to log in to view this page.</h3>;

  // Fetch data using React Query

  // Handle loading state for the query
  if (isLoading) return <h3>Loading users...</h3>;

  // Handle errors from the query
  if (isError) return <h3>Something went wrong while fetching users.</h3>;

  // Handle case where no users are found
  if (!data?.users?.length) return <h3>No developers found.</h3>;

  // Render the user cards
  return (
    <MainWrapper classes="flex flex-wrap gap-3">
      {data.users.map((user) => (
        <UserCard user={user} key={user._id || user.username} />
      ))}
    </MainWrapper>
  );
};

export default Peoples;
