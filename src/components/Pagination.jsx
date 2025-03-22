import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (i) => i + 1);
  const maxVisiblePages = 5;

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) return pages;

    const start = Math.max(
      Math.min(
        currentPage - Math.floor(maxVisiblePages / 2),
        totalPages - maxVisiblePages + 1
      ),
      1
    );

    const end = Math.min(start + maxVisiblePages - 1, totalPages);
    return pages.slice(start - 1, end);
  };

  const visblePages = getVisiblePages();

  return (<div>Pagination</div>);
}

export default Pagination;
