"use client";
import { postRequest } from "@/services";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";

const usernameRegex = /^[a-zA-Z0-9._-]+$/;
const debounceDelay = 2000; //
interface UsernameInputProps {
  formData: {
    username: string;
    tagline: string;
    bio: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}
const UsernameInput: React.FC<UsernameInputProps> = ({
  formData,
  handleChange,
  setIsValid,
}) => {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!formData.username) {
      setError("");
      setIsAvailable(null);
      setIsValid(false);
      return;
    }

    if (!usernameRegex.test(formData.username)) {
      setError("Only letters, numbers, '.', '_', and '-' are allowed.");
      setIsAvailable(null);
      setIsValid(false);
      return;
    } else {
      setError("");
    }

    const timeout = setTimeout(() => {
      postRequest(`/user/check-username/${formData.username}`)
        .then((res) => res.json())
        .then((data) => {
          setIsAvailable(data.available);
          setIsValid(true);
        })
        .catch((err) => {
          console.error("Error checking username:", err);
          setIsAvailable(null);
          setIsValid(false);
        });
    }, debounceDelay);

    return () => clearTimeout(timeout);
  }, [formData.username, setIsValid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAvailable(null);
    handleChange(e);
  };
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm">*Username</label>
      <Input
        placeholder="@stephen"
        name="username"
        autoComplete="off"
        value={formData.username}
        onChange={handleInputChange}
        className={clsx(
          "text-sm",
          isAvailable === false ? "ring-red-500" : "",
          isAvailable === true ? "!ring-green-500" : ""
        )}
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}
      {isAvailable === false && !error && (
        <p className="text-red-500 text-xs">
          {formData.username} is already taken.
        </p>
      )}
      {isAvailable === true && !error && (
        <p className="text-green-500 text-xs">
          &apos;{formData.username}&apos; is available!
        </p>
      )}
    </div>
  );
};

export default UsernameInput;
