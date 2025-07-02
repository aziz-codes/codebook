"use client";
import { Smile } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // ShadCN Popover
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useSession } from "next-auth/react";
import ButtonLoader from "@/utils/components/button-loader";
import { postRequest } from "@/services";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { CommentType, Post } from "@/types/post";

interface CommentProps {
  post_id: string;
  placeholder?: string;
  initialValue?: string;
  parentComment?: string | null;
  resetFields: () => void;
}

type GetPostsResponse = {
  count: number;
  result: Post[];
};

const TextBox: React.FC<CommentProps> = ({
  placeholder = "Add a comment",
  post_id,
  initialValue = "",
  parentComment = null,
  resetFields,
}) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState(initialValue);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const handleEmojiSelect = (item: any) => {
    const newText = comment.concat(item.native);
    setComment(newText);

    // Update the div content
    if (inputRef.current) {
      const hasMentions = /@[\w.-]+/.test(newText);
      if (hasMentions) {
        inputRef.current.innerHTML = formatMentions(newText);
      } else {
        inputRef.current.textContent = newText;
      }
      setShowPlaceholder(newText.length === 0);

      // Place cursor at the end
      setTimeout(() => {
        if (inputRef.current) {
          const range = document.createRange();
          const selection = window.getSelection();
          range.selectNodeContents(inputRef.current);
          range.collapse(false);
          selection?.removeAllRanges();
          selection?.addRange(range);
          inputRef.current.focus();
        }
      }, 0);
    }

    setOpen(false); // Close popover after selecting emoji
  };

  useEffect(() => {
    if (initialValue !== comment) {
      // Check if this is a new mention being added (reply scenario)
      if (initialValue.startsWith("@") && initialValue !== "") {
        const newMention = initialValue.replace("@", "");
        const currentMentions = extractMentions(comment);

        // Only add if this user hasn't been mentioned before
        if (!currentMentions.includes(newMention)) {
          const newText =
            comment.length > 0
              ? `${comment} @${newMention} ` // Append with spaces
              : `@${newMention} `; // Just the mention with space

          setComment(newText);

          if (inputRef.current) {
            const hasMentions = /@[\w.-]+/.test(newText);
            if (hasMentions) {
              inputRef.current.innerHTML = formatMentions(newText);
            } else {
              inputRef.current.textContent = newText;
            }
            setShowPlaceholder(newText.length === 0);

            // Place cursor at the end
            setTimeout(() => {
              if (inputRef.current) {
                const range = document.createRange();
                const selection = window.getSelection();
                range.selectNodeContents(inputRef.current);
                range.collapse(false);
                selection?.removeAllRanges();
                selection?.addRange(range);
                inputRef.current.focus();
              }
            }, 0);
          }
        } else {
          // User already mentioned, just focus without adding
          setTimeout(() => {
            if (inputRef.current) {
              const range = document.createRange();
              const selection = window.getSelection();
              range.selectNodeContents(inputRef.current);
              range.collapse(false);
              selection?.removeAllRanges();
              selection?.addRange(range);
              inputRef.current.focus();
            }
          }, 0);
        }
      } else {
        // Regular initial value setting
        setComment(initialValue);
        if (inputRef.current) {
          const hasMentions = /@[\w.-]+/.test(initialValue);
          if (hasMentions) {
            inputRef.current.innerHTML = formatMentions(initialValue);
          } else {
            inputRef.current.textContent = initialValue;
          }
          setShowPlaceholder(initialValue.length === 0);

          // If there's an initial value, place cursor at the end
          if (initialValue.length > 0) {
            setTimeout(() => {
              if (inputRef.current) {
                const range = document.createRange();
                const selection = window.getSelection();
                range.selectNodeContents(inputRef.current);
                range.collapse(false);
                selection?.removeAllRanges();
                selection?.addRange(range);
                inputRef.current.focus();
              }
            }, 0);
          }
        }
      }
    }
  }, [initialValue]);

  const adjustHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "34px";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [comment]);

  const extractMentions = (text: string) => {
    const mentionRegex = /@([\w.-]+)/g;
    const mentions = [];
    let match;
    while ((match = mentionRegex.exec(text)) !== null) {
      mentions.push(match[1]); // Extract username without @
    }
    return mentions;
  };

  const formatMentions = (text: string) => {
    // Replace @username patterns with styled spans (includes hyphens, dots, underscores)
    return text.replace(/@([\w.-]+)/g, '<span class="text-sky-500">@$1</span>');
  };

  const getPlainText = (element: HTMLElement) => {
    // Get plain text content, handling both text nodes and HTML content
    return element.textContent || element.innerText || "";
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const plainText = getPlainText(e.currentTarget);

    // Check for duplicate mentions while typing
    const currentMentions = extractMentions(plainText);
    const uniqueMentions = [...new Set(currentMentions)];

    // If there are duplicate mentions, remove them
    if (currentMentions.length !== uniqueMentions.length) {
      let cleanText = plainText;

      const mentionCounts: Record<string, number> = {};

      // Count occurrences and remove duplicates
      cleanText = cleanText.replace(
        /@([\w.-]+)/g,
        (match, username: string) => {
          mentionCounts[username] = (mentionCounts[username] || 0) + 1;
          return mentionCounts[username] === 1 ? match : "";
        }
      );
      // Clean up extra spaces
      cleanText = cleanText.replace(/\s+/g, " ").trim();

      setComment(cleanText);

      if (inputRef.current) {
        const hasMentions = /@[\w.-]+/.test(cleanText);
        if (hasMentions) {
          inputRef.current.innerHTML = formatMentions(cleanText);
        } else {
          inputRef.current.textContent = cleanText;
        }

        // Place cursor at end after cleanup
        setTimeout(() => {
          if (inputRef.current) {
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(inputRef.current);
            range.collapse(false);
            selection?.removeAllRanges();
            selection?.addRange(range);
          }
        }, 0);
      }

      setShowPlaceholder(cleanText.length === 0);
      adjustHeight();
      return;
    }

    setComment(plainText);
    setShowPlaceholder(plainText.length === 0);

    // Always reformat the entire content to ensure proper mention highlighting
    const hasMentions = /@[\w.-]+/.test(plainText);

    if (inputRef.current) {
      let formattedText;

      if (hasMentions) {
        // Format mentions in the plain text
        formattedText = formatMentions(plainText);
      } else {
        // If no mentions, use plain text to avoid leftover styling
        formattedText = plainText;
      }

      // Only update if the content has actually changed
      const currentContent = hasMentions
        ? inputRef.current.innerHTML
        : inputRef.current.textContent;

      if (currentContent !== formattedText) {
        // Save cursor position relative to plain text
        const selection = window.getSelection();
        let cursorOffset = 0;

        if (selection && selection.rangeCount > 0) {
          // Calculate cursor position in terms of plain text characters
          const range = selection.getRangeAt(0);
          const preCaretRange = range.cloneRange();
          preCaretRange.selectNodeContents(inputRef.current);
          preCaretRange.setEnd(range.startContainer, range.startOffset);
          cursorOffset = getPlainText(
            preCaretRange.cloneContents() as any as HTMLElement
          ).length;
        }

        // Update content
        if (hasMentions) {
          inputRef.current.innerHTML = formattedText;
        } else {
          inputRef.current.textContent = formattedText;
        }

        // Restore cursor position
        setTimeout(() => {
          if (inputRef.current && selection) {
            try {
              let currentOffset = 0;
              let targetNode = null;
              let targetOffset = cursorOffset;

              const walker = document.createTreeWalker(
                inputRef.current,
                NodeFilter.SHOW_TEXT,
                null
              );

              while (walker.nextNode()) {
                const textNode = walker.currentNode;
                const textLength = textNode.textContent?.length || 0;

                if (currentOffset + textLength >= cursorOffset) {
                  targetNode = textNode;
                  targetOffset = cursorOffset - currentOffset;
                  break;
                }
                currentOffset += textLength;
              }

              if (targetNode) {
                const newRange = document.createRange();
                const safeOffset = Math.min(
                  targetOffset,
                  targetNode.textContent?.length || 0
                );
                newRange.setStart(targetNode, safeOffset);
                newRange.setEnd(targetNode, safeOffset);
                selection.removeAllRanges();
                selection.addRange(newRange);
              } else {
                // Fallback: place cursor at end
                const range = document.createRange();
                range.selectNodeContents(inputRef.current);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
              }
            } catch (error) {
              console.log("Cursor positioning failed, placing at end");
              // Fallback: place cursor at end
              const range = document.createRange();
              range.selectNodeContents(inputRef.current);
              range.collapse(false);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
        }, 0);
      }
    }

    adjustHeight();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return;

    const tempId = crypto.randomUUID(); // temporary ID
    const newComment: CommentType = {
      _id: tempId,
      post: post_id,
      parentId: parentComment,
      text: comment.trim(),
      replies: 0,
      likes: [],
      createdAt: new Date().toISOString(),
      userDetails: {
        _id: session?.user.id as string,
        username: session?.user.username as string,
        avatar: session?.user.image as string,
      },
    };

    // Optimistically update the comments
    if (parentComment) {
      // Updating replies — assume replies don't use infinite query
      queryClient.setQueryData<CommentType[]>(
        ["replies", parentComment],
        (old = []) => [newComment, ...old]
      );
    } else {
      // Updating paginated root comments
      queryClient.setQueryData(
        ["comments", post_id],
        (
          oldData:
            | InfiniteData<{
                comments: CommentType[];
                page: number;
                hasMore: boolean;
              }>
            | undefined
        ) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page, index) => {
              if (index === 0) {
                return {
                  ...page,
                  comments: [newComment, ...page.comments],
                };
              }
              return page;
            }),
          };
        }
      );
    }

    if (!parentComment) {
      queryClient.setQueryData(["posts"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => {
            return {
              ...page,
              result: page.result.map((p: any) =>
                p._id === post_id
                  ? { ...p, commentCount: p.commentCount + 1 }
                  : p
              ),
            };
          }),
        };
      });
    }

    setComment(""); // Clear the input immediately
    if (inputRef.current) {
      inputRef.current.textContent = "";
      setShowPlaceholder(true);
    }
    setLoading(true);

    try {
      const payload = {
        user: session?.user.id,
        text: comment.trim(),
        post: post_id,
        parentId: parentComment,
      };

      await postRequest(`/post/comment/${post_id}`, payload);
      resetFields();

      // Optional: revalidate to get updated comment with real _id
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["comments", post_id] });
    } catch (error) {
      console.error("Failed to comment:", error);

      // Rollback optimistic update
      queryClient.setQueryData<CommentType[]>(
        ["comments", post_id],
        (old = []) => old.filter((c) => c._id !== tempId)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleCommentSubmit();
  };

  const handleFocus = () => {
    setShowPlaceholder(false);
  };

  const handleBlur = () => {
    if (comment.length === 0) {
      setShowPlaceholder(true);
    }
  };

  useEffect(() => {
    if (comment.length === 0) {
      setShowPlaceholder(true);
    }
  }, [comment]);

  return (
    <div className="flex justify-between items-center w-full relative gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Smile className="h-4 w-4 cursor-pointer hover:scale-105 transition-all duration-75 ease-linear hover:text-gray-400" />
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

      <form onSubmit={handleComment} className="flex items-center flex-1">
        <div className="relative w-full">
          <div
            ref={inputRef}
            contentEditable
            suppressContentEditableWarning={true}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="resize-none max-h-32 scrollbar-none overflow-y-auto w-full py-2 outline-none bg-transparent text-sm min-h-[34px] whitespace-pre-wrap break-words"
            style={{ height: "34px" }}
          />
          {showPlaceholder && (
            <div className="absolute top-2 left-0 text-sm text-gray-500 pointer-events-none select-none">
              {placeholder}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          {comment.length > 0 &&
            (!loading ? (
              <Button
                variant="link"
                className="!no-underline text-sky-600 p-0"
                type="submit"
              >
                Post
              </Button>
            ) : (
              <ButtonLoader />
            ))}
        </div>
      </form>
    </div>
  );
};

export default TextBox;
