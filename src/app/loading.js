import { LoadingSpinner } from "@/components/loading-spinner";
import React from "react";

function loading() {
  return (
    <div className="min-h-screen flex items-center justify-center w-screen">
      <LoadingSpinner />
    </div>
  );
}

export default loading;
