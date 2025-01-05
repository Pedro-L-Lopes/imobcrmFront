import { RentalContractType } from "../../types/rentalContract";
import { MdOutlineCode } from "react-icons/md";
import { formatCurrency, formatDate } from "../../utils/formats";
import { Link, useNavigate } from "react-router-dom";

interface RentalContractTableProps {
  contracts: RentalContractType[];
  handleSort: (field: string) => void;
}

const RentalContractTable = ({
  contracts,
  handleSort,
}: RentalContractTableProps) => {
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
        <tr className="rounded-md">
          {[
            { label: "Código", width: "w-10", sortKey: "codigo" },
            {
              label: "Status",
              width: "w-20",
              sortKey: "statusContrato",
            },
            { label: "Imóveis", width: "w-36" },
            { label: "Valor", width: "px-6", sortKey: "valorContrato" },
            { label: "Início", width: "px-6", sortkey: "inicioContrato" },
            {
              label: "Fim",
              width: "px-6",
              sortkey: "fimContrato",
            },
            { label: "Tempo", width: "px-6", sortKey: "tempoContrato" },
            { label: "Locatário", width: "w-36" },
            { label: "Ações", width: "px-6" },
          ].map((col) => (
            <th
              key={col.label}
              className={`${col.width} px-4 py-3 border-x text-center cursor-pointer hover:bg-blue-500`}
              onClick={col.sortKey ? () => handleSort(col.sortKey) : undefined}
            >
              <p className="flex items-center gap-1 ">
                {col.label}
                {col.sortKey && <MdOutlineCode className="rotate-90" />}
              </p>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {contracts.map((contract, index) => (
          <tr
            key={contract.contratoId}
            className={`hover:bg-gray-50 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-100"
            } border-b`}
          >
            <td
              className="px-6 py-4 text-blue-500 text-center truncate border-r cursor-pointer"
              onClick={() => handleClick(contract.contratoId!, "detalhes")}
            >
              {contract.codigo}
            </td>
            <td className="px-6 py-4 text-center truncate border-r">
              {contract.statusContrato}
            </td>
            <td
              className="px-6 py-4 truncate border-r"
              style={{ width: "50%" }}
            >
              Cód. {contract.codigoImovel} | {contract.tipoImovel} <br />
              {contract.rua}, {contract.numero}, {contract.bairro},{" "}
              {contract.cidade}-{contract.estado} <br />
              Locador: {contract.locadorNome}
            </td>
            <td className="px-6 py-4 truncate border-r">
              {formatCurrency(contract.valorContrato!)}
            </td>
            <td className="px-6 py-4 truncate border-r">
              {formatDate(contract.inicioContrato!)}
            </td>
            <td className="px-6 py-4 truncate border-r">
              {formatDate(contract.fimContrato!)}
            </td>
            <td className="px-6 py-4 text-center border-r">
              {contract.tempoContrato} meses
            </td>
            <td className="px-6 py-4 truncate border-r">
              {contract.locatarioNome}
            </td>
            <td className="px-6 py-4 flex items-center justify-center">
              <Link to={`/contrato-aluguel/detalhes/${contract.contratoId}`}>
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

export default RentalContractTable;
