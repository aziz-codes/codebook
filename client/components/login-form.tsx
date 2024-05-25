"use client";
import React from "react";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Continue with Github</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="bg-gray-800 w-full hover:bg-gray-700 text-white py-2 px-4 rounded flex items-center"
          onClick={() =>
            signIn("github", {
              callbackUrl: "http://localhost:3000",
            })
          }
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.579 0-.285-.011-1.04-.017-2.041-3.338.726-4.042-1.612-4.042-1.612-.546-1.385-1.333-1.754-1.333-1.754-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.833 2.809 1.304 3.494.997.108-.774.419-1.305.762-1.606-2.665-.305-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.237-3.22-.123-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.403 1.02.004 2.046.137 3.004.403 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.874.119 3.176.77.839 1.236 1.91 1.236 3.22 0 4.61-2.803 5.624-5.475 5.922.43.371.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.289 0 .32.192.694.799.576 4.764-1.589 8.194-6.087 8.194-11.387 0-6.627-5.373-12-12-12z" />
          </svg>
          Github
        </Button>
        <div className="text-center text-gray-500 mt-2 mb-2">
          OR CONTINUE WITH
        </div>
        <div className="flex flex-col space-y-1 mt-3">
          <Label htmlFor="name">Email</Label>
          <Input id="email" placeholder="john@example.com" />
        </div>
        <div className="flex flex-col space-y-1 mt-2">
          <Label htmlFor="name">Password</Label>
          <Input id="password" type="password" placeholder="******" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Continue</Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
