import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { X } from "lucide-react";

interface ImageProp {
  images: string[];
  removeImage: (index: number) => void;
}

const ImageSlider: React.FC<ImageProp> = ({ images, removeImage }) => {
  return (
    <Carousel className="w-full max-w-[350px]">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className={`basis-full ${images.length > 1 ? "md:basis-1/2 lg:basis-1/3" : ""}`}
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                  <Image
                    fill
                    src={image}
                    alt="attachment"
                    className="rounded-lg object-cover object-center h-full w-full"
                  />
                  <div
                    className="absolute top-1 right-1 bg-slate-800 rounded-full h-6 w-6 flex items-center justify-center hover:bg-slate-700 cursor-pointer"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-5 w-5 text-white" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
};

export default ImageSlider;
