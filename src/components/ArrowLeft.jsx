"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
function NavigateBack() {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/");
  };
  return (
    <ArrowLeft
      onClick={handleNavigate}
      color="#6B7280"
      className="hover:cursor-pointer"
    />
  );
}

export default NavigateBack;
