import React from "react";
import { ClientType } from "../../@types/client";
import { MdOutlineCode } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

interface ClientsTableProps {
  clients: ClientType[];
  handleSort: (field: string) => void;
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients, handleSort }) => {
  const navigate = useNavigate();

  const handleClick = (id: string, action: string) => {
    if (action === "detalhes") {
      navigate(`/cliente/detalhes/${id}`);
    } else if (action === "editar") {
      navigate(`/cliente/editar/${id}`);
    } else if (action === "excluir") {
      navigate(`/cliente/excluir/${id}`);
    }
  };
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
        {clients.map((cliente, index) => (
          <tr
            key={cliente.clienteId}
            className={`hover:bg-gray-50 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-200"
            }`}
          >
            <td className="px-6 py-4 text-center truncate border-r">
              {cliente.tipoCliente === "Pessoa Fisica" ? "PF" : "PJ"}
            </td>
            <td
              onClick={() => handleClick(cliente.clienteId!, "detalhes")}
              className="px-6 py-4 text-center truncate border-r text-blue-500 cursor-pointer"
            >
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
            <td className="px-6 py-4 flex items-center justify-center">
              <Link to={`/cliente/detalhes/${cliente.clienteId}`}>
                <p className="bg-blue-500 text-white px-3 py-1 rounded focus:outline-none hover:bg-blue-400 transition-all cursor-pointer">
                  Detalhes
                </p>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientsTable;
