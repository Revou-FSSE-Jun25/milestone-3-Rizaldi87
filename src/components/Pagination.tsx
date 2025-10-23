"use client";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export default function Pagination({ currentPage, setCurrentPage, totalPages }: PaginationProps) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50">
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded-md ${currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"}`}>
          {i + 1}
        </button>
      ))}

      <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50">
        Next
      </button>
    </div>
  );
}
