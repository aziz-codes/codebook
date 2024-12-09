import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { X } from "lucide-react";
import Image from "next/image";
const PostModal: React.FC<{ children: React.ReactNode,image:string }> = ({ children,image}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px] md:max-w-4xl px-0">
        <DialogHeader></DialogHeader>

        <AlertDialogCancel
          // ref={cancelRef}
          className="flex justify-center h-7 w-7 !outline-none border-none !focus:ring-0 !ring-0 rounded-sm hover:bg-bgHover cursor-pointer items-center p-0 !border-0 absolute top-2 right-2"
          // onClick={handleCancel}
        >
          <X className="h-5 w-5" />
        </AlertDialogCancel>
        <div className="w-full  flex gap-3 h-[85vh] ">
        <div className="relative w-full h-full bg-transparent overflow-hidden rounded-md">
  <Image
    // src="https://res.cloudinary.com/dde6fahrm/image/upload/v1733429345/xucncmsshz10uijkop3k.png"
      // src="https://res.cloudinary.com/dde6fahrm/image/upload/v1733429776/q7pvkdzb4bfb2kafopmz.png"
      src={image}
    alt="Photo by Drew Beamer"
    fill
    className="w-full h-full object-contain rounded-md px-2 py-1"
  />
</div>

          {/* <div className="relative w-full max-w-full h-full overflow-hidden">
            <img
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="https://res.cloudinary.com/dde6fahrm/image/upload/v1733429776/q7pvkdzb4bfb2kafopmz.png"
              alt="Uploaded Image"
            />
          </div> */}
          <div className="w-full max-w-xs">right section</div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PostModal;
