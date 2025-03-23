"use client";
import { usePosts, useDeletePost, usePost } from "@/hooks/usePosts";
import PostCard from "@/components/PostCard";
import Search from "@/components/ui/search";
import { useState, useMemo } from "react";
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

  const { isLoading, isError, error, data } = usePosts(page, limit);

  const filteredPosts = useMemo(() => {
    if (!data?.posts) return [];

    let posts = [...data.posts];

    // Apply search filter
    if (search) {
      const searchTerm = search.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm) ||
          post.categories.some((category) =>
            category.toLowerCase().includes(searchTerm)
          )
      );
    }

    // Apply category filter
    if (category) {
      posts = posts.filter((post) => post.categories.includes(category));
    }

    return posts;
  }, [data?.posts, search, category]);

  // Apply pagination after filtering
  const paginatedPosts = useMemo(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, page, limit]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoadingSpinner />
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

  const totalPages = Math.ceil(filteredPosts.length / limit);

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
        <main>
          <Search
            onSearch={setSearch}
            onCategoryChange={setCategory}
            selectedCategory={category}
          />
          {paginatedPosts.length < 1 ? (
            <div>
              <p>No posts found...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {paginatedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </main>
      </div>
      <footer>
        <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 dark:border-gray-700 py-3">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </footer>
    </div>
  );
}
