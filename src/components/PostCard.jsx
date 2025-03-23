"use client";
import React from "react";
import Link from "next/link";
import PostContent from "./PostContent";
import { useRouter } from "next/navigation";

function PostCard({ post, onDelete }) {
  const router = useRouter();
  function handleNavigation() {
    router.push(`/post/${post.id}`);
  }
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 mb-4 lg:p-8 hover:cursor-pointer hover:bg-blue-100 duration-200 "
      onClick={handleNavigation}
    >
      <div className="flex justify-between items-start mb-4">
        <Link
          href={`/post/${post.id}`}
          className="text-sm md:text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
        >
          {post.title}
        </Link>
      </div>

      <div className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        <PostContent content={post.content} />
      </div>

      <div className="flex flex-col gap-2 justify-between ">
        <div className="flex gap-2 flex-col">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-black">{post.author}</span>
          </div>
          <div className="flex flex-row gap-2 flex-wrap">
            {post?.categories?.map((category, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
