import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { usePagination } from "../../hooks/usePagination";
import { useSort } from "../../hooks/useSort";
import { getPropertys } from "../../slices/propertySlice";
import Message from "../utils/Message";
import Pagination from "../utils/Pagination";
import { MdArrowUpward } from "react-icons/md";
import { ordinations, filterOptions } from "../../utils/propertyUtils";
import PropertyCard from "./PropertyCard";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../utils/Button";

function PropertyList() {
  const dispatch = useDispatch<AppDispatch>();

  const totalPages = useSelector(
    (state: RootState) => state.property.totalPages || 1
  );

  const totalCount = useSelector(
    (state: RootState) => state.property.totalCount || 0
  );

  const { propertys, error, loading, message } = useSelector(
    (state: RootState) => state.property
  );

  const { currentPage, handleNextPage, handlePreviousPage } =
    usePagination(totalPages);

  const { orderBy, sortDirection, handleSort } = useSort({
    defaultOrderBy: "ultimaedicao",
    defaultSortDirection: "desc",
  });

  const [filters, setFilters] = useState({
    purpose: "venda",
    typeProperty: "",
    situation: "Disponível",
    avaliation: "",
    withPlate: "",
    autorizationType: "",
    searchTerm: "",
  });

  useEffect(() => {
    dispatch(
      getPropertys({
        ...filters,
        currentPage,
        orderBy,
        sortDirection,
      })
    );
  }, [dispatch, filters, currentPage, orderBy, sortDirection]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start mt-4">
      <header className="text-3xl font-bold text-gray-800 ml-4 mt-2">
        Listagem de Imóveis
      </header>

      <div className="p-10 bg-gray-100 w-full m-2 rounded-sm">
        <div className="flex-col flex-wrap gap-4 mb-6 border p-2 shadow-sm rounded-md">
          <h1 className="text-xl font-semibold mb-2">Filtros</h1>
          {filterOptions.map((filter) => (
            <select
              key={filter.name}
              name={filter.name}
              value={filters[filter.name as keyof typeof filters]}
              onChange={handleFilterChange}
              className="border rounded-lg px-4 py-2 m-1"
            >
              <option value="">{filter.label}</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ))}
        </div>

        {/* <input
        type="text"
        name="searchTerm"
        placeholder="Buscar por palavra-chave"
        value={filters.searchTerm}
        onChange={handleFilterChange}
        className="border rounded-lg px-4 py-2 flex-1"
      /> */}

        <div className="flex items-center justify-between gap-4 mb-4">
          <section className="flex items-center justify-between gap-4">
            <select
              value={orderBy}
              onChange={(e) => handleSort(e.target.value)}
              className="px-4 py-2 text-gray-800 bg-gray-50 border rounded-lg"
            >
              {ordinations.map((field) => (
                <option key={field.name} value={field.name}>
                  Ordenar por: {field.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => handleSort(orderBy)}
              className="px-4 py-2 text-gray-800 bg-gray-50 border rounded-lg"
            >
              {sortDirection === "asc" ? (
                <MdArrowUpward size={23} />
              ) : (
                <MdArrowUpward size={23} className="rotate-180" />
              )}
            </button>
          </section>
          <Button
            icon={<AiOutlinePlus size={20} className="mr-1" />}
            link="/novo-imovel"
            title="Inserir Imóvel"
          />
        </div>

        {error && <Message text={message} type="error" />}

        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
          {loading ? (
            <div className="col-span-full text-center text-gray-500">
              Carregando...
            </div>
          ) : propertys?.length > 0 ? (
            propertys.map((property) => (
              <PropertyCard key={property.codigo} property={property} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              Nenhum imóvel encontrado.
            </div>
          )}
        </main>
      </div>

      <Pagination
        totalCount={totalCount}
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
}

export default PropertyList;
