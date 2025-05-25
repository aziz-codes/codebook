"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { patchRequest } from "@/services";
import UsernameInput from "@/components/custom/username-input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/utils/components/button-loader";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
const NewUser = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    tagline: "",
    bio: "",
  });
  const { toast } = useToast();
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    if (!session) return;
    try {
      setLoading(true);
      const response = await patchRequest(
        `/user/${session?.user.id}`,
        formData
      );
      const data = await response.json();
      if (data.success) {
        router.push("/onboard?rollout=true");
        setFormData({
          username: "",
          tagline: "",
          bio: "",
        });
        setLoading(false);
      } else {
        console.error("Error creating user:", data.error);
        setLoading(false);
        toast({
          description: data.message,
        });
      }
    } catch (err: any) {
      console.error("Error creating user:", err);
      setLoading(false);
      toast({
        description: err.message,
      });
    }
  };

  return (
    <section className="flex flex-col space-y-6">
      {/* Username Input */}
      <UsernameInput
        formData={formData}
        handleChange={handleChange}
        setIsValid={setIsValid}
      />

      {/* Tagline Input */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="tagline" className="text-sm font-medium text-gray-400">
          Tagline
        </label>
        <Input
          id="tagline"
          placeholder="Frontend web developer"
          className="text-sm"
          name="tagline"
          onChange={handleChange}
          value={formData.tagline}
          autoComplete="off"
        />
      </div>

      {/* Bio Input */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="bio" className="text-sm font-medium text-gray-400">
          Bio
        </label>
        <Textarea
          id="bio"
          name="bio"
          onChange={handleChange}
          value={formData.bio}
          placeholder="Talk about React and JavaScript."
          rows={4}
          maxLength={200}
          className="text-sm"
          autoComplete="off"
        />
      </div>
      <Button
        variant="default"
        className="flex items-center justify-center"
        disabled={!isValid}
        onClick={handleSubmit}
      >
        {loading ? <ButtonLoader /> : "Continue"}
      </Button>
    </section>
  );
};

export default NewUser;
