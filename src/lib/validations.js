import { z } from "zod";

export const postFormSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters"),
  content: z
    .string()
    .min(50, "Content must be at least 50 characters")
    .max(5000, "Content must not exceed 5000 characters")
    .refine((content) => {
      // Remove HTML tags and check the actual text content length
      const textContent = content.replace(/<[^>]*>/g, "").trim();
      return textContent.length >= 50 && textContent.length <= 5000;
    }, "Content must be between 50 and 5000 characters (excluding HTML tags)"),
  author: z
    .string()
    .min(2, "Author name must be at least 2 characters")
    .max(50, "Author name must not exceed 50 characters"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
});
