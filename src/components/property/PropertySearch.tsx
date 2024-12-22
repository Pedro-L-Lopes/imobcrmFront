import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { searchproperties } from "../../slices/propertySlice";
import Tag from "../utils/Tag";
import { PropertyType } from "../../types/property";
import { Link } from "react-router-dom";
import { CiHome, CiLocationOn, CiMoneyBill, CiUser } from "react-icons/ci";
import { PiHouseLine } from "react-icons/pi";
import { FaBuilding } from "react-icons/fa";

type PropertySearchProps = {
  onPropertySelect: (propertyId: string, purpose: string) => void;
  selectedPropertyId?: string;
  initialPurpose?: string;
};

const PropertySearch = ({
  onPropertySelect,
  selectedPropertyId,
  initialPurpose,
}: PropertySearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [purpose, setPurpose] = useState(initialPurpose || "venda");
  const [selectedProperty, setSelectedProperty] = useState<PropertyType | null>(
    null
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const { propertys, loading } = useSelector((state: any) => state.property);

  useEffect(() => {
    if (selectedPropertyId && propertys.length > 0) {
      const property = propertys.find(
        (p: PropertyType) => p.imovelId === selectedPropertyId
      );
      setSelectedProperty(property || null);
    }
  }, [selectedPropertyId, propertys]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setSelectedProperty(null);
    onPropertySelect("", purpose);

    if (term.length < 2) {
      setDropdownOpen(false);
      return;
    }

    setDropdownOpen(true);
    dispatch(
      searchproperties({
        purpose,
        orderBy: "codigo",
        sortDirection: "asc",
        searchTerm: term,
      })
    );
  };

  const handleSelectProperty = (property: PropertyType) => {
    setSelectedProperty(property);
    setSearchTerm("");
    setDropdownOpen(false);
    onPropertySelect(property.imovelId!, purpose);
  };

  const handleRemoveProperty = () => {
    setSelectedProperty(null);
    setSearchTerm("");
    onPropertySelect("", purpose);
  };

  const handlePurposeChange = (purpose: string) => {
    setPurpose(purpose);
    setSelectedProperty(null);
    onPropertySelect("", purpose);

    if (searchTerm.length >= 3) {
      dispatch(
        searchproperties({
          purpose: purpose,
          orderBy: "nome",
          sortDirection: "asc",
          searchTerm,
        })
      );
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={componentRef} className="relative w-full">
      {loading && <div className="absolute right-2 top-2">Carregando...</div>}

      {selectedProperty ? (
        <div className="border p-4 rounded bg-white border-blue-500 mt-2">
          <strong className="flex items-center gap-1 text-lg">
            <CiHome />
            {selectedProperty.codigo} - {selectedProperty.tipoImovel} -{" "}
            {selectedProperty.destinacao}
          </strong>
          <p className="flex items-center gap-1 text-sm text-gray-500 mt-2">
            <CiLocationOn /> {selectedProperty.rua}, {selectedProperty.numero} -{" "}
            {selectedProperty.bairro}, {selectedProperty.cidade}-
            {selectedProperty.estado} CEP: {selectedProperty.cep}
          </p>
          <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <CiMoneyBill /> R${" "}
            {selectedProperty.valor?.toLocaleString("pt-br", {
              minimumFractionDigits: 2,
            })}
          </p>
          <p className="flex items-center gap-1 text-sm text-gray-500 mt-2">
            <CiUser /> {selectedProperty.proprietarioNome}
          </p>
          <button
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleRemoveProperty}
          >
            Remover Imóvel
          </button>
        </div>
      ) : (
        <section className="flex items-center gap-4 border rounded-md">
          <div className="p-2 borde-r border-red-400">
            <label className="font-semibold">Finalidade do imóvel</label>
            {/* Seleção de Finalidade */}
            <div className="flex items-center justify-center gap-4 mb-2">
              <select
                value={purpose}
                onChange={(e) => handlePurposeChange(e.target.value)}
                className="text-white p-2 border rounded bg-blue-500"
              >
                <option value="venda" className="bg-blue-500">
                  Venda
                </option>
                <option value="aluguel" className="bg-blue-500">
                  Aluguel
                </option>
              </select>
            </div>
          </div>

          <div className="">
            <label className="font-semibold mb-1">Pesquise o imóvel</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchTerm.length >= 3 && setDropdownOpen(true)}
              placeholder="Pesquise por código, endereço ou proprietário"
              className="w-full border p-2 rounded"
            />
          </div>
        </section>
      )}

      {/* Dropdown de resultados */}
      {dropdownOpen && (
        <div className="absolute z-10 bg-white border w-full max-h-60 overflow-y-auto mt-1 rounded shadow-lg">
          {propertys && propertys.length > 0
            ? propertys.map((property: PropertyType) => (
                <div
                  key={property.imovelId}
                  className="flex items-center gap-1 p-2 hover:bg-gray-100 border-b cursor-pointer"
                  onClick={() => handleSelectProperty(property)}
                >
                  {/* <div className="w-full lg:w-2 h-28 bg-gradient-to-r from-blue-500 to-blue-300 rounded-sm flex items-center justify-center text-white"></div> */}
                  <section>
                    <strong className="flex items-center gap-1">
                      <CiHome />
                      {property.codigo} - {property.tipoImovel} -{" "}
                      {property.destinacao}
                    </strong>
                    <p className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                      <CiLocationOn /> {property.rua}, {property.numero} -{" "}
                      {property.bairro}, {property.cidade}-{property.estado}{" "}
                      CEP: {property.cep}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <CiMoneyBill /> R${" "}
                      {property.valor?.toLocaleString("pt-br")}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                      <CiUser /> {property.proprietarioNome}
                    </p>
                  </section>
                </div>
              ))
            : !loading && (
                <div className="p-2 text-sm text-gray-500">
                  Nenhum resultado encontrado.
                </div>
              )}
          <Link
            to="/novo-imovel"
            target="_blank"
            className="p-2 cursor-pointer hover:bg-gray-100 font-bold border-t"
          >
            + Adicionar Imóvel
          </Link>
        </div>
      )}
    </div>
  );
};

export default PropertySearch;
