'use client'
import Image from "next/image";
import { usePost, useDeletePost } from "@/hooks/usePosts";
import PostCard from "@/components/PostCard";
import { useState } from "react";
import LoadingSpinner from "@/components/Loading-Spinner";

export default function Home() {
  const [page, setPage] = useState("");
  const [category, setCategory] = useState("");

  const {isLoading, isError, error, data} = usePost()
  if (isLoading) {
    return <LoadingSpinner />
  }

  if(isError){
    <div className="h-screen w-screen px-5 flex items-center justify-center">
<p className="text-red-400 font-semibold">{`Error loading page. -${error}. Please try again later`}</p>

    </div>
  }
  return (
  <div>

  </div>
  );
}
