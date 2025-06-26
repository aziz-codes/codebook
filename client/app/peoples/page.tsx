"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  MapPin,
  Github,
  ExternalLink,
  Users,
  Star,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface Developer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  role: string;
  bio: string;
  location: string;
  experience: string;
  skills: string[];
  followers: number;
  following: number;
  githubUrl: string;
  portfolioUrl: string;
  isVerified: boolean;
}

const developers: Developer[] = [
  {
    id: "1",
    name: "Sarah Chen",
    username: "sarahdev",
    avatar: "/placeholder.svg?height=80&width=80",
    role: "Frontend Developer",
    bio: "Building beautiful UIs with React & TypeScript. Open source enthusiast.",
    location: "San Francisco, CA",
    experience: "Senior",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    followers: 1250,
    following: 340,
    githubUrl: "https://github.com/sarahdev",
    portfolioUrl: "https://sarahchen.dev",
    isVerified: true,
  },
  {
    id: "2",
    name: "Alex Rodriguez",
    username: "alexai",
    avatar: "/placeholder.svg?height=80&width=80",
    role: "AI Engineer",
    bio: "Machine Learning & Deep Learning specialist. Building the future with AI.",
    location: "New York, NY",
    experience: "Senior",
    skills: ["Python", "TensorFlow", "PyTorch", "MLOps"],
    followers: 2100,
    following: 180,
    githubUrl: "https://github.com/alexai",
    portfolioUrl: "https://alexrodriguez.ai",
    isVerified: true,
  },
  {
    id: "3",
    name: "Jordan Kim",
    username: "jordanfullstack",
    avatar: "/placeholder.svg?height=80&width=80",
    role: "Full Stack Developer",
    bio: "End-to-end web applications. Love solving complex problems.",
    location: "Austin, TX",
    experience: "Mid-level",
    skills: ["Node.js", "React", "PostgreSQL", "AWS"],
    followers: 890,
    following: 420,
    githubUrl: "https://github.com/jordanfullstack",
    portfolioUrl: "https://jordankim.dev",
    isVerified: false,
  },
  {
    id: "4",
    name: "Maya Patel",
    username: "mayabackend",
    avatar: "/placeholder.svg?height=80&width=80",
    role: "Backend Developer",
    bio: "Scalable systems architect. Microservices & cloud infrastructure expert.",
    location: "Seattle, WA",
    experience: "Senior",
    skills: ["Go", "Kubernetes", "Docker", "GCP"],
    followers: 1680,
    following: 290,
    githubUrl: "https://github.com/mayabackend",
    portfolioUrl: "https://mayapatel.dev",
    isVerified: true,
  },
  {
    id: "5",
    name: "Chris Thompson",
    username: "chrismobile",
    avatar: "/placeholder.svg?height=80&width=80",
    role: "Mobile Developer",
    bio: "iOS & Android apps that users love. Flutter & React Native specialist.",
    location: "Toronto, ON",
    experience: "Mid-level",
    skills: ["Flutter", "React Native", "Swift", "Kotlin"],
    followers: 720,
    following: 380,
    githubUrl: "https://github.com/chrismobile",
    portfolioUrl: "https://christhompson.dev",
    isVerified: false,
  },
  {
    id: "6",
    name: "Zoe Martinez",
    username: "zoedevops",
    avatar: "/placeholder.svg?height=80&width=80",
    role: "DevOps Engineer",
    bio: "Infrastructure as code. CI/CD pipelines and cloud automation expert.",
    location: "Denver, CO",
    experience: "Senior",
    skills: ["Terraform", "Jenkins", "AWS", "Ansible"],
    followers: 1420,
    following: 210,
    githubUrl: "https://github.com/zoedevops",
    portfolioUrl: "https://zoemartinez.dev",
    isVerified: true,
  },
  {
    id: "7",
    name: "Ryan Foster",
    username: "ryandata",
    avatar: "/placeholder.svg?height=80&width=80",
    role: "Data Scientist",
    bio: "Turning data into insights. ML models and statistical analysis.",
    location: "Boston, MA",
    experience: "Mid-level",
    skills: ["Python", "R", "SQL", "Tableau"],
    followers: 950,
    following: 310,
    githubUrl: "https://github.com/ryandata",
    portfolioUrl: "https://ryanfoster.data",
    isVerified: false,
  },
  {
    id: "8",
    name: "Lisa Wang",
    username: "lisasecurity",
    avatar: "/placeholder.svg?height=80&width=80",
    role: "Security Engineer",
    bio: "Cybersecurity specialist. Protecting applications and infrastructure.",
    location: "Washington, DC",
    experience: "Senior",
    skills: ["Penetration Testing", "OWASP", "Security Auditing", "Compliance"],
    followers: 1340,
    following: 150,
    githubUrl: "https://github.com/lisasecurity",
    portfolioUrl: "https://lisawang.security",
    isVerified: true,
  },
];

