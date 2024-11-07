"use client";
import React, { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ImageSlider from "@/components/image-slider";
import { X, Smile, MapPin, ImagePlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import EditableContainer from "@/components/test/input-div";
interface AxiosResponseData {
  data: {
    link: string;
  };
}
const CreatePost = ({ children }: { children: React.ReactNode }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setloading] = useState(false);
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const { data: session } = useSession();

  const handleBtnClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const postUtils = [
    {
      tooltip: "Media",
      icon: (
        <ImagePlus
          onClick={handleBtnClick}
          className="h-4 w-4 cursor-pointer hover:scale-105 transition-transform duration-100 ease-linear"
          stroke="#00FF66"
        />
      ),
    },
    {
      tooltip: "Emoji",
      icon: (
        <Smile
          className="h-4 w-4 cursor-pointer hover:scale-105 transition-transform duration-100 ease-linear"
          stroke="#00FF66"
        />
      ),
    },
    {
      tooltip: "Location",
      icon: (
        <MapPin
          className="h-4 w-4 cursor-pointer hover:scale-105 transition-transform duration-100 ease-linear"
          stroke="#00FF66"
        />
      ),
    },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newImages: string[] = [];
      fileArray.forEach((file) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === fileArray.length) {
              setImages((prevImages) => [...prevImages, ...newImages]);
            }
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
  };

  const handleCancel = () => {
    setImages([]);
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const handlePost = async () => {
    try {
      setloading(true);
      let imageUrl = "";

      // Check if there is an image to upload
      if (image) {
        const formData = new FormData();
        formData.append("file", image as Blob);
        formData.append("upload_preset", "codebook");
        formData.append("cloud_name", "dde6fahrm");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dde6fahrm/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          console.error(
            "Image upload to Cloudinary failed",
            response.statusText
          );
          return;
        }

        const data = await response.json();
        imageUrl = data.secure_url;
      }

      const payload = {
        title: content,
        user: session?.user.id,
        image: imageUrl || null,
      };

      const localApiResponse = await fetch("http://localhost:8000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!localApiResponse.ok) {
        console.error(
          "Failed to create post on local API",
          localApiResponse.statusText
        );
        return;
      }

      alert("Post created successfully");
      setloading(false);
      
    } catch (err) {
      console.error("An error occurred", err);
    } finally {
      setloading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="!ring-0 !outline-none h-auto px-0 pt-0 py-0 gap-3">
        <AlertDialogTitle className="flex justify-between items-center border-b px-4 py-2">
          <h4 className="flex-grow text-center">Create a post</h4>
          <AlertDialogCancel
            className="flex justify-center h-8 w-8 !outline-none !ring-0 rounded-full hover:bg-bgHover cursor-pointer items-center p-0 border-0"
            onClick={handleCancel}
          >
            <X className="h-5 w-5" />
          </AlertDialogCancel>
        </AlertDialogTitle>

        <div className="flex flex-col overflow-auto gap-3 px-4">
          <div className="flex gap-2 items-center">
            <Avatar className="h-11 w-11">
              <AvatarFallback>{session?.user.name?.slice(0, 2)}</AvatarFallback>
              <AvatarImage
                src={session?.user.image as string}
                alt={session?.user.username as string}
                className="h-full w-full"
              />
            </Avatar>
            <div className="flex flex-col">
              <Label className="font-semibold">{session?.user.name}</Label>
              <span className="text-xs italic">{session?.user.username}</span>
            </div>
          </div>
          <div className="flex flex-col w-full gap-3 h-auto max-h-96 overflow-y-auto">
            <EditableContainer content={content} setContent={setContent} />
            <div className="w-full flex flex-col items-center relative">
              <input
                type="file"
                hidden
                accept="image/png, image/jpeg, image/jpg"
                multiple
                ref={fileRef}
                onChange={handleFileChange}
              />
              {images.length > 0 && (
                <ImageSlider images={images} removeImage={removeImage} />
              )}
            </div>
          </div>
        </div>
        <Separator />
        <AlertDialogFooter className="!px-4 py-1 -mt-3">
          <div className="w-full  h-10  flex justify-between items-center ">
            <div className="flex items-center gap-4 ">
              {postUtils.map((item, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger className="!outline-none !ring-0">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full transition-colors duration-200">
                      {item.icon}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="text-xs">
                    {item.tooltip}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <Button
              variant="link"
              className="text-neon hover:text-neonHover p-0 !no-underline"
              onClick={handlePost}
            >
              {loading ? "Posting..." : "Post"}
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreatePost;
