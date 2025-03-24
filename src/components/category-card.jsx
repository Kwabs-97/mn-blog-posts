"use client";
import { cn } from "@/lib/utils";
import React from "react";
function CategoryCard({ children, className }) {
  return (
    <span
      className={cn(
        "px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-sm",
        className
      )}
    >
      {children}
    </span>
  );
}

export default CategoryCard;
