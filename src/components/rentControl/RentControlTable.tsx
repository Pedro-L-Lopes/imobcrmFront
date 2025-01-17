import { rentControlType } from "../../@types/rentControlType";
import { formatCurrency } from "../../utils/formats";
import { Link, useNavigate } from "react-router-dom";
import { FiPaperclip } from "react-icons/fi";
import RentControlPaymentsModal from "./RentControlPaymentsmModal";
import FixedAccountsModal from "../fixedAccount/FixedAccountModal";
import InfoTooltip from "../utils/InfoTooltip";

interface RentControlTableProps {
  rentControls: rentControlType[];
  handleSort: (field: string) => void;
}

const RentControlTable = ({
  rentControls,
  handleSort,
}: RentControlTableProps) => {
  const navigate = useNavigate();

  const handleClick = (id: string, action: string) => {
    if (action === "detalhes") {
      navigate(`/contrato-aluguel/detalhes/${id}`);
    } else if (action === "editar") {
      navigate(`/contrato-aluguel/editar/${id}`);
    } else if (action === "excluir") {
      navigate(`/contrato-aluguel/excluir/${id}`);
    }
  };

  return (
    <table className="text-sm text-gray-800">
      <thead className="bg-blue-600 text-white uppercase text-xs">
        <tr>
          {[
            {
              label: `Gerenciar`,
            },
            { label: "Imóvel", width: "w-36" },
            {
              label: (
                <div className="flex items-center justify-center gap-2">
                  Status Pagamento
                  <InfoTooltip message="Este status se refere apenas ao período atual, pode haver períodos anteriores em atraso." />
                </div>
              ),
              width: "w-20",
              sortKey: "statusPagamento",
            },
            {
              label: (
                <div className="flex items-center justify-center gap-2">
                  Período
                  <InfoTooltip message="O período exibe o intervalo de tempo do aluguel atual." />
                </div>
              ),
              width: "w-20",
            },
            { label: "Dia Vencimento", width: "w-20" },
            { label: "Valor", width: "px-6", sortKey: "valorAluguel" },
            { label: "Água", width: "px-6" },
            { label: "Energia", width: "px-6" },
            { label: "IPTU", width: "px-6" },
            { label: "Locatário", width: "w-36" },
            { label: "Ações", width: "px-6" },
          ].map((col) => (
            <th
              key={
                typeof col.label === "string"
                  ? col.label
                  : col.label?.props?.children
              }
              className={`${col.width} px-4 py-3 border-x text-center cursor-pointer hover:bg-blue-500`}
              onClick={col.sortKey ? () => handleSort(col.sortKey) : undefined}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rentControls.map((control, index) => (
          <tr
            key={control.contratoAluguelId}
            className={`hover:bg-gray-50 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-100"
            } border-b`}
          >
            <td className="px-6 py-4 border-r">
              <div className="flex flex-col justify-center items-center gap-2">
                <RentControlPaymentsModal
                  contractId={control.contratoAluguelId}
                  buttonClass="bg-green-500 text-white rounded hover:bg-green-400 transition min-w-28 p-[2px]"
                />
                <FixedAccountsModal
                  propertyId={control.imovelId}
                  buttonClass="bg-green-500 text-white rounded hover:bg-green-400 transition min-w-28 p-[2px]"
                />
              </div>
            </td>

            <td className="border-r">
              <div className="px-6 py-4 truncate flex flex-col justify-center">
                {control.enderecoImovel}
                <span className="text-sm opacity-75">
                  Locador: {control.nomeLocador}
                </span>
              </div>
            </td>
            <td className="px-6 py-4 truncate border-r text-center">
              <span
                className={`px-2 py-1 text-sm rounded ${
                  control.statusPagamento.toLocaleLowerCase() === "em dia"
                    ? "bg-green-100 text-green-600"
                    : control.statusPagamento.toLocaleLowerCase() ===
                      "em atraso"
                    ? "bg-red-100 text-red-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {control.statusPagamento}
              </span>
            </td>
            <td className="px-6 py-4 truncate border-r">{control.periodo}</td>
            <td className="px-6 py-4 text-center border-r">
              {control.diaVencimento}
            </td>
            <td className="px-6 py-4 truncate border-r">
              {formatCurrency(control.valorAluguel)}
            </td>
            <td>
              <div className="px-6 py-4 truncate border-r flex gap-1 items-center justify-start">
                <span
                  className={`w-2 h-2 rounded ${
                    control.statusAgua === "Em dia"
                      ? "bg-green-500"
                      : control.statusAgua === "Em atraso"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                ></span>
                <span>{control.codigoConsultaAgua}</span>
              </div>
            </td>

            <td>
              <div className="px-6 py-4 truncate border-r flex gap-1 items-center justify-start">
                <span
                  className={`w-2 h-2 rounded ${
                    control.statusLuz === "Em dia"
                      ? "bg-green-500"
                      : control.statusLuz === "Em atraso"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                ></span>
                <span>{control.codigoConsultaLuz}</span>
              </div>
            </td>

            <td>
              <div className="px-6 py-4 truncate border-r flex gap-1 items-center justify-start">
                <span
                  className={`w-2 h-2 rounded ${
                    control.statusIptu === "Em dia"
                      ? "bg-green-500"
                      : control.statusIptu === "Em atraso"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                ></span>
                <span>{control.codigoConsultaIptu}</span>
              </div>
            </td>

            <td className="px-6 py-4 truncate border-r">
              {control.nomeLocatario}
            </td>

            <td className="px-6 py-4 flex flex-col items-center justify-center gap-1">
              <div className="h-full">
                <Link
                  to={`/contrato-aluguel/detalhes/${control.contratoAluguelId}`}
                >
                  <p className="bg-blue-500 text-white flex items-center justify-center rounded hover:bg-blue-400 transition min-w-28 p-[2px]">
                    Detalhes
                  </p>
                </Link>
              </div>
              <div className="bg-blue-500 text-white flex items-center justify-center rounded hover:bg-blue-400 transition min-w-28 p-[2px]">
                <FiPaperclip size={15} />
                Relatório
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RentControlTable;
