"use client";
import React from "react";
import { useParams } from "next/navigation";

const SinglePost = () => {
  const { p } = useParams();

  return <div>SinglePost id {p}</div>;
};

export default SinglePost;
