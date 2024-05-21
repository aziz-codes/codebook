"use client";
import React, { useState, useRef } from "react";
import { uploadImage } from "@/constants/images";
import Image from "next/image";
import Images from "./images";
const ImageHanlder = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);

  const hanldeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };
  const handleTriggerClick = () => {
    if (fileRef && fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleRemoveImage = (image: string) => {
    const newImages = images.filter((img) => img !== image);
    setImages(newImages);
  };

  return (
    <div className="flex mt-2">
      <div className="flex-1 flex items-center justify-center">
        <input
          ref={fileRef}
          type="file"
          accept=".png, .jpeg, .jpg"
          multiple
          onChange={hanldeImageChange}
          hidden
        />
        {images.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {images.map((image, index) => (
              <Images
                image={image}
                key={index}
                handleRemoveImage={handleRemoveImage}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Image
              src={uploadImage}
              alt="upload images"
              height={150}
              width={150}
              className="cursor-pointer"
              onClick={handleTriggerClick}
            />
            <h3 className="font-bold">
              Upload Images
              <span className="text-muted text-xs font-normal text-black dark:text-gray-400">
                (optional)
              </span>
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageHanlder;
