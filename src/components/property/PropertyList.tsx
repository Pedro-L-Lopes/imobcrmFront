import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { usePagination } from "../../hooks/usePagination";
import { useSort } from "../../hooks/useSort";
import { getPropertys } from "../../slices/propertySlice";
import { PropertyType } from "../../types/property";
import Message from "../utils/Message";
import Pagination from "../utils/Pagination";

function PropertyList() {
  const dispatch = useDispatch<AppDispatch>();
  const totalPages = useSelector(
    (state: RootState) => state.property.totalPages || 1
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
    purpose: "",
    typeProperty: "",
    situation: "",
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
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <header className="text-2xl font-medium mb-4">Lista de Imóveis</header>

      <div className="flex flex-wrap gap-4 mb-6">
        {["purpose", "typeProperty", "situation"].map((filter) => (
          <select
            key={filter}
            name={filter}
            value={filters[filter as keyof typeof filters]}
            onChange={handleFilterChange}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">
              {filter === "purpose"
                ? "Finalidade"
                : filter === "typeProperty"
                ? "Tipo"
                : "Situação"}
            </option>
            {filter === "purpose" && (
              <>
                <option value="venda">Venda</option>
                <option value="aluguel">Aluguel</option>
              </>
            )}
            {filter === "typeProperty" && (
              <>
                <option value="apartamento">Apartamento</option>
                <option value="casa">Casa</option>
                <option value="comercial">Comercial</option>
                <option value="terreno">Terreno</option>
              </>
            )}
            {filter === "situation" && (
              <>
                <option value="disponivel">Disponível</option>
                <option value="moderacao">Moderação</option>
                <option value="alugado">Alugado</option>
                <option value="vendido">Vendido</option>
              </>
            )}
          </select>
        ))}
        <input
          type="text"
          name="searchTerm"
          placeholder="Buscar por palavra-chave"
          value={filters.searchTerm}
          onChange={handleFilterChange}
          className="border rounded-lg px-4 py-2 flex-1"
        />
      </div>

      <div className="flex items-center gap-4 mb-4">
        {["ultimadicao", "valor", "area", "bairro", "codigo"].map((field) => (
          <button
            key={field}
            onClick={() => handleSort(field)}
            className={`px-4 py-2 ${
              orderBy === field
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </button>
        ))}
        <button
          onClick={() => handleSort(orderBy)}
          className="px-4 py-2 bg-gray-200 text-gray-800"
        >
          {sortDirection === "asc" ? "Ascendente ↑" : "Descendente ↓"}
        </button>
      </div>

      {error && <Message text={message} type="error" />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center text-gray-500">
            Carregando...
          </div>
        ) : propertys?.length > 0 ? (
          propertys.map((property: PropertyType) => (
            <div
              key={property.imovelid}
              className="bg-gray-100 rounded-lg shadow-md p-4 border"
            >
              <p className="text-sm mb-2">
                <span className="font-semibold">Cód:</span> {property.codigo} |{" "}
                <span className="font-semibold">Valor:</span> R${" "}
                {property.valor?.toLocaleString()} |{" "}
                <span className="font-semibold">Área:</span> {property.area}m²
              </p>
              <p className="text-sm mb-2">
                {property.rua}, nº {property.numero}, {property.bairro},{" "}
                {property.cidade}-{property.estado}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Proprietário:</span>{" "}
                {property.proprietarioNome || "N/A"}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Nenhum imóvel encontrado.
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
}

export default PropertyList;
