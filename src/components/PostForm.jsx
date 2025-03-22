"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postFormSchema } from "@/lib/validations";
import EditorTinyMce from "./Editor";

const CATEGORIES = [
  "Web Development",
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "CSS",
  "Frontend",
  "Backend",
  "DevOps",
  "AI/ML",
];

function PostForm({ initialData, onSubmit, isSubmitting, isSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialData ? initialData.title : "",
      content: initialData ? initialData.content : "",
      author: initialData ? initialData.author : "",
      categories: initialData ? initialData.categories : [],
    },
    resolver: zodResolver(postFormSchema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Content
        </label>
        <EditorTinyMce
          value={register("content").value}
          onChange={(content) => {
            register("content").onChange({
              target: {
                value: content,
                name: "content",
              },
            });
          }}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Author
        </label>
        <input
          type="text"
          id="author"
          {...register("author")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        {errors.author && (
          <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Categories
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {CATEGORIES.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={category}
                {...register("categories")}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {category}
              </span>
            </label>
          ))}
        </div>
        {errors.categories && (
          <p className="mt-1 text-sm text-red-600">
            {errors.categories.message}
          </p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : initialData
            ? "Update Post"
            : "Create Post"}
        </button>
      </div>
    </form>
  );
}

export default PostForm;
