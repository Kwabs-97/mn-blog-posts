"use client";
import React, { useState, useEffect } from "react";
import { useDeletePost, usePost } from "@/hooks/usePosts";
import { useParams, useRouter } from "next/navigation";
import NavigateBack from "@/components/ArrowLeft";
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
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  setCurrentPost,
  setLoading,
  setError,
} from "../../../../store/postSlice";
import { toast } from "sonner";
import CategoryCard from "@/components/category-card";

function page() {
  //extract dynamic id with useParams
  const { id: _id } = useParams(); // Extract _id from useParams

  const router = useRouter();

  //managing deleting state with a local useState
  const [isDeleting, setIsDeleting] = useState(false);

  console.log(_id)

  const dispatch = useAppDispatch();

  // selection currentPost, loading and error from redux global state
  const currentPost = useAppSelector((state) => state.posts.currentPost);
  const loading = useAppSelector((state) => state.posts.loading);
  const error = useAppSelector((state) => state.posts.error);

  // getting specific post data using the usePost hook
  const { data, isLoading, isError, error: queryError } = usePost(_id); // Pass _id to usePost
  console.log(data?.post); // Log the correct property

  // useDeletePost hook to delete post
  const deletePost = useDeletePost();
 

  // updating loading, error and current post state in redux

  useEffect(() => {
    if (data) {
      dispatch(setCurrentPost(data.post));
    }
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(setError(queryError));
    }
  }, [isError, queryError, dispatch]);

  // get the timestamp of createdAt handling it on client side
  const [time, setTime] = useState("");

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deletePost.mutateAsync(_id); // Pass _id to deletePost
      toast.success("Post has successfully been deleted ");
      router.push("/");
    } catch (error) {
      setIsDeleting(false);
      toast.error("Error deleting post");
      console.log("error deleting post");
    }
  };

  function handleEditNavigation() {
    router.push(`/edit/${_id}`); // Use _id for navigation
  }

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen px-5 flex items-center justify-center">
        <p className="text-red-400 font-semibold">{`Error loading post. -${error}. Please try again later`}</p>
      </div>
    );
  }


  return (
    <div className="p-6 flex flex-col gap-4 lg:px-14">
      <header
        id="blog card"
        className="flex flex-row justify-between items-center"
      >
        <NavigateBack />
        <p className="font-semibold ">{currentPost?.title}</p>
      </header>
      <main className="prose dark:prose-invert max-w-none flex flex-col gap-5">
        <p>{currentPost?.content}</p>
        <div className="flex flex-row gap-2">
          {currentPost?.categories.map((category, index) => {
            return <CategoryCard key={index}>{category}</CategoryCard>;
          })}
        </div>
      </main>
      <footer className="flex flex-col gap-2 justify-center">
        <div>
          <span>written by:</span>
          <p className="font-semibold">{currentPost?.author}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Clock size={12} />
          <time>{currentPost ? currentPost.createdAt : ""}</time>
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
