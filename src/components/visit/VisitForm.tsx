import * as Tooltip from "@radix-ui/react-tooltip";
import { FaRegCircleQuestion } from "react-icons/fa6";
import ClientSearch from "../client/ClientSearch";
import PropertySearch from "../property/PropertySearch";
import * as Popover from "@radix-ui/react-popover";
import React, { useState } from "react";

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
    setDataHora: (value: Date) => void;
    setObservacao: (value: string) => void;
  };
};

const TimePicker = ({
  dataHora,
  setDataHora,
}: {
  dataHora: Date | null;
  setDataHora: (value: Date) => void;
}) => {
  const [hour, setHour] = useState(dataHora ? dataHora.getHours() : 12);
  const [minute, setMinute] = useState(dataHora ? dataHora.getMinutes() : 0);

  const updateTime = () => {
    const updatedDate = dataHora ? new Date(dataHora) : new Date();
    updatedDate.setHours(hour);
    updatedDate.setMinutes(minute);
    setDataHora(updatedDate);
  };

  return (
    <Popover.Root>
      <Popover.Trigger className="w-full px-4 py-2 border rounded-md">
        {`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`}
      </Popover.Trigger>
      <Popover.Content className="bg-white p-4 rounded shadow-lg">
        <div className="mb-4">
          <label htmlFor="hour-slider" className="block mb-2 text-sm">
            Hora
          </label>
          <input
            id="hour-slider"
            type="range"
            min="0"
            max="23"
            value={hour}
            onChange={(e) => setHour(Number(e.target.value))}
            onMouseUp={updateTime}
            onTouchEnd={updateTime}
            className="w-full"
          />
          <div className="text-center mt-2">{hour}</div>
        </div>
        <div>
          <label htmlFor="minute-slider" className="block mb-2 text-sm">
            Minuto
          </label>
          <input
            id="minute-slider"
            type="range"
            min="0"
            max="59"
            value={minute}
            onChange={(e) => setMinute(Number(e.target.value))}
            onMouseUp={updateTime}
            onTouchEnd={updateTime}
            className="w-full"
          />
          <div className="text-center mt-2">{minute}</div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
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
    <form onSubmit={onSubmit} className="space-y-6 rounded-md p-4 bg-gray-100">
      {/* Linha 1: Situação */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Situação da Visita</label>
          <select
            value={situacao}
            onChange={(e) => onChange.setSituacao(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
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
          <label className="block font-medium mb-1">Cliente</label>
          <ClientSearch
            onClientSelect={(id) => onChange.setClienteId(id)}
            selectedClientId={clienteId}
          />
        </div>
      </div>

      {/* Linha 2: Data e Hora */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Data</label>
          <input
            type="date"
            value={dataHora ? dataHora.toISOString().split("T")[0] : ""}
            onChange={(e) => {
              const datePart = e.target.value;
              const timePart = dataHora
                ? dataHora.toISOString().split("T")[1].split(".")[0]
                : "00:00:00";
              onChange.setDataHora(new Date(`${datePart}T${timePart}`));
            }}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Hora</label>
          <TimePicker dataHora={dataHora} setDataHora={onChange.setDataHora} />
        </div>
      </div>

      {/* Linha 3: Cliente e Imóvel */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Imóvel</label>
          <PropertySearch
            onPropertySelect={(id) => onChange.setImovelId(id)}
            selectedPropertyId={imovelId}
          />
        </div>
      </div>

      {/* Linha 4: Observação */}
      <div>
        <label className="block font-medium mb-1">Observação</label>
        <textarea
          value={observacao}
          onChange={(e) => onChange.setObservacao(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          rows={4}
          maxLength={250}
        />
      </div>

      {/* Botão de Envio */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Salvar Visita
        </button>
      </div>
    </form>
  );
};

export default VisitForm;
