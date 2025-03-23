"use client";
import React from "react";
import { useUpdatePost, usePost } from "@/hooks/usePosts";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import PostForm from "@/components/PostForm";
import { LoadingSpinner } from "@/components/loading-spinner";
import { toast } from "sonner";

function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: post, error, isLoading, isSuccess } = usePost(id);
  const updatePost = useUpdatePost();
  const handleSubmit = async (data) => {
    try {
      await updatePost.mutateAsync({ id, data });
      router.push(`/post/${id}`);
      toast.success("Post has successfully been updated ");
    } catch (error) {
      toast.error("error updating post");
      console.log("Error updating post:", error);
      return;
    }
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: Post not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Edit Post
            </h1>
            <Link
              href={`/post/${id}`}
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Cancel
            </Link>
          </div>

          <PostForm
            initialData={post}
            onSubmit={handleSubmit}
            isSubmitting={updatePost.isPending}
            isSuccess={isSuccess}
          />
        </div>
      </div>
    </div>
  );
}

export default EditPage;
