"use client";

import { useState, useMemo } from "react";
import UserCard from "@/components/users/card";
import MainWrapper from "@/layouts/main-wrapper";
import { getRequest } from "@/services";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type API = {
  users: User[];
};

const Peoples = () => {
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "following" | "not-following"
  >("all");

  const { isLoading, data, isError } = useQuery<API, Error>({
    queryKey: [`${session?.user?.username}-follow-list`],
    queryFn: async () => {
      if (!session?.user?.id) {
        throw new Error("User ID is missing");
      }
      return getRequest(`/user/developers/${session.user.id}`);
    },
    enabled: !!session?.user?.id,
  });

  // Filter users based on search and filter status
  const filteredUsers = useMemo(() => {
    if (!data?.users) return [];

    let filtered = data.users;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name?.toLowerCase().includes(query) ||
          user.username?.toLowerCase().includes(query) ||
          user.bio?.toLowerCase().includes(query) ||
          user.tagline?.toLowerCase().includes(query)
      );
    }

    // Filter by follow status
    if (filterStatus === "following") {
      filtered = filtered.filter(
        (user) =>
          user.isFollowing ||
          user.followers?.includes(session?.user.id as string)
      );
    } else if (filterStatus === "not-following") {
      filtered = filtered.filter(
        (user) =>
          !user.isFollowing &&
          !user.followers?.includes(session?.user.id as string)
      );
    }

    return filtered;
  }, [data?.users, searchQuery, filterStatus, session?.user.id]);

  // Show a loading state while session data is being loaded
  if (status === "loading") return <h3>Loading...</h3>;

  // Handle unauthenticated users
  if (!session?.user) return <h3>You need to log in to view this page.</h3>;

  // Handle loading state for the query
  if (isLoading) return <h3>Loading users...</h3>;

  // Handle errors from the query
  if (isError) return <h3>Something went wrong while fetching users.</h3>;

  // Handle case where no users are found
  if (!data?.users?.length) return <h3>No developers found.</h3>;

  const hasActiveFilters = searchQuery.trim() || filterStatus !== "all";

  return (
    <div className="w-full space-y-6">
      {/* Search and Filter Section */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Developers</h1>
          <p className="text-muted-foreground">
            Discover and connect with developers from around the world
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, username, bio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={filterStatus}
              onValueChange={(value: "all" | "following" | "not-following") =>
                setFilterStatus(value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Developers</SelectItem>
                <SelectItem value="following">Following</SelectItem>
                <SelectItem value="not-following">Not Following</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Badge */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchQuery}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="h-4 w-4 p-0 hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filterStatus !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {filterStatus === "following" ? "Following" : "Not Following"}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                  className="h-4 w-4 p-0 hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setFilterStatus("all");
              }}
              className="h-7 text-xs"
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredUsers.length} of {data.users.length} developers
        </div>
      </div>

      {/* User Cards Grid */}
      {filteredUsers.length > 0 ? (
        <MainWrapper classes="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <UserCard user={user} key={user._id || user.username} />
          ))}
        </MainWrapper>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No developers found matching your criteria.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setFilterStatus("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Peoples;
