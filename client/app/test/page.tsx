"use client";
import React from "react";

const Test = () => {
  const handleApiCall = async () => {
    try {
      const response = await fetch("http://localhost:8000/test", {
        method: "POST",
        credentials: "include", // Ensures cookies are sent with the request
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <div>
      <button onClick={handleApiCall}>Test Api Call</button>
    </div>
  );
};

export default Test;
