import React, { useState, useRef, useEffect } from "react";
import { getClientsByNameAndDocument } from "../../slices/clientSlice";
import { ClientType } from "../../types/client";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Link } from "react-router-dom";

type ClientSearchProps = {
  onClientSelect: (clientId: string) => void;
};

const ClientSearch: React.FC<ClientSearchProps> = ({ onClientSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const { clients, loading } = useSelector((state: any) => state.client);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onClientSelect(""); // Reseta o ID selecionado ao editar manualmente

    if (term.length < 3) {
      setDropdownOpen(false);
      return;
    }

    setDropdownOpen(true);
    dispatch(getClientsByNameAndDocument(term));
  };

  const handleSelectClient = (client: ClientType) => {
    setSearchTerm(client.nome); // Mostra o nome selecionado no input
    setDropdownOpen(false); // Fecha a lista
    onClientSelect(client.clienteId!); // Passa o ID para o componente pai
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
    <div ref={componentRef} className="relative">
      <input
        type="text"
        placeholder="Pesquise por Nome ou CPF/CNPJ"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => searchTerm.length >= 2 && setDropdownOpen(true)} // Reabre o dropdown ao focar
        className="w-full border p-2 rounded"
      />
      {loading && <div className="absolute right-2 top-2">Carregando...</div>}

      {/* Lista suspensa de resultados */}
      {dropdownOpen && (
        <div className="absolute z-10 bg-white border w-full max-h-60 overflow-y-auto mt-1 rounded shadow-lg">
          {clients.length > 0
            ? clients.map((client: ClientType) => (
                <div
                  key={client.clienteId}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectClient(client)}
                >
                  <div>
                    <strong>{client.nome}</strong>
                  </div>
                  <div className="text-sm text-gray-500">
                    Cód.: {client.codigo} | CPF: {client.cpfCnpj} | Tel:{" "}
                    {client.telefone}
                  </div>
                </div>
              ))
            : !loading && (
                <div className="p-2 text-sm text-gray-500">
                  Nenhum resultado encontrado.
                </div>
              )}

          {/* Botão para incluir pessoa */}
          <Link to="/novo-cliente" target="_blank" rel="noopener noreferrer">
            <div className="p-2 cursor-pointer hover:bg-gray-100 font-bold border-t">
              + Incluir cliente
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ClientSearch;
