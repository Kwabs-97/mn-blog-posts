"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDeletePost, usePost } from "@/hooks/usePosts";
import { useParams, useRouter } from "next/navigation";
import NavigateBack from "@/components/ArrowLeft";
import PostContent from "@/components/PostContent";
import { Clock, Trash2, FilePenLine } from "lucide-react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function page() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = usePost(id);
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const deletePost = useDeletePost();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deletePost.mutateAsync(id);
      router.push("/");
    } catch (error) {
      console.log("error deleting post");
    }
  };

  function handleEditNavigation() {
    router.push(`/edit/${id}`);
  }
  return (
    <div className="p-6 flex flex-col gap-4 lg:px-14">
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
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              className="flex flex-row gap-2 items-center justify-center"
            >
              Delete <Trash2 />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogDescription>Post delete</DialogDescription>
            <DialogHeader>
              <DialogTitle>
                <p>Are you sure you want to delete this post?</p>
              </DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <DialogClose className="border bg-gray-100 p-1 text-base rounded-md hover:cursor-pointer">
                Cancel
              </DialogClose>
              <Button
                className="p-2 flex items-center justify-center"
                variant="destructive"
                type="submit"
                onClick={handleDelete}
              >
                {isDeleting ? <LoadingSpinner color="white" /> : " Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </aside>
    </div>
  );
}

export default page;
