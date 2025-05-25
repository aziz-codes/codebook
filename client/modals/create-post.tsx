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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import ImageSlider from "@/components/image-slider";
import { X, Smile, MapPin, ImagePlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import EditableContainer from "@/components/test/input-div";
import Link from "next/link";
import { postRequest } from "@/services";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import IconLoader from "@/utils/components/icon-loader";

type CreatePostProps = {
  children: React.ReactNode;
};

const CreatePost = ({ children }: CreatePostProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleBtnClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
      const fileArray = Array.from(event.target.files);
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

  // Define the function for creating a post
  const createPost = async (imageUrl: string) => {
    const payload = {
      title: content,
      user: session?.user.id,
      image: imageUrl || null,
    };

    const localApiResponse = await postRequest("/post", payload);

    if (!localApiResponse.ok) {
      throw new Error("Failed to create post on local API");
    }
  };

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({
        description: "Post created successfully.",
      });
      cancelRef.current && cancelRef.current.click();
      setLoading(false);
      setContent("");
    },
    onError: (error) => {
      console.error("An error occurred", error);
      setLoading(false);
    },
  });

  const handlePost = async () => {
    setLoading(true);
    let imageUrl = "";

    if (image) {
      const formData = new FormData();
      formData.append("image", image as Blob);

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Image upload to Cloudinary failed", response.statusText);
        setLoading(false);
        return;
      }

      const data = await response.json();
      imageUrl = data.path;
    }

    // Use mutate to create the post
    mutate(imageUrl);
  };

  const handleEmojiSelect = (item: any) => {
    setContent(content.concat(item.native));
    setOpen(false); // Close popover after selecting emoji
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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Smile
              className="h-4 w-4 cursor-pointer hover:scale-105 transition-transform duration-100 ease-linear"
              stroke="#00FF66"
            />
          </PopoverTrigger>
          <PopoverContent className="!p-0 w-full max-w-xs">
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              theme="dark"
              previewPosition="none"
              emojiSize={20}
              emojiButtonSize={32}
            />
          </PopoverContent>
        </Popover>
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
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="!ring-0 !outline-none h-auto px-0 pt-0 py-0 gap-3 w-full max-w-xl rounded-md">
        <AlertDialogTitle className="flex justify-between items-center border-b px-4 py-2">
          <h4 className="flex-grow text-center">Create a post</h4>
          <AlertDialogCancel
            ref={cancelRef}
            className="flex justify-center h-8 w-8 !outline-none !ring-0 rounded-full hover:bg-bgHover cursor-pointer items-center p-0 border-0"
            onClick={handleCancel}
          >
            <X className="h-5 w-5" />
          </AlertDialogCancel>
        </AlertDialogTitle>

        <div className="flex flex-col overflow-auto gap-3 px-4">
          <div className="flex gap-2 items-center">
            <Avatar
              className="h-11 w-11 cursor-pointer"
              onClick={() => router.push(`user/${session?.user.username}`)}
            >
              <AvatarFallback>{session?.user.name?.slice(0, 2)}</AvatarFallback>
              <AvatarImage
                src={session?.user.image as string}
                alt={session?.user.username as string}
                className="h-full w-full"
              />
            </Avatar>
            <div className="flex flex-col">
              <Link
                href={`/${session?.user.username}`}
                className="font-semibold text-sm"
              >
                {session?.user.username}
              </Link>
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
          <div className="w-full h-10 flex justify-between items-center ">
            <div className="flex items-center gap-4 ">
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
            </div>
            <Button
              variant="link"
              className="text-neon hover:text-neonHover p-0 !no-underline"
              onClick={handlePost}
            >
              {loading ? <IconLoader /> : "Post"}
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreatePost;
