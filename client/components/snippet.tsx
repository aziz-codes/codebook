"use client";
import React, { FC, useEffect, useState } from "react";

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import UserDateProfile from "./layouts/user-date-profile";
import {
  Bookmark,
  Check,
  Copy,
  Ellipsis,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

import { Badge } from "./ui/badge";
import TextBox from "./text-box";
import Monaco from "./editor/monaco";
import { SnippetType } from "@/types/snippets";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Link,
  Facebook,
  Twitter,
  Send,
  Flag,
  Edit,
  Trash2,
  Calendar,
  Tag,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
interface SnippetComponentProps {
  snippet: SnippetType;
}
const Snippet: React.FC<SnippetComponentProps> = ({ snippet }) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleCopy = () => {
    navigator.clipboard
      .writeText(snippet.code)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <Card className="w-full overflow-hidden shadow-lg border dark:border-[#181a20] border-gray-300 !ring-0 !outline-none focus:ring-0">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={snippet?.avatar || "/placeholder.svg"}
                alt={snippet?.username || "User"}
              />
              <AvatarFallback>
                {(snippet?.username || "U")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {snippet?.username || "Anonymous"}
                </span>
                <span className="text-muted-foreground">
                  @{snippet?.username || "anonymous"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                time
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Flag className="h-4 w-4 mr-2" />
                Report
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Title and Description */}
        <div>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 leading-5">
            {snippet.title}
          </h3>
          <div>
            <p
              className={`text-sm text-muted-foreground ${
                !isExpanded ? "line-clamp-2" : ""
              }`}
            >
              {snippet.description}
            </p>
            {snippet.description && snippet.description.length > 100 && (
              <Button
                variant="link"
                onClick={() => setIsExpanded(!isExpanded)}
                className="!p-0 !py-0 !m-0 h-5 text-xs"
              >
                {isExpanded ? "See less" : "See more"}
              </Button>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {snippet.tags.slice(0, 4).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {index === 3 && snippet.tags.length > 4
                ? `${tag} +${snippet.tags.length - 3}`
                : tag}
            </Badge>
          ))}
        </div>

        {/* Code Block */}
        <div className=" rounded-lg overflow-hidden">
          {/* Code Header */}
          <div className="flex items-center justify-between bg-codeHeader px-4 py-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {snippet.programmingLanguage}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="tex-xs"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          {/* Code Content */}
          <div className="bg-background">
            <Monaco
              code={snippet.code}
              language={snippet.programmingLanguage.toLowerCase()}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              // onClick={handleLike}
              // className={isLiked ? "text-red-500" : ""}
            >
              <Heart className={`h-4 w-4 mr-2 `} />
              23
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              45
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Bookmark className={`h-4 w-4  `} />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Snippet</DialogTitle>
                  <DialogDescription>
                    Share this code snippet with others
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="flex flex-col gap-2 h-auto py-4"
                  >
                    <Link className="h-6 w-6" />
                    Copy Link
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col gap-2 h-auto py-4"
                  >
                    <Twitter className="h-6 w-6" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col gap-2 h-auto py-4"
                  >
                    <Facebook className="h-6 w-6" />
                    Facebook
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Separator />

        {/* Comments Section */}
        <div className="space-y-4">
          <h4 className="font-semibold">Comments (23)</h4>

          {/* Add Comment */}
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="You"
              />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Add a comment..."
                // value={newComment}
                // onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px]"
              />
              <Button
                size="sm"
                // onClick={handleAddComment}
                // disabled={!newComment.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Comment
              </Button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={"/placeholder.svg"} alt="dke" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">Aziz</span>
                    <span className="text-muted-foreground text-xs">
                      @aziz-codes
                    </span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className="text-muted-foreground text-xs">time</span>
                  </div>
                  <p className="text-sm">this is a test comment</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Snippet;
