import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16">
      <h1 className="text-9xl font-extrabold text-gray-200 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">
        Oops! We couldn&apos;t find what you&apos;re looking for.
      </p>
      <Button
        asChild
        className="px-6 py-3 bg-gray-200 text-slate-800 foreground rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform"
      >
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
