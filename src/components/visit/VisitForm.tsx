import ClientSearch from "../client/ClientSearch";
import PropertySearch from "../property/PropertySearch";
import TimePicker from "../utils/TimePicker";

type VisitFormProps = {
  situacao: string;
  clienteId: string;
  imovelId: string;
  dataHora: Date | null;
  observacao: string;
  onSubmit: (e: React.FormEvent) => void;
  onChange: {
    setSituacao: (value: string) => void;
    setClienteId: (value: string) => void;
    setImovelId: (value: string) => void;
    setDataHora: (value: Date | null) => void;
    setObservacao: (value: string) => void;
  };
};

const VisitForm = ({
  situacao,
  clienteId,
  imovelId,
  dataHora,
  observacao,
  onSubmit,
  onChange,
}: VisitFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-xl p-6 bg-gray-100 shadow-lg"
    >
      {/* Linha 1: Situação */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Linha 2: Data e Hora */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Data e Hora
          </label>
          <div>
            <TimePicker
              value={dataHora}
              onChange={(newValue) => onChange.setDataHora(newValue)}
            />
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Situação da Visita
          </label>
          <select
            value={situacao}
            onChange={(e) => onChange.setSituacao(e.target.value)}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione</option>
            <option value="pendente">Pendente</option>
            <option value="confirmada">Confirmada</option>
            <option value="cancelada">Cancelada</option>
            <option value="reagendada">Reagendada</option>
            <option value="em_andamento">Em andamento</option>
            <option value="concluida">Concluída</option>
            <option value="nao_compareceu">Não compareceu</option>
            <option value="em_atendimento">Em atendimento</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Cliente
          </label>
          <ClientSearch
            onClientSelect={(id) => onChange.setClienteId(id)}
            selectedClientId={clienteId}
          />
        </div>
      </div>

      {/* Linha 3: Cliente e Imóvel */}
      <div className="">
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Imóvel
          </label>
          <PropertySearch
            onPropertySelect={(id) => onChange.setImovelId(id)}
            selectedPropertyId={imovelId}
          />
        </div>
      </div>

      {/* Linha 4: Observação */}
      <div>
        <label className="block font-semibold mb-2 text-gray-700">
          Observação
        </label>
        <textarea
          value={observacao}
          onChange={(e) => onChange.setObservacao(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          maxLength={250}
        />
      </div>

      {/* Botão de Envio */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ease-in-out"
        >
          Agendar Visita
        </button>
      </div>
    </form>
  );
};

export default VisitForm;
