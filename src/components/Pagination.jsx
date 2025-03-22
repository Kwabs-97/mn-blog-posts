import React from "react";
export function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
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

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex items-center gap-1">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
        </li>

        {currentPage > 3 && totalPages > maxVisiblePages && (
          <>
            <li>
              <button
                onClick={() => onPageChange(1)}
                className="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                1
              </button>
            </li>
            <li className="px-2">...</li>
          </>
        )}

        {visiblePages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          </li>
        ))}

        {currentPage < totalPages - 2 && totalPages > maxVisiblePages && (
          <>
            <li className="px-2">...</li>
            <li>
              <button
                onClick={() => onPageChange(totalPages)}
                className="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {totalPages}
              </button>
            </li>
          </>
        )}

        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
