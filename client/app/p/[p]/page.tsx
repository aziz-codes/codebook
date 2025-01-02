"use client";
import React from "react";
import { useParams } from "next/navigation";
import MainWrapper from "@/layouts/main-wrapper";

const SinglePost = () => {
  const { p } = useParams();

  return <MainWrapper classes="w-full">hello world</MainWrapper>;
};

export default SinglePost;
