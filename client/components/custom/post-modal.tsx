import React from "react";
import { DialogHeader } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import Image from "next/image";
const PostModal: React.FC<{ children: React.ReactNode; image: string }> = ({
  children,
  image,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px] md:max-w-4xl px-4">
        <DialogHeader></DialogHeader>

        <AlertDialogCancel
          // ref={cancelRef}
          className="flex justify-center h-7 w-7 !outline-none border-none !focus:ring-0 !ring-0 rounded-sm hover:bg-bgHover cursor-pointer items-center p-0 !border-0 absolute top-2 right-2"
          // onClick={handleCancel}
        >
          <X className="h-5 w-5" />
        </AlertDialogCancel>
        <div className="w-full  flex gap-3 h-[85vh] ">
          <div className="relative w-full h-full  overflow-hidden rounded-md px-3 border ">
            <Image
              src={image}
              alt="post thumbnail"
              fill
              className="absolute w-full h-full object-cover blur-md -z-10"
            />
            <Image
              src={image}
              alt="post thumbnail"
              fill
              className="w-full h-auto object-contain rounded-3xl z-10"
            />
          </div>
          <div className="w-full max-w-xs border">comments section</div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PostModal;
