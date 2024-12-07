import { useState } from "react";

export function usePagination(totalPages: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const setPage = (number: number) => {
    setCurrentPage(number);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return { currentPage, handleNextPage, handlePreviousPage, setPage };
}
