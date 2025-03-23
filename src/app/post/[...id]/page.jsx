"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useDeletePost, usePost } from "@/hooks/usePosts";
import { useParams, useRouter } from "next/navigation";
import NavigateBack from "@/components/ArrowLeft";
import PostContent from "@/components/PostContent";
import { Clock, Trash2, FilePenLine } from "lucide-react";
import { Button } from "@/components/ui/button";

function page() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = usePost(id);
  const router = useRouter();

  const [delPost, setDelPost] = useState(false);

  const deletePost = useDeletePost();

  const handleDelete = async () => {
    try {
      if (delPost) {
        await deletePost.mutateAsync(id);
      }
    } catch (error) {
      console.log("error deleting post");
    }
  };

  function handleEditNavigation() {
    router.push(`/edit/${id}`);
  }
  return (
    <div className="p-6 flex flex-col gap-4 px-14 lg:items-center lg:justify-center">
      <header
        id="blog card"
        className="flex flex-row justify-between items-center"
      >
        <NavigateBack />
        <p className="font-semibold ">{data?.title}</p>
      </header>
      <main className="prose dark:prose-invert max-w-none">
        <p>{data?.content}</p>
      </main>
      <footer className="flex flex-col gap-2 justify-center">
        <div>
          <span>written by:</span>
          <p className="font-semibold">{data?.author}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Clock size={12} />
          <time>{new Date().toDateString()}</time>
        </div>
      </footer>
      <aside className="flex flex-row items-center gap-2">
        <Button
          className="flex flex-row gap-2 items-center justify-center bg-white text-black hover:text-white"
          onClick={handleEditNavigation}
        >
          Edit
          <FilePenLine />
        </Button>
        <Button
          className="flex flex-row gap-2 items-center justify-center"
          variant="destructive"
        >
          Delete
          <Trash2 />
        </Button>
      </aside>
    </div>
  );
}

export default page;
