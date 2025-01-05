import { useNavigate } from "react-router-dom";
import { formatCurrency, formatDate } from "../../utils/formats";
import FixedAccountCard from "../fixedAccount/FixedAccountCard";
import { FixedAccountType } from "../../types/fixedAccount";
import DetailsSection from "../utils/DetailsSection";

const PropertyDetailsForm = ({ property }: any) => {
  const navigate = useNavigate();

  const handleClick = (id: string, action: string) => {
    if (action === "cliente") {
      navigate(`/cliente/detalhes/${id}`);
    } else if (action === "cliente") {
      navigate(`/cliente/detalhes/${id}`);
    }
  };

  return (
    <main className="min-h-screen">
      <div className=" bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <DetailsSection title="Dados Principais">
            <div className="grid  grid-cols-3 items-center justify-between">
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Código</span>
                {property.codigo}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Cód site</span>
                {property.siteCod ? property.siteCod : "-"}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Finalidade</span>
                <span className="bg-blue-500 text-white rounded p-1">
                  {property.finalidade}
                </span>
              </p>
              <p className="flex flex-col items-start justify-center mt-5">
                <span className="opacity-65 text-sm">Situação</span>{" "}
                <span className="bg-blue-500 text-white rounded p-1">
                  {property.situacao}
                </span>
              </p>

              <p className="flex flex-col items-start justify-center mt-5">
                <span className="opacity-65 text-sm">Tipo</span>{" "}
                {property.tipoImovel}
              </p>
              <p className="flex flex-col items-start justify-center mt-5">
                <span className="opacity-65 text-sm">Destinação</span>
                {property.destinacao}
              </p>
              <p className="flex flex-col items-start justify-center mt-5">
                <span className="opacity-65 text-sm">Placa</span>
                {property.comPlaca ? "Com placa" : "Sem placa"}
              </p>
            </div>
            <p className="flex flex-col items-start justify-center">
              <span className="opacity-65 text-sm mt-8">Descrição</span>{" "}
              {property.descricao}
            </p>
          </DetailsSection>

          <DetailsSection title="Dados Gerais">
            <div className="grid  grid-cols-3 items-center justify-between">
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Valor</span>{" "}
                <span className="bg-blue-500 text-white rounded p-1">
                  {formatCurrency(property.valor)}
                </span>
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Valor do Condomínio</span>{" "}
                {formatCurrency(property.valorCondominio)}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Area</span> {property.area}
                m²
              </p>
            </div>
            <div className="grid  grid-cols-3 items-center justify-between mt-5">
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Tipo autorização</span>
                {property.tipoAutorizacao}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Data autorização</span>
                {property.dataAutorizacao
                  ? formatDate(property.dataAutorizacao)
                  : "-"}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Valor da autorização</span>
                {property.valorAutorizacao
                  ? formatCurrency(property.valorAutorizacao)
                  : "-"}
              </p>
            </div>
            <div className="grid  grid-cols-3 items-center justify-between mt-5">
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Avaliação</span>
                {property.avaliacao ? "Com avaliação" : "Sem avaliação"}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Data avaliação</span>
                {property.dataAvaliacao
                  ? formatDate(property.dataAvaliacao)
                  : "-"}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Valor avaliação</span>
                {property.avaliacaoValor
                  ? formatCurrency(property.avaliacaoValor)
                  : "-"}
              </p>
            </div>
          </DetailsSection>

          <DetailsSection title="Endereço">
            <div className="grid  grid-cols-3 items-center justify-between">
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Rua/Av</span>
                {property.rua ? property.rua : "-"}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Número</span>
                {property.numero ? property.numero : "-"}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Bairro</span>
                {property.bairro}
              </p>
            </div>
            <div className="grid  grid-cols-3 items-center justify-between mt-5">
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Cidade-Estado</span>
                {property.cidade}-{property.estado}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">CEP</span>
                {property.cep ? property.cep : "-"}
              </p>
            </div>
          </DetailsSection>

          <DetailsSection title="Relacionamentos">
            <div className="grid  grid-cols-1 items-center justify-between mt-5">
              <button
                onClick={() => handleClick(property.proprietarioId, "cliente")}
                className="flex flex-col items-start justify-center"
              >
                <span className="opacity-65 text-sm">Proprietário</span>
                <span className="bg-blue-500 text-white p-1 rounded text-start">
                  Cód. {property.proprietarioCode} | {property.proprietarioNome}
                </span>
              </button>
            </div>
          </DetailsSection>

          <DetailsSection title="Características internas">
            <div className="grid  grid-cols-3 items-center justify-between mt-5">
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Quarto</span>
                {property.quartos ? property.quartos : "-"}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Suítes</span>
                {property.suites ? property.suites : "-"}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Banheiros</span>
                {property.benheiros ? property.banheiros : "-"}
              </p>
              <p className="flex flex-col items-start justify-center mt-5">
                <span className="opacity-65 text-sm">Salas de estar</span>
                {property.salasEstar ? property.salasStar : "-"}
              </p>
              <p className="flex flex-col items-start justify-center mt-5">
                <span className="opacity-65 text-sm">Salas de jantar</span>
                {property.salasJantar ? property.salasJantar : "-"}
              </p>
              <p className="flex flex-col items-start justify-center mt-5">
                <span className="opacity-65 text-sm">Varandas</span>
                {property.varanda ? property.varanda : "-"}
              </p>
              <p className="flex flex-col items-start justify-center mt-5">
                <span className="opacity-65 text-sm">garagem</span>
                {property.garagem ? property.garagem : "-"}
              </p>
            </div>
          </DetailsSection>

          <DetailsSection title="Datas">
            <div className="grid  grid-cols-3 items-center justify-between mt-5">
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Data inclusão</span>
                {formatDate(property.dataCriacao)}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Ultima modificação</span>
                {formatDate(property.ultimaEdicao)}
              </p>
              <p className="flex flex-col items-start justify-center">
                <span className="opacity-65 text-sm">Ultima Publicação</span>
                {formatDate(property.ultimaPubliRedes) == "01/01/1"
                  ? "-"
                  : formatDate(property.ultimaPubliRedes)}
              </p>
            </div>
          </DetailsSection>

          <DetailsSection title="Observações Gerais">
            <p>{property.observacoes || "Nenhuma observação disponível."}</p>
          </DetailsSection>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetailsForm;
