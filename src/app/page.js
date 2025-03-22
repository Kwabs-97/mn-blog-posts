'use client'
import Image from "next/image";
import { usePost, useDeletePost } from "@/hooks/usePosts";
import PostCard from "@/components/PostCard";
import { useState } from "react";
import Link from "next/link";
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
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div className="max-w-4xl mx-auto px-4">
    <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Posts</h1>
          <Link
            href="/new-post"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            New Post
          </Link>
        </div>
    </div>

  </div>
  );
}
