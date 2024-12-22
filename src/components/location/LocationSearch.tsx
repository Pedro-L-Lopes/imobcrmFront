import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { LocationType } from "../../types/location";
import { getLocationsByOneTerm } from "../../slices/locationSlice";
import Tag from "../utils/Tag"; // Importa o componente Tag
import InsertLocationModal from "./InsertLocationModal";

type LocationSearchProps = {
  onLocationSelect: (locationId: number) => void;
  initialLocationId: number; // Novo prop para receber o ID inicial
};

const LocationSearch = ({
  onLocationSelect,
  initialLocationId,
}: LocationSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(
    null
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const { locations, loading } = useSelector((state: any) => state.location);

  useEffect(() => {
    if (initialLocationId) {
      const location = locations.find(
        (loc: LocationType) => loc.localizacaoId === initialLocationId
      );
      if (location) {
        setSelectedLocation(location);
        setCity(location.cidade || "");
        setState(location.estado || "");
      }
    }
  }, [initialLocationId, locations]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setSelectedLocation(null);
    onLocationSelect(0);

    if (term.length < 3) {
      setDropdownOpen(false);
      return;
    }

    setDropdownOpen(true);
    dispatch(getLocationsByOneTerm(term));
  };

  const handleSelectLocation = (location: LocationType) => {
    setSelectedLocation(location);
    setCity(location.cidade || "");
    setState(location.estado || "");
    setDropdownOpen(false);
    setSearchTerm("");
    onLocationSelect(location.localizacaoId || 0);
  };

  const handleRemoveLocation = () => {
    setSelectedLocation(null);
    setCity("");
    setState("");
    setSearchTerm("");
    onLocationSelect(0);
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
    <main className="flex items-center gap-4">
      <div ref={componentRef} className="relative w-full">
        <label className="font-semibold">Bairro, Cidade-UF</label>

        {/* Exibe a Tag se um local foi selecionado */}
        {selectedLocation ? (
          <Tag
            label={`${selectedLocation.bairro}, ${selectedLocation.cidade}-${selectedLocation.estado}`}
            onRemove={handleRemoveLocation}
          />
        ) : (
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => searchTerm.length >= 3 && setDropdownOpen(true)}
            placeholder="Pesquise por Bairro, cidade ou código"
            className="w-full border p-2 rounded mt-1"
          />
        )}

        {loading && <div className="absolute right-2 top-2">Carregando...</div>}

        {/* Dropdown de resultados */}
        {dropdownOpen && (
          <div className="absolute z-10 bg-white border w-full max-h-60 overflow-y-auto mt-1 rounded shadow-lg">
            {locations.length > 0
              ? locations.map((location: LocationType) => (
                  <div
                    key={location.localizacaoId}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectLocation(location)}
                  >
                    <strong>
                      {location.bairro} - {location.cidade}-{location.estado}
                    </strong>
                  </div>
                ))
              : !loading && (
                  <div className="p-2 text-sm text-gray-500">
                    Nenhum resultado encontrado.
                  </div>
                )}
            <button
              className="p-2 cursor-pointer hover:bg-gray-100 font-bold border-t"
              onClick={() => setIsModalOpen(true)}
            >
              + Adicionar Localização
            </button>
          </div>
        )}

        <InsertLocationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </main>
  );
};

export default LocationSearch;
