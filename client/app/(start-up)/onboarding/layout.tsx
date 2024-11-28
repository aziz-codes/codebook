"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const NewUserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader className="hidden">
          <DialogTitle>Complete Your Profile</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default NewUserLayout;
