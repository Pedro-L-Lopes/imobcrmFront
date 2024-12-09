import React from "react";
import { ClientType } from "../../types/client";
import { MdOutlineCode } from "react-icons/md";

interface ClientsTableProps {
  clients: ClientType[];
  handleSort: (field: string) => void;
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients, handleSort }) => {
  return (
    <table className="w-full text-sm text-gray-800 rounded-lg overflow-hidden shadow-lg">
      <thead className="bg-blue-600 text-white uppercase text-xs tracking-wider">
        <tr>
          {[
            { label: "Tipo", width: "w-20", sortKey: "tipoCliente" },
            { label: "Código", width: "w-10", sortKey: "codigo" },
            { label: "Nome", width: "w-36", sortKey: "nome" },
            { label: "Telefone", width: "px-6" },
            { label: "Email", width: "px-6" },
            { label: "CPF/CNPJ", width: "px-6" },
            { label: "Ações", width: "px-6 text-center" },
          ].map((col) => (
            <th
              key={col.label}
              className={`${col.width} px-4 py-3 border-x text-center cursor-pointer hover:bg-blue-500`}
              onClick={col.sortKey ? () => handleSort(col.sortKey) : undefined}
            >
              <p className="flex items-center gap-1">
                {col.label}
                {col.sortKey && <MdOutlineCode className="rotate-90" />}
              </p>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {clients.map((cliente) => (
          <tr
            key={cliente.clienteId}
            className="hover:bg-gray-50 even:bg-gray-100"
          >
            <td className="px-6 py-4 text-center truncate border-r">
              {cliente.tipoCliente === "Pessoa Fisica" ? "PF" : "PJ"}
            </td>
            <td className="px-6 py-4 text-center truncate border-r">
              {cliente.codigo}
            </td>
            <td
              className="px-6 py-4 truncate border-r"
              style={{ width: "50%" }}
            >
              {cliente.nome}
            </td>
            <td className="px-6 py-4 truncate border-r">{cliente.telefone}</td>
            <td className="px-6 py-4 truncate border-r">{cliente.email}</td>
            <td className="px-6 py-4 truncate border-r">{cliente.cpfCnpj}</td>
            <td className="px-6 py-4 text-center">
              <select className="bg-gray-100 border border-gray-300 rounded-md px-2 py-1 text-gray-700 focus:outline-none hover:bg-gray-200 cursor-pointer">
                <option>Ações</option>
                <option>Detalhes</option>
                <option>Editar</option>
                <option>Excluir</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientsTable;
