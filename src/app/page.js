"use client";
import { usePosts, useDeletePost, usePost } from "@/hooks/usePosts";
import PostCard from "@/components/PostCard";
import Search from "@/components/ui/search";
import { useState } from "react";
import Link from "next/link";

import { LoadingSpinner } from "@/components/loading-spinner";
import { Pagination } from "@/components/Pagination";
import { Rss } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const deletePost = useDeletePost();

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoadingSpinner />;
      </div>
    );
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-2 flex flex-col gap-4 items-center justify-center">
        <p>No posts found</p>
        <Link
          href="/new-post"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          New Post
        </Link>
      </div>
    );
  }

  const totalPages = Math.ceil((data?.total || 0) / limit);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="flex-1 px-2 lg:px-14 py-8 overflow-y-auto">
        <header className="mx-auto">
          <nav className="flex justify-between items-center mb-8">
            <Button>
              <Rss />
            </Button>
            <Link
              href="/new-post"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              New Post
            </Link>
          </nav>
        </header>
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
      </div>
      <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 dark:border-gray-700 py-3">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
