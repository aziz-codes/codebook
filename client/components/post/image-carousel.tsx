import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
const ImageCarousel = ({
  images,
  onClick,
}: {
  images: string[];
  onClick?: () => void;
}) => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Post image ${index + 1}`}
                fill
                className="object-cover"
                onClick={onClick}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
};

export default ImageCarousel;
