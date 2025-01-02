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
import RentalContractTable from "./RentalContractsTable";
import { getRentalContracts } from "../../slices/rentalContractSlice";

function RentalContractList() {
  const dispatch = useAppDispatch();

  const totalPages = useSelector(
    (state: RootState) => state.rentalContract.totalPages || 1
  );

  const totalCount = useSelector(
    (state: RootState) => state.rentalContract.totalCount || 0
  );

  const { currentPage, handleNextPage, handlePreviousPage, setPage } =
    usePagination(totalPages);

  const { rentalContracts, error, loading, message } = useSelector(
    (state: RootState) => state.rentalContract
  );

  const { orderBy, sortDirection, handleSort } = useSort({
    defaultOrderBy: "ultimaedicao",
    defaultSortDirection: "desc",
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(
      getRentalContracts({
        currentPage,
        orderBy,
        sortDirection,
        searchTerm,
        status: "",
        startDate: "",
        endDate: "",
      })
    );
  }, [dispatch, currentPage, orderBy, sortDirection, searchTerm]);

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      setPage(1);
    },
    [setPage]
  );

  return (
    <div className="w-full min-h-screen flex flex-col justify-start mt-4 overflow-hidden">
      <header className="text-3xl font-bold text-gray-800 ml-4 mt-2">
        Listagem de Contratos de Aluguel
      </header>

      <div className="p-8 bg-gray-100 rounded-lg shadow-md mt-2 space-y-6">
        <div className="flex items-center justify-between">
          <Search onSearch={handleSearch} />
          <Button
            icon={<AiOutlinePlus size={20} className="mr-1" />}
            link="/novo-contrato-aluguel"
            title="Inserir Contrato"
          />
        </div>

        {error && <Message text={message} type="error" />}

        {loading ? (
          <div className="text-center text-gray-500 font-medium">
            Carregando...
          </div>
        ) : rentalContracts && rentalContracts.length > 0 ? (
          <>
            <div className="overflow-x-scroll overflow-y-hidden rounded-md">
              <RentalContractTable
                contracts={rentalContracts}
                handleSort={handleSort}
              />
            </div>
            <Pagination
              totalCount={totalCount}
              currentPage={currentPage}
              totalPages={totalPages}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
            />
          </>
        ) : (
          <div className="text-center text-gray-500 font-medium">
            Nenhum contrato de aluguel encontrado.
          </div>
        )}
      </div>
    </div>
  );
}

export default RentalContractList;
