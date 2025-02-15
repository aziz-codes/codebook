"use client";
import { getRequest, postRequest } from "@/services";
import React, { useEffect } from "react";

const Test = () => {
  useEffect(() => {
    const getCookie = async () => {
      try {
        const res = await getRequest("/test-cookie");

        console.log(res);
      } catch (err) {
        console.error(err);
        // Handle error here, for example, retry or notify user about the error.
        // You can also show a notification or retry the request when the error is resolved.
      }
    };
    getCookie();
  }, []);
  const handleClick = async () => {
    try {
      const response = await postRequest("/test");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="m-20">
      <button
        className="px-2 py-1.5 rounde-md bg-sky-600 text-white"
        onClick={handleClick}
      >
        test check
      </button>
    </div>
  );
};

export default Test;
