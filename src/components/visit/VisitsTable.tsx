import { visitType } from "../../types/visit";
import dayjs from "dayjs";

interface VisitsCardsProps {
  visits: visitType[];
  handleSort: (field: string) => void;
}

const VisitsCards = ({ visits, handleSort }: VisitsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {visits.map((visita) => (
        <div
          key={visita.visitaId}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
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
          <div className="mt-4 flex justify-end">
            <select className="bg-gray-100 border border-gray-300 rounded-md px-2 py-1 text-gray-700 focus:outline-none hover:bg-gray-200 cursor-pointer">
              <option>Ações</option>
              <option>Detalhes</option>
              <option>Editar</option>
              <option>Excluir</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VisitsCards;
