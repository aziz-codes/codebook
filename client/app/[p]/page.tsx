"use client";
import React from "react";
import { useParams } from "next/navigation";
const { id } = useParams();
const SinglePost = () => {
  return <div>SinglePost id {id}</div>;
};

export default SinglePost;
