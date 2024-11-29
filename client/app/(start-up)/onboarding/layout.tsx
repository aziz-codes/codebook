"use client";

import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const NewUserLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const {data:session,status} = useSession();
  if(status === "loading"){
    return <h4>Loading session pelase wait</h4>
  }

  if(status === "authenticated" && session.user.isOnboarded){
   window.location.href="/"
    return null;
  }
  
  return (
    <Dialog open>
    <DialogContent className="p-0 py-6 max-h-[90vh] overflow-y-auto">
      <DialogHeader className="text-center p-0 !px-4">
        <DialogTitle className="py-2">Complete Your Profile</DialogTitle>
      </DialogHeader>
      <div className="px-4">
        {children}
      </div>
    </DialogContent>
  </Dialog>
  );
};

export default NewUserLayout;
