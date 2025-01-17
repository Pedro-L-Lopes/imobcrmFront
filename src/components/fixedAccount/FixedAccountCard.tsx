import { useState } from "react";
import { FixedAccountType } from "../../@types/fixedAccount";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { formatDate } from "../../utils/formats";

interface FixedAccountCardProps {
  account: FixedAccountType;
  onEdit?: () => void;
  onDelete?: () => void;
}

const FixedAccountCard = ({ account }: FixedAccountCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white flex flex-col gap-2 m-1 transition-all duration-300">
      {/* Informações principais */}
      <section className="flex items-center justify-between">
        <div className="grid grid-cols-4 items-center justify-between w-full">
          <p className="flex flex-col items-start justify-center">
            <span className="opacity-65 text-sm">Tipo conta</span>
            <span>{account.tipoConta}</span>
          </p>
          <p className="flex flex-col items-start justify-center">
            <span className="opacity-65 text-sm">Status</span>
            <span>
              <span
                className={`px-2 py-1 text-sm rounded ${
                  account.status === "Em dia"
                    ? "bg-green-100 text-green-600"
                    : account.status === "Em atraso"
                    ? "bg-red-100 text-red-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {account.status}
              </span>
            </span>
          </p>
          <p className="flex flex-col items-start justify-center">
            <span className="opacity-65 text-sm">Código consulta</span>
            <span>{account.codigoConsulta ? account.codigoConsulta : "-"}</span>
          </p>
        </div>
        {/* Botão para expandir/colapsar */}
        <button
          className="flex items-center gap-2 mt-2 text-blue-500 text-sm hover:underline mr-5"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <FaChevronDown
            size={20}
            className={`transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </section>

      {/* Informações adicionais (colapsáveis) */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <section className="mt-3">
          <div className="grid grid-cols-4 items-center justify-between w-full">
            <p className="flex flex-col items-start justify-center">
              <span className="opacity-65 text-sm">Data inclusão</span>
              {account.dataCriacao
                ? formatDate(account.dataCriacao.toString())
                : formatDate(new Date().toString())}
            </p>
            <p className="flex flex-col items-start justify-center">
              <span className="opacity-65 text-sm">Última alteração</span>
              {account.ultimaEdicao
                ? formatDate(account.ultimaEdicao.toString())
                : formatDate(new Date().toString())}
            </p>
          </div>
          <p className="text-gray-600 text-sm mt-3">
            <strong>Descrição:</strong> {account.descricao}
          </p>
        </section>
      </div>
    </div>
  );
};

export default FixedAccountCard;
