import { useState, useRef, useEffect } from "react";
import { getClientsByNameAndDocument } from "../../slices/clientSlice";
import { ClientType } from "../../@types/client";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import Tag from "../utils/Tag";
import InsertClientModal from "./InsertClientModal";
import { formatCpfCnpj } from "../../utils/formats";

type ClientSearchProps = {
  onClientSelect: (clientId: string) => void;
  selectedClientId?: string;
};

const ClientSearch = ({
  onClientSelect,
  selectedClientId,
}: ClientSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { clients, loading } = useSelector((state: any) => state.client);

  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);

  useEffect(() => {
    if (selectedClientId && clients.length > 0) {
      const client = clients.find(
        (client: ClientType) => client.clienteId === selectedClientId
      );
      setSelectedClient(client || null);
    }
  }, [selectedClientId, clients]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onClientSelect(""); // Reseta o ID selecionado
    setSelectedClient(null); // Remove cliente ao editar

    if (term.length < 3) {
      setDropdownOpen(false);
      return;
    }

    setDropdownOpen(true);
    dispatch(getClientsByNameAndDocument(term));
  };

  const handleSelectClient = (client: ClientType) => {
    setSearchTerm("");
    setSelectedClient(client);
    setDropdownOpen(false);
    onClientSelect(client.clienteId!);
  };

  const handleRemoveClient = () => {
    setSelectedClient(null);
    setSearchTerm("");
    onClientSelect(""); // Limpa o cliente selecionado
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div ref={componentRef} className="relative">
      {/* Usar o componente Tag para cliente selecionado */}
      {selectedClient ? (
        <Tag
          label={`Cód. ${selectedClient.codigo} | ${
            selectedClient.nome
          } | CPF/CNPJ: ${formatCpfCnpj(selectedClient.cpfCnpj)}`}
          onRemove={handleRemoveClient}
        />
      ) : (
        <input
          type="text"
          placeholder="Pesquise por Nome, CPF/CNPJ ou Código"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => searchTerm.length >= 3 && setDropdownOpen(true)}
          className="w-full border border-gray-300 p-2 rounded-lg"
        />
      )}

      {loading && (
        <div className="absolute right-2 top-2 text-gray-500">
          Carregando...
        </div>
      )}

      {/* Dropdown de resultados */}
      {dropdownOpen && (
        <div className="absolute z-10 bg-white border border-gray-300 w-full max-h-60 overflow-y-auto mt-1 rounded-lg shadow-lg">
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

          {/* Botão para incluir cliente */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 cursor-pointer hover:bg-gray-100 font-bold border-t w-full text-left"
          >
            + Incluir cliente
          </button>
          <InsertClientModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ClientSearch;
