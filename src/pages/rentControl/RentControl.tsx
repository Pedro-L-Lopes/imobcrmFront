import { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { usePagination } from "../../hooks/usePagination";
import { useSort } from "../../hooks/useSort";
import Message from "../../components/utils/Button";
import Pagination from "../../components/utils/Pagination";
import Button from "../../components/utils/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import RentControlTable from "../../components/rentControl/RentControlTable";
import { getRentalContracts } from "../../slices/rentalContractSlice";
import { getRentControl } from "../../slices/rentControlSlice";

function RentControl() {
  const dispatch = useAppDispatch();

  const totalPages = useSelector(
    (state: RootState) => state.rentControl.totalPages || 1
  );

  const totalCount = useSelector(
    (state: RootState) => state.rentControl.totalCount || 0
  );

  const { currentPage, handleNextPage, handlePreviousPage, setPage } =
    usePagination(totalPages);

  const { rentControls, error, loading, message } = useSelector(
    (state: RootState) => state.rentControl
  );

  const { orderBy, sortDirection, handleSort } = useSort({
    defaultOrderBy: "vencimentoaluguel",
    defaultSortDirection: "asc",
  });

  useEffect(() => {
    dispatch(
      getRentControl({
        currentPage,
        orderBy,
        sortDirection,
      })
    );
  }, [dispatch, currentPage, orderBy, sortDirection]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start mt-4 overflow-hidden">
      <header className="text-3xl font-bold text-gray-800 ml-4 mt-2 mb-2">
        Controle contratos aluguel
      </header>
      {/* {error && <Message text={message} type="error" />} */}

      {loading ? (
        <div className="text-center text-gray-500 font-medium">
          Carregando...
        </div>
      ) : rentControls && rentControls.length > 0 ? (
        <>
          <div className="overflow-x-scroll overflow-y-hidden rounded-md">
            <RentControlTable
              rentControls={rentControls}
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
  );
}

export default RentControl;
