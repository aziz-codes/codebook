import Image from "next/image";
import React from "react";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";
type ImagesProps = {
  image: string;
  handleRemoveImage: (image: string) => void;
};
const Images = ({ image, handleRemoveImage }: ImagesProps) => {
  return (
    <div className="relative h-28 w-24 rounded-md border ">
      <Image src={image} alt="cover" fill className="object-contain" />
      <Badge
        className="absolute -right-2 -top-2 cursor-pointer rounded-full p-0 h-4 w-4 flex justify-center items-center"
        title="remove image"
        onClick={() => handleRemoveImage(image)}
      >
        <X className="w-3" />
      </Badge>
    </div>
  );
};

export default Images;
