import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { usePagination } from "../../hooks/usePagination";
import { useSort } from "../../hooks/useSort";
import { Link } from "react-router-dom";
import { getClients } from "../../slices/clientSlice";
import Search from "../Search";
import Message from "../utils/Message";
import ClientsTable from "./ClientsTable";
import Pagination from "../utils/Pagination";

function ClientList() {
  const dispatch = useDispatch<AppDispatch>();
  const totalPages = useSelector(
    (state: RootState) => state.client.totalPages || 1
  );
  const { currentPage, handleNextPage, handlePreviousPage, setPage } =
    usePagination(totalPages);
  const { clients, error, loading, message } = useSelector(
    (state: RootState) => state.client
  );

  const { orderBy, sortDirection, handleSort } = useSort({
    defaultOrderBy: "ultimaedicao",
    defaultSortDirection: "desc",
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getClients({ currentPage, orderBy, sortDirection, searchTerm }));
  }, [dispatch, currentPage, orderBy, sortDirection, searchTerm]);

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      setPage(1);
    },
    [setPage]
  );

  return (
    <div>
      <header className="text-2xl font-medium ml-4 mt-5">
        Listagem de clientes
      </header>
      <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <Search onSearch={handleSearch} />
          <Link to="/novo-cliente">
            <button className="bg-blue-600 text-white p-2 font-medium rounded-md hover:opacity-90 transition-all">
              Inserir cliente
            </button>
          </Link>
        </div>

        {error && <Message text={message} type="error" />}
        {loading ? (
          <div className="text-center text-gray-500">Carregando...</div>
        ) : clients && clients.length > 0 ? (
          <>
            <ClientsTable clients={clients} handleSort={handleSort} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
            />
          </>
        ) : (
          <div className="text-center text-gray-500">
            Nenhum cliente encontrado.
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientList;
