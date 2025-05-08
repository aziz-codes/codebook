"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CommentType, Post } from "@/types/post";
import IconLoader from "@/utils/components/icon-loader";
import { postReports } from "@/types/reports";

interface ReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
  comment?: CommentType;
  reportReasons: postReports[];
}

export function ReportDialog({
  isOpen,
  onClose,
  post,
  reportReasons,
  comment,
}: ReportDialogProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [reason, setReason] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [blockUser, setBlockUser] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const handleNext = () => {
    if (!reason) {
      toast({
        title: "Please select a reason",
        description: "You must select a reason for reporting this content",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 5000));

      toast({
        title: "Report submitted",
        description: "Thank you for helping keep our community safe",
        duration: 1000,
      });

      // Reset form and close dialog
      resetForm();
      onClose();
    } catch (error) {
      toast({
        title: "Failed to submit report",
        description: "Please try again later",
        variant: "destructive",
        duration: 1500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setReason("");
    setAdditionalInfo("");
    setBlockUser(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[500]   border-gray-800 text-gray-100">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Flag className="h-5 w-5 text-red-400" />
                Report Content
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Please select a reason for reporting this content.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto scrollbar-none pr-2">
              <div className="grid gap-3">
                {reportReasons.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex flex-col p-4 rounded-lg cursor-pointer transition-all border !outline-none !ring-0",
                      "hover:bg-bgHover",
                      reason === item.id
                        ? "bg-bgHover border-gray-600"
                        : "bg-gray-850 border-gray-700"
                    )}
                    onClick={() => setReason(item.id)}
                    role="radio"
                    aria-checked={reason === item.id}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setReason(item.id);
                        e.preventDefault();
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "mt-0.5 p-2 rounded-full",
                          reason === item.id ? "bg-gray-700" : "bg-gray-800"
                        )}
                      >
                        {item.icon}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-gray-100">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="border-t border-gray-800 pt-4">
              <Button
                variant="outline"
                onClick={handleClose}
                className=" border-bgCard bg-semiDark hover:bg-bgHover hover:text-gray-100 text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleNext}
                className="bg-semiDark border-bgHover hover:bg-bgHover text-gray-100"
              >
                Next
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                Additional Information
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Please provide any additional details and select your
                preferences.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="additional-info" className="text-gray-300">
                  Additional information (optional)
                </Label>
                <Textarea
                  id="additional-info"
                  placeholder="Please provide any additional details that will help us understand the issue"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="min-h-[100px]  border-gray-700 text-gray-100 placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-300">
                  Block {comment?.userDetails.username}
                </h4>

                <div
                  className={cn(
                    "p-4 rounded-lg cursor-pointer transition-all border",
                    "hover:bg-bgHover",
                    blockUser
                      ? "bg-bgHover border-gray-600"
                      : "bg-semiDark border-gray-700"
                  )}
                  onClick={() => setBlockUser(!blockUser)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <img
                        src={comment?.userDetails.avatar}
                        className="h-10 w-10 rounded-full object-cover"
                        alt={comment?.userDetails.username}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-100">
                          {comment?.userDetails.username}
                        </h4>
                        <Checkbox
                          id="block-user"
                          checked={blockUser}
                          onCheckedChange={(checked) =>
                            setBlockUser(checked as boolean)
                          }
                          className="border-gray-600 data-[state=checked]:bg-gray-600 data-[state=checked]:text-gray-100"
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Block this user. You won't see any further content from
                        this user in your feed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="border-t border-gray-800 pt-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
                className="border-bgCard bg-semiDark hover:bg-bgHover hover:text-gray-100 text-gray-300"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="border-bgCard bg-semiDark hover:bg-bgHover hover:text-gray-100 text-gray-300 min-w-28"
              >
                {isSubmitting ? (
                  <IconLoader height={5} width={5} />
                ) : (
                  "Submit Report"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
