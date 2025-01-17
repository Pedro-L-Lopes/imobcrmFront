import { useState } from "react";
import { RentPaymentType } from "../../@types/rentPaymantType";
import { FaChevronDown } from "react-icons/fa";
import { formatCurrency, formatDate } from "../../utils/formats";

interface RentPaymentCardProps {
  payment: RentPaymentType;
  onEdit?: () => void;
  onDelete?: () => void;
}

const RentPaymentCard = ({ payment }: RentPaymentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white flex flex-col gap-2 m-1 transition-all duration-300">
      {/* Informações principais */}
      <section className="flex items-center justify-between">
        <div className="grid grid-cols-1 md:grid-cols-4 items-center justify-between w-full">
          <p className="flex flex-col items-start justify-center">
            <span className="opacity-65 text-sm">Status</span>
            <span
              className={`px-2 py-1 text-sm rounded ${
                payment.dataPagamento &&
                new Date(payment.dataPagamento) <= new Date()
                  ? "bg-green-100 text-green-600" // Em dia
                  : payment.dataVencimentoAluguel &&
                    new Date(payment.dataVencimentoAluguel) < new Date()
                  ? "bg-red-100 text-red-600" // Em atraso
                  : "bg-orange-100 text-orange-600" // Pendente
              }`}
            >
              {payment.dataPagamento &&
              new Date(payment.dataPagamento) <= new Date()
                ? "Em dia"
                : payment.dataVencimentoAluguel &&
                  new Date(payment.dataVencimentoAluguel) < new Date()
                ? "Em atraso"
                : "Pendente"}
            </span>
          </p>
          <p className="flex flex-col items-start justify-center">
            <span className="opacity-65 text-sm">Período</span>
            <span>
              {payment.periodoInicio
                ? formatDate(payment.periodoInicio.toString())
                : "-"}{" "}
              a {""}
              {payment.periodoFim
                ? formatDate(payment.periodoFim.toString())
                : "-"}
            </span>
          </p>
          <p className="flex flex-col items-start justify-center">
            <span className="opacity-65 text-sm">Vencimento</span>
            <span>
              {payment.dataVencimentoAluguel
                ? formatDate(payment.dataVencimentoAluguel.toString())
                : "-"}
            </span>
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
          <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-between w-full gap-4">
            <p className="flex flex-col items-start justify-center">
              <span className="opacity-65 text-sm">Referência Pagamento:</span>
              <span>{payment.referenciaPagamento}</span>
            </p>
            <p className="flex flex-col items-start justify-center">
              <span className="opacity-65 text-sm">Valor Pago</span>
              <span>
                {payment.valorPago ? formatCurrency(payment.valorPago) : "-"}
              </span>
            </p>
            <p className="flex flex-col items-start justify-center">
              <span className="opacity-65 text-sm">Data Pagamento</span>
              <span>
                {payment.dataPagamento
                  ? formatDate(payment.dataPagamento.toString())
                  : "-"}
              </span>
            </p>
          </div>

          <p className="text-gray-600 text-sm mt-1">
            <strong>Última Edição:</strong>{" "}
            {payment.ultimaEdicao
              ? formatDate(payment.ultimaEdicao.toString())
              : "-"}
          </p>
        </section>
      </div>
    </div>
  );
};

export default RentPaymentCard;
