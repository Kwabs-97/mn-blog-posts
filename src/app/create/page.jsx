"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreatePost } from "@/hooks/usePosts";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setLoading, setError, addPost } from "@/store/postSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/loading-spinner";
import NavigateBack from "@/components/ArrowLeft";

function CreatePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  const loading = useAppSelector((state) => state.posts.loading);
  const error = useAppSelector((state) => state.posts.error);

  const createPostMutation = useCreatePost();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      dispatch(setLoading(true));
      const newPost = await createPostMutation.mutateAsync(formData);
      dispatch(addPost(newPost));
      router.push(`/post/${newPost.id}`);
    } catch (error) {
      console.error("Error creating post:", error);
      dispatch(setError(error.message));
    } finally {
      setIsSubmitting(false);
      dispatch(setLoading(false));
    }
  };

  if (error) {
    return (
      <div className="h-screen w-screen px-5 flex items-center justify-center">
        <p className="text-red-400 font-semibold">{`Error creating post. -${error}. Please try again later`}</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-4 lg:px-14">
      <header className="flex flex-row justify-between items-center">
        <NavigateBack />
        <h1 className="font-semibold">Create New Post</h1>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="content">Content</label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="author">Author</label>
          <Input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? <LoadingSpinner color="white" /> : "Create Post"}
        </Button>
      </form>
    </div>
  );
}

export default CreatePage;
