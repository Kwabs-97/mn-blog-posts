"use client";
import React from "react";
import Link from "next/link";
import { useDeletePost, usePost } from "@/hooks/usePosts";
import { useParams, useRouter } from "next/navigation";

function page() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = usePost();
  const deletePost = useDeletePost();

  const handleDelete = async () => {
    try {
    } catch (error) {}
  };
  return <div>page</div>;
}

export default page;
