import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        className={`px-6 py-3 text-white rounded-md font-medium focus:ring-2 ${
          currentPage === 1 ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Anterior
      </button>
      <span className="text-lg">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`px-6 py-3 text-white rounded-md font-medium focus:ring-2 ${
          currentPage === totalPages
            ? "bg-gray-300"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Próxima
      </button>
    </div>
  );
};

export default Pagination;
