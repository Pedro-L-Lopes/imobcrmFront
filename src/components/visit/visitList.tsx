import { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { usePagination } from "../../hooks/usePagination";
import { useSort } from "../../hooks/useSort";
import Search from "../Search";
import Message from "../utils/Message";
import Pagination from "../utils/Pagination";
import Button from "../utils/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getVisits } from "../../slices/visitSlice";
import VisitsTable from "./VisitsTable";
import { MdArrowUpward } from "react-icons/md";

function VisitList() {
  const dispatch = useAppDispatch();

  // Pagination
  const totalPages = useSelector(
    (state: RootState) => state.visit.totalPages || 1
  );
  const { currentPage, handleNextPage, handlePreviousPage, setPage } =
    usePagination(totalPages);

  // Visits data
  const { visits, error, loading, message } = useSelector(
    (state: RootState) => state.visit
  );

  // Sorting
  const { orderBy, sortDirection, handleSort } = useSort({
    defaultOrderBy: "dataHora",
    defaultSortDirection: "desc",
  });

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch visits with filters, pagination, and sorting
  useEffect(() => {
    dispatch(getVisits({ currentPage, orderBy, sortDirection, searchTerm }));
  }, [dispatch, currentPage, orderBy, sortDirection, searchTerm]);

  // Handle search
  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      setPage(1);
    },
    [setPage]
  );

  const ordinations = [{ name: "dataHora", label: "Data e hora" }];

  return (
    <div className="w-full min-h-screen flex flex-col justify-start mt-4">
      <header className="text-3xl font-bold text-gray-800 ml-4 mt-2">
        Listagem de Visitas
      </header>

      <div className="p-8 bg-white rounded-lg shadow-md mt-2 space-y-6">
        {/* <div className="flex items-center justify-between">
          <Search onSearch={handleSearch} />
        </div> */}

        <div className="flex items-center justify-between gap-4 mb-4">
          <section className="flex items-center gap-4 flex-wrap">
            {ordinations.map((field) => (
              <button
                key={field.name}
                onClick={() => handleSort(field.name)}
                className={`px-4 py-2 text-gray-800 border rounded-lg flex items-center gap-2 ${
                  orderBy === field.name ? "bg-blue-100" : "bg-gray-50"
                }`}
              >
                Ordenar por: {field.label}
                {orderBy === field.name && (
                  <MdArrowUpward
                    size={20}
                    className={sortDirection === "asc" ? "" : "rotate-180"}
                  />
                )}
              </button>
            ))}
          </section>
          <Button
            icon={<AiOutlinePlus size={20} className="mr-1" />}
            link="/nova-visita"
            title="Inserir Visita"
          />
        </div>

        {/* Error Message */}
        {error && <Message text={message} type="error" />}

        {/* Visits Table */}
        {loading ? (
          <div className="text-center text-gray-500 font-medium">
            Carregando...
          </div>
        ) : visits && visits.length > 0 ? (
          <>
            <VisitsTable visits={visits} handleSort={handleSort} />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
            />
          </>
        ) : (
          <div className="text-center text-gray-500 font-medium">
            Nenhuma visita encontrada.
          </div>
        )}
      </div>
    </div>
  );
}

export default VisitList;