function DeveloperCard({ developer }: { developer: Developer }) {
  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={developer.avatar || "/placeholder.svg"}
                alt={developer.name}
              />
              <AvatarFallback>
                {developer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <h3 className="font-semibold text-sm truncate">
                  {developer.name}
                </h3>
                {developer.isVerified && (
                  <Star className="h-3 w-3 text-blue-500 fill-current" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                @{developer.username}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs">
            {developer.role}
          </Badge>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {developer.bio}
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <div className="flex items-center text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 mr-1" />
          {developer.location}
        </div>

        <div className="flex flex-wrap gap-1">
          {developer.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs px-2 py-0">
              {skill}
            </Badge>
          ))}
          {developer.skills.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-0">
              +{developer.skills.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {developer.followers}
            </span>
            <span>{developer.following} following</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {developer.experience}
          </Badge>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="h-7 px-2">
              <Github className="h-3 w-3 mr-1" />
              GitHub
            </Button>
            <Button size="sm" variant="outline" className="h-7 px-2">
              <ExternalLink className="h-3 w-3 mr-1" />
              Portfolio
            </Button>
          </div>
          <Button size="sm" className="h-7 px-3">
            Follow
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DeveloperPlatform() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const filteredDevelopers = useMemo(() => {
    return developers.filter((developer) => {
      const matchesSearch =
        developer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        developer.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        developer.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        developer.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesRole = roleFilter === "all" || developer.role === roleFilter;
      const matchesExperience =
        experienceFilter === "all" || developer.experience === experienceFilter;
      const matchesLocation =
        locationFilter === "all" || developer.location.includes(locationFilter);

      return (
        matchesSearch && matchesRole && matchesExperience && matchesLocation
      );
    });
  }, [searchQuery, roleFilter, experienceFilter, locationFilter]);

  const uniqueRoles = Array.from(new Set(developers.map((dev) => dev.role)));
  const uniqueExperience = Array.from(
    new Set(developers.map((dev) => dev.experience))
  );
  const uniqueLocations = Array.from(
    new Set(
      developers.map((dev) => dev.location.split(", ")[1] || dev.location)
    )
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Developer Community</h1>
          <p className="text-muted-foreground">
            Connect with talented developers from around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search developers by name, skills, or bio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {uniqueRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={experienceFilter}
              onValueChange={setExperienceFilter}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {uniqueExperience.map((exp) => (
                  <SelectItem key={exp} value={exp}>
                    {exp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredDevelopers.length} of {developers.length}{" "}
            developers
          </p>
        </div>

        {/* Developer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredDevelopers.map((developer) => (
            <DeveloperCard key={developer.id} developer={developer} />
          ))}
        </div>

        {/* No Results */}
        {filteredDevelopers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No developers found matching your criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setRoleFilter("all");
                setExperienceFilter("all");
                setLocationFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
