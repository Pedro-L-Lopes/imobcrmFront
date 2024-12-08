import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { usePagination } from "../../hooks/usePagination";
import { useSort } from "../../hooks/useSort";
import { getPropertys } from "../../slices/propertySlice";
import { PropertyType } from "../../types/property";
import Message from "../utils/Message";
import Pagination from "../utils/Pagination";
import { MdArrowUpward } from "react-icons/md";

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
    avaliation: "",
    withPlate: "",
    autorizationType: "",
    searchTerm: "",
  });

  console.log(filters);

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

  const ordinations = [
    {
      name: "ultimaedicao",
      label: "Ultima Edição",
    },
    {
      name: "valor",
      label: "Valor",
    },
    {
      name: "area",
      label: "Área",
    },
    {
      name: "bairro",
      label: "Bairro",
    },
    {
      name: "codigo",
      label: "Código",
    },
  ];

  const filterOptions = [
    {
      name: "purpose",
      label: "Finalidade",
      options: [
        { value: "venda", label: "Venda" },
        { value: "aluguel", label: "Aluguel" },
      ],
    },
    {
      name: "typeProperty",
      label: "Tipo",
      options: [
        { value: "apartamento", label: "Apartamento" },
        { value: "casa", label: "Casa" },
        { value: "comercial", label: "Comercial" },
        { value: "terreno", label: "Terreno" },
      ],
    },
    {
      name: "situation",
      label: "Situação",
      options: [
        { value: "disponivel", label: "Disponível" },
        { value: "moderacao", label: "Moderação" },
        { value: "alugado", label: "Alugado" },
        { value: "alugado/disponivelvenda", label: "Alugado/Disponível Venda" },
        { value: "vendido", label: "Vendido" },
      ],
    },
    {
      name: "avaliation",
      label: "Avaliação",
      options: [
        { value: "true", label: "Com Avaliação" },
        { value: "false", label: "Sem Avaliação" },
      ],
    },
    {
      name: "withPlate",
      label: "Placa/Adesivo",
      options: [
        { value: "true", label: "Com Placa/adesivo" },
        { value: "false", label: "Sem Placa/adesivo" },
      ],
    },
    {
      name: "autorizationType",
      label: "Autorização",
      options: [
        { value: "com exclusividade", label: "Com Exclusividade" },
        { value: "sem exclusividade", label: "Sem Exclusividade" },
        { value: "sem autorizacao", label: "Sem Autorização" },
      ],
    },
  ];

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
        {filterOptions.map((filter) => (
          <select
            key={filter.name}
            name={filter.name}
            value={filters[filter.name as keyof typeof filters]}
            onChange={handleFilterChange}
            className="border rounded-lg px-4 py-2"
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

      <div className="flex items-center gap-4 mb-4">
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