import { useNavigate } from "react-router-dom";
import { formatCurrency, formatDate } from "../../utils/formats";
import Message from "../utils/Message";
import InsertHeader from "../InsertHeader";
import { CiCircleInfo } from "react-icons/ci";
import { RentalContractType } from "../../@types/rentalContract";

const ContractDetailsSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 border-b">
    <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-4 border-b p-1">
      <CiCircleInfo className="w-5 h-5 text-blue-500" />
      {title}
    </h2>
    {children}
  </div>
);

interface RentalContractProps {
  rentalContract: RentalContractType;
}

const RentalContractDetailForm = ({ rentalContract }: RentalContractProps) => {
  const navigate = useNavigate();

  const handleClick = (id: string, action: string) => {
    if (action === "imovel") {
      navigate(`/imovel/detalhes/${id}`);
    } else if (action === "cliente") {
      navigate(`/cliente/detalhes/${id}`);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <ContractDetailsSection title="Dados Principais">
            <div className="grid  grid-cols-3 items-center justify-between">
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Código</span>
                {rentalContract.codigo}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Status</span>
                <span
                  className={`px-2 py-1 rounded text-white ${
                    rentalContract.statusContrato === "Ativo"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }`}
                >
                  {rentalContract.statusContrato}
                </span>
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Destinação Contrato</span>
                {rentalContract.destinacaoContrato}
              </p>
            </div>
            <div className="grid  grid-cols-3 items-center justify-between mt-5">
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm ">Valor Aluguel</span>
                <span className="bg-blue-500 text-white p-1 rounded">
                  {formatCurrency(rentalContract.valorContrato!)}
                </span>
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Valor Condomínio</span>
                {rentalContract.valorCondominio
                  ? formatCurrency(rentalContract.valorCondominio)
                  : "R$ 0,00"}
              </p>
            </div>
          </ContractDetailsSection>

          <ContractDetailsSection title="Relacionamentos">
            <button
              onClick={() => handleClick(rentalContract.imovelId!, "imovel")}
              className="flex flex-col items-start justify-start mt-2"
            >
              <span className="opacity-65 text-sm">Imóvel</span>
              <span className="bg-blue-500 text-white p-1 rounded text-start">
                Cód. {rentalContract.codigoImovel} | {rentalContract.tipoImovel}{" "}
                {rentalContract.rua}, {rentalContract.numero},{" "}
                {rentalContract.bairro}, {rentalContract.cidade}-
                {rentalContract.estado}, CEP: {rentalContract.cep}
              </span>
            </button>
            <button
              onClick={() => handleClick(rentalContract.locadorId!, "cliente")}
              className="flex flex-col items-start justify-start mt-2"
            >
              <span className="opacity-65 text-sm">Locador</span>
              <span className="bg-blue-500 text-white p-1 rounded text-start">
                Cód. {rentalContract.codigoLocador} |{" "}
                {rentalContract.locadorNome}
              </span>
            </button>
            <button
              onClick={() =>
                handleClick(rentalContract.locatarioId!, "cliente")
              }
              className="flex flex-col items-start justify-start mt-2"
            >
              <span className="opacity-65 text-sm">Locatário</span>
              <span className="bg-blue-500 text-white p-1 rounded text-start">
                Cód. {rentalContract.codigoLocatario} |{" "}
                {rentalContract.locatarioNome}
              </span>
            </button>
          </ContractDetailsSection>

          <ContractDetailsSection title="Datas">
            <div className="grid  grid-cols-3 items-center justify-between">
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Início Contrato</span>
                <span className="bg-blue-500 text-white p-1 rounded">
                  {rentalContract.inicioContrato
                    ? formatDate(rentalContract.inicioContrato.toString())
                    : "-"}
                </span>
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Fim Contrato</span>
                <span className="bg-blue-500 text-white p-1 rounded">
                  {rentalContract.fimContrato
                    ? formatDate(rentalContract.fimContrato.toString())
                    : "-"}
                </span>
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Prazo Contrato</span>
                <span className="bg-blue-500 text-white p-1 rounded">
                  {rentalContract.tempoContrato} meses
                </span>
              </p>
            </div>
            <div className="grid  grid-cols-3 items-center justify-between mt-5">
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">
                  Dia Vencimento Aluguel
                </span>
                {rentalContract.vencimentoAluguel}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">
                  Pagamento primeiro aluguel
                </span>
                {rentalContract.primeiroAluguel
                  ? formatDate(rentalContract.primeiroAluguel.toString())
                  : "-"}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Ultima renovação</span>
                {rentalContract.ultimaRenovacao
                  ? formatDate(rentalContract.ultimaRenovacao)
                  : "-"}
              </p>
            </div>
            <div className="grid  grid-cols-3 items-center justify-between mt-5">
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Data inclusão</span>
                {formatDate(rentalContract.dataCriacao!)}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">
                  Data última alteração
                </span>
                {rentalContract.ultimaEdicao
                  ? formatDate(rentalContract.ultimaEdicao)
                  : "-"}
              </p>
            </div>
          </ContractDetailsSection>

          <ContractDetailsSection title="Percentuais e Taxas">
            <div className="grid  grid-cols-3 items-center justify-between">
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Taxa Administração</span>
                {rentalContract.taxaAdm}%
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Taxa Intermediação</span>
                {rentalContract.taxaIntermediacao}%
              </p>
            </div>
            <div className="grid  grid-cols-3 items-center justify-between mt-5">
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Rescisão</span>
                {rentalContract.rescisao ? rentalContract.rescisao : "-"}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Sem Multa Após</span>
                {rentalContract.semMultaApos
                  ? rentalContract.semMultaApos
                  : "-"}
              </p>
            </div>
          </ContractDetailsSection>

          <ContractDetailsSection title="Anotações Gerais">
            <p className="flex flex-col items-start justify-center">
              {rentalContract.anotacoesGerais || "Nenhuma anotação adicionada."}
            </p>
          </ContractDetailsSection>
        </div>
      </div>
    </main>
  );
};

export default RentalContractDetailForm;
