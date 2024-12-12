import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { LocationType } from "../../types/location";
import { getLocationsByOneTerm } from "../../slices/locationSlice";

type locationSearchProps = {
  onlocationSelect: (locationId: number) => void;
};

const LocationSearch: React.FC<locationSearchProps> = ({
  onlocationSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isValid, setIsValid] = useState(false); // Adicionado estado para validação

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const { locations, loading } = useSelector((state: any) => state.location);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setIsValid(false); // Reseta a validade ao editar manualmente
    onlocationSelect(0); // Reseta o ID selecionado

    if (term.length < 3) {
      setDropdownOpen(false);
      return;
    }

    setDropdownOpen(true);
    dispatch(getLocationsByOneTerm(term));
  };

  const handleSelectLocation = (location: LocationType) => {
    setSearchTerm(location.bairro || "");
    setCity(location.cidade || "");
    setState(location.estado || "");
    setDropdownOpen(false);
    setIsValid(true); // Marca como válido após a seleção
    if (location.localizacaoId !== undefined) {
      onlocationSelect(location.localizacaoId); // Define o ID da localização selecionada
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false); // Fecha o dropdown
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className="flex items-center gap-4">
      <div ref={componentRef} className="relative">
        <label className="block font-semibold mb-1">Bairro</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => searchTerm.length >= 3 && setDropdownOpen(true)} // Reabre o dropdown ao focar
          className={`w-full border p-2 rounded ${
            isValid ? "border-green-500" : "border-red-500"
          }`}
        />
        {loading && <div className="absolute right-2 top-2">Carregando...</div>}

        {/* Lista suspensa de resultados */}
        {dropdownOpen && (
          <div className="absolute z-10 bg-white border w-full max-h-60 overflow-y-auto mt-1 rounded shadow-lg">
            {locations.length > 0
              ? locations.map((location: LocationType) => (
                  <div
                    key={location.localizacaoId}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectLocation(location)}
                  >
                    <div>
                      <strong>
                        {location.bairro} - {location.cidade}-{location.estado}
                      </strong>
                    </div>
                  </div>
                ))
              : !loading && (
                  <div className="p-2 text-sm text-gray-500">
                    Nenhum resultado encontrado.
                  </div>
                )}
            {/* Botão para incluir localização */}
            <div className="p-2 cursor-pointer hover:bg-gray-100 font-bold border-t">
              + Incluir
            </div>
          </div>
        )}
      </div>
      <div>
        <label htmlFor="cidade" className="block font-semibold mb-1">
          Cidade - Estado
        </label>
        <input
          type="text"
          name="cidade"
          disabled
          value={`${city} - ${state}`}
          readOnly
          className="w-full border p-2 rounded"
        />
      </div>
    </main>
  );
};

export default LocationSearch;
