"use client";
import React from "react";
import Link from "next/link";
import { useDeletePost, usePost } from "@/hooks/usePosts";
import { useParams, useRouter } from "next/navigation";

function page() {
  const {} = useParams();
  const {} = usePost;
  return <div>page</div>;
}

export default page;
