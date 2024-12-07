import React from "react";
import { ClientType } from "../../types/client";
import { MdOutlineCode } from "react-icons/md";

interface ClientsTableProps {
  clients: ClientType[];
  handleSort: (field: string) => void;
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients, handleSort }) => {
  return (
    <table className="min-w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th
            className="w-20 px-4 py-3 border-x text-center cursor-pointer hover:bg-blue-500"
            onClick={() => handleSort("tipoCliente")}
          >
            <p className="flex items-center gap-1">
              Tipo
              <MdOutlineCode className="rotate-90" />
            </p>
          </th>
          <th
            className="w-10 px-4 py-3 border-x text-center cursor-pointer hover:bg-blue-500"
            onClick={() => handleSort("codigo")}
          >
            <p className="flex items-center gap-1">
              Código
              <MdOutlineCode className="rotate-90" />
            </p>
          </th>
          <th
            className="w-36 px-4 py-3 border-x text-center cursor-pointer hover:bg-blue-500"
            onClick={() => handleSort("nome")}
          >
            <p className="flex items-center gap-1">
              Nome
              <MdOutlineCode className="rotate-90" />
            </p>
          </th>
          <th className="px-6 py-3 border-x text-left">Telefone</th>
          <th className="px-6 py-3 border-x text-left">Email</th>
          <th className="px-6 py-3 border-x text-left">CPF/CNPJ</th>
          <th className="px-6 py-3 border-x text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((cliente) => (
          <tr key={cliente.clienteId} className="hover:bg-gray-100 border-b">
            <td className="px-6 py-4 border-x text-center truncate">
              {cliente.tipoCliente === "Pessoa Fisica" ? "PF" : "PJ"}
            </td>
            <td className="px-6 py-4 border-x truncate w-16 text-center">
              {cliente.codigo}
            </td>
            <td
              className="w-96 px-6 py-4 border-x truncate"
              style={{ width: "50%" }}
            >
              {cliente.nome}
            </td>
            <td className="w-36 px-6 py-4 border-x truncate">
              {cliente.telefone}
            </td>
            <td className="w-36 px-6 py-4 border-x truncate">
              {cliente.email}
            </td>
            <td className="w-36 px-6 py-4 border-x truncate">
              {cliente.cpfCnpj}
            </td>
            <td className="px-6 py-4 border-x text-center">
              <select className="bg-transparent cursor-pointer hover:text-blue-600 focus:outline-none">
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
