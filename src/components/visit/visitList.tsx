import { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { usePagination } from "../../hooks/usePagination";
import { useSort } from "../../hooks/useSort";
import dayjs from "dayjs";
import Search from "../Search";
import Message from "../utils/Message";
import Pagination from "../utils/Pagination";
import Button from "../utils/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getVisits } from "../../slices/visitSlice";
import VisitsTable from "./VisitCard";
import { MdArrowUpward } from "react-icons/md";

function VisitList() {
  const dispatch = useAppDispatch();

  // Pagination
  const totalPages = useSelector(
    (state: RootState) => state.visit.totalPages || 1
  );
  const totalCount = useSelector(
    (state: RootState) => state.visit.totalCount || 0
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

  // Filters
  const [situacao, setSituacao] = useState("");
  const [dataInicio, setDataInicio] = useState<string>(
    dayjs().subtract(1, "year").startOf("day").toISOString()
  );
  const [dataFim, setDataFim] = useState<string>(
    dayjs().add(1, "month").endOf("day").toISOString()
  );

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Update date filters
  const handleDateFilter = (filter: string) => {
    const today = dayjs();
    switch (filter) {
      case "hoje":
        setDataInicio(today.startOf("day").toISOString());
        setDataFim(today.endOf("day").toISOString());
        break;
      case "amanha":
        const tomorrow = today.add(1, "day");
        setDataInicio(tomorrow.startOf("day").toISOString());
        setDataFim(tomorrow.endOf("day").toISOString());
        break;
      case "semana":
        setDataInicio(today.startOf("week").toISOString());
        setDataFim(today.endOf("week").toISOString());
        break;
      default:
        break;
    }
    setPage(1); // Reset to the first page
  };

  // Fetch visits with filters, pagination, and sorting
  useEffect(() => {
    dispatch(
      getVisits({
        currentPage,
        orderBy,
        sortDirection,
        situacao,
        dataInicio,
        dataFim,
        searchTerm,
        totalCount: 0,
      })
    );
  }, [
    dispatch,
    currentPage,
    orderBy,
    sortDirection,
    situacao,
    dataInicio,
    dataFim,
    searchTerm,
  ]);

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

      <div className="p-8 bg-gray-100 rounded-lg shadow-md mt-2 space-y-6">
        {/* Filters */}
        <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
          <div className="text-start">
            {/* Situation Filter */}
            <label>Situação</label>
            <div>
              <select
                value={situacao}
                onChange={(e) => setSituacao(e.target.value)}
                className="border border-gray-300 hover:opacity-80 hover:border-blue-500 rounded-md px-2 py-1 text-gray-700 focus:outline-none"
              >
                <option value="">Todas</option>
                <option value="pendente">Pendente</option>
                <option value="confirmada">Confirmada</option>
                <option value="cancelada">Cancelada</option>
                <option value="reagendada">Reagendada</option>
                <option value="em_andamento">Em andamento</option>
                <option value="concluida">Concluída</option>
                <option value="nao_compareceu">Não compareceu</option>
                <option value="em_atendimento">Em atendimento</option>
              </select>
            </div>
          </div>

          {/* Date Filters */}
          <div className="text-center">
            <label className="text-center">Períodos pré selecionados</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDateFilter("hoje")}
                className={`px-4 py-2 text-gray-800 bg-gray-50 border rounded-lg hover:opacity-80 hover:border-blue-500 ${
                  dataInicio === dayjs().startOf("day").toISOString() &&
                  dataFim === dayjs().endOf("day").toISOString()
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                Visitas Hoje
              </button>
              <button
                onClick={() => handleDateFilter("amanha")}
                className={`px-4 py-2 text-gray-800 bg-gray-50 border rounded-lg hover:opacity-80 hover:border-blue-500 ${
                  dataInicio ===
                    dayjs().add(1, "day").startOf("day").toISOString() &&
                  dataFim === dayjs().add(1, "day").endOf("day").toISOString()
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                Visitas Amanhã
              </button>
              <button
                onClick={() => handleDateFilter("semana")}
                className={`px-4 py-2 text-gray-800 bg-gray-50 border rounded-lg hover:opacity-80 hover:border-blue-500 ${
                  dataInicio === dayjs().startOf("week").toISOString() &&
                  dataFim === dayjs().endOf("week").toISOString()
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                Visitas Esta Semana
              </button>
            </div>
          </div>

          <section className="text-center">
            {/* Custom Date Range */}
            <label className="text-center">
              Período personalizado (padrão)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dayjs(dataInicio).format("YYYY-MM-DD")}
                onChange={(e) =>
                  setDataInicio(
                    dayjs(e.target.value).startOf("day").toISOString()
                  )
                }
                className="bg-gray-50 border border-gray-300 rounded-md px-2 py-1 hover:opacity-80 hover:border-blue-500"
              />
              <input
                type="date"
                value={dayjs(dataFim).format("YYYY-MM-DD")}
                onChange={(e) =>
                  setDataFim(dayjs(e.target.value).endOf("day").toISOString())
                }
                className="bg-gray-50 border border-gray-300 rounded-md px-2 py-1 hover:opacity-80 hover:border-blue-500"
              />
            </div>
          </section>
        </div>

        <div className="flex items-center justify-between gap-4">
          <section className="flex items-center gap-4 flex-wrap">
            {ordinations.map((field) => (
              <button
                key={field.name}
                onClick={() => handleSort(field.name)}
                className={`px-4 py-2 text-gray-800 border rounded-lg flex items-center gap-2 ${
                  orderBy === field.name ? "bg-white" : ""
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
              totalCount={totalCount}
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
