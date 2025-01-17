import { useState } from "react";
import { visitType } from "../../@types/visit";
import dayjs from "dayjs";
import Report from "../utils/report/VisitRepostModal"; // Certifique-se de ajustar o caminho conforme necessário

interface VisitsCardsProps {
  visits: visitType[];
  handleSort: (field: string) => void;
}

const VisitsCards = ({ visits, handleSort }: VisitsCardsProps) => {
  const [selectedVisit, setSelectedVisit] = useState<visitType | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {visits.map((visita) => (
        <div
          key={visita.visitaId}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          {/* Verificação se a data é hoje */}
          {visita.dataHora && dayjs(visita.dataHora).isSame(dayjs(), "day") ? (
            <p className="text-white text-center p-1 font-bold bg-green-500 rounded-sm">
              VISITA HOJE!
            </p>
          ) : dayjs(visita.dataHora).isSame(dayjs().add(1, "day"), "day") ? (
            <p className="text-white text-center p-1 font-bold bg-yellow-500 rounded-sm">
              VISITA AMANHÃ!
            </p>
          ) : dayjs(visita.dataHora).isAfter(dayjs(), "day") ? (
            <p className="text-white text-center p-1 font-bold bg-blue-500 rounded-sm">
              VISITA OUTRO DIA
            </p>
          ) : (
            <p className="text-white text-center p-1 font-bold bg-red-500 rounded-sm">
              VISITA PASSADA!
            </p>
          )}

          <div className="mb-4">
            <section className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-blue-600">
                {visita.clienteNome}
              </h3>
              <p>
                <strong>Cód:</strong> {visita.codigo}
              </p>
            </section>
            <p className="text-gray-600 text-sm">
              CPF/CNPJ: {visita.clienteDocumento}
            </p>
            <p className="text-gray-600 text-sm">
              Tel: {visita.clienteTelefone}
            </p>
            <p className="text-gray-600 text-sm">
              Email: {visita.clienteEmail}
            </p>
          </div>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>Situação:</strong> {visita.situacao}
            </p>
            <p>
              <strong>Endereço:</strong>{" "}
              {`${visita.rua}, ${visita.bairro}, ${visita.cidade} - ${visita.estado}`}
            </p>
            <p>
              <strong>Finalidade:</strong> {visita.finalidadeVisita}
            </p>
            <p>
              <strong>Hora:</strong>{" "}
              {visita.dataHora
                ? dayjs(visita.dataHora).subtract(3, "hour").format("HH:mm")
                : "-"}
            </p>

            <p>
              <strong>Data:</strong>{" "}
              {visita.dataHora
                ? new Date(visita.dataHora).toLocaleDateString("pt-BR")
                : "-"}
            </p>

            <p>
              <strong>Observação:</strong> {visita.observacao || "-"}
            </p>
          </div>
          <section className="flex justify-between items-center">
            <div className="mt-4 flex flex-col space-y-2">
              {/* Botão para abrir o relatório */}
              <Report
                procedimento={`${visita.finalidadeVisita}`}
                nome={visita.clienteNome!}
                cpf={visita.clienteDocumento!}
                telefone={visita.clienteTelefone!}
                destinacao={`${visita.destincao} (${visita.finalidadeVisita!})`}
                endereco={`${visita.rua}, ${visita.bairro}, ${visita.cidade}-${visita.estado} CEP: ${visita.cep}`}
                data={
                  visita.dataHora
                    ? new Date(visita.dataHora).toLocaleDateString("pt-BR")
                    : "-"
                }
                horario={
                  visita.dataHora
                    ? dayjs(visita.dataHora).subtract(3, "hour").format("HH:mm")
                    : "-"
                }
              />
            </div>
            <select className="bg-gray-100 px-3 py-1 rounded focus:outline-none hover:bg-gray-200 cursor-pointer">
              <option>Ações</option>
              <option>Detalhes</option>
              <option>Editar</option>
              <option>Excluir</option>
            </select>
          </section>
        </div>
      ))}
    </div>
  );
};

export default VisitsCards;
