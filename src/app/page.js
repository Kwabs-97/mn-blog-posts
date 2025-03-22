"use client";
import { usePosts, useDeletePost } from "@/hooks/usePosts";
import PostCard from "@/components/PostCard";
import Search from "@/components/ui/search";
import { useState } from "react";
import Link from "next/link";

import LoadingSpinner from "@/components/ui/Loading-Spinner";
import { Pagination } from "@/components/Pagination";

export default function Home() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const limit = 10;

  const { isLoading, isError, error, data } = usePosts(
    page,
    limit,
    search,
    category
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  console.log(data);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="h-screen w-screen px-5 flex items-center justify-center">
        <p className="text-red-400 font-semibold">{`Error loading page. -${error}. Please try again later`}</p>
      </div>
    );
  }

  if (!data?.posts || data.posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-2">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Blog Posts
          </h1>
          <p className="text-gray-600 dark:text-gray-400">No posts found.</p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil((data?.total || 0) / limit);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-2">
      <div className="max-w-4xl mx-auto ">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Blog Posts
          </h1>
          <Link
            href="/new-post"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            New Post
          </Link>
        </div>
      </div>
      <Search onSearch={setSearch} onCategoryChange={setCategory} />
      <div className="space-y-6">
        {data?.posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            // onDelete={handleDelete}
          />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
