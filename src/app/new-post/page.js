"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCreatePost } from "@/hooks/usePosts";
import PostForm from "@/components/PostForm";
import { useState } from "react";
import { toast } from "sonner";

function AddPost() {
  const [postSuccess, setPostSuccess] = useState(false);
  const router = useRouter();
  const createPost = useCreatePost();
  const { mutateAsync, isError, error, isPending, isSuccess } = createPost;
  useEffect(() => {
    if (isSuccess) {
      toast("Blog has been created successfully");
    }
  }, [isSuccess]);

  const handleSubmit = async (data) => {
    try {
      await mutateAsync(data);
      toast.success("Blog created successfully");
      // navigate to post after successfully adding to posts
      router.push("/");
    } catch (error) {
      toast.error("Failed to create blog post");
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create New Post
            </h1>
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Cancel
            </Link>
          </div>

          <PostForm onSubmit={handleSubmit} isSubmitting={isPending} />
        </div>
      </div>
    </div>
  );
}

export default AddPost;
