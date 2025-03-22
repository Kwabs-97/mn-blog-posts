import React from "react";
import Link from "next/link";

function PostCard({ post, onDelete }) {
  console.log("post from PostCard", post.categories);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 mb-4">
      <div className="flex justify-between items-start mb-4">
        <Link
          href={`/post/${post.id}`}
          className="text-sm md:text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
        >
          {post.title}
        </Link>
        <div className="flex gap-2">
          <Link
            href={`/edit/${post.id}`}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(post.id)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {post.content}
      </p>

      <div className="flex flex-col gap-2 justify-between ">
        <div className="flex gap-2 flex-col">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-black">{post.author}</span>
          </div>
          <div className="flex flex-row gap-2">
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
