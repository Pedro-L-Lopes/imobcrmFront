import { RentalContractType } from "../../../@types/rentalContract";
import DatePicker from "../../utils/DatePicker";
import CurrencyInput from "../../utils/CurrencyInput";
import { useEffect } from "react";
import dayjs from "dayjs";
import { CiCircleAlert } from "react-icons/ci";

interface MainDataFormProps {
  formData: RentalContractType;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const MainData = ({ formData, handleChange }: MainDataFormProps) => {
  const handleCurrencyChange = (fieldName: string, value: any) => {
    handleChange({
      target: { name: fieldName, value },
    } as any);
  };

  useEffect(() => {
    if (formData.inicioContrato && formData.tempoContrato) {
      const dataInicio = dayjs(formData.inicioContrato);
      const dataFim = dataInicio
        .add(formData.tempoContrato, "month")
        .subtract(1, "day");
      handleCurrencyChange("fimContrato", dataFim.toDate());
    }
  }, [formData.inicioContrato, formData.tempoContrato]);

  return (
    <main className="p-6 bg-gray-50">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label
            htmlFor="valorContrato"
            className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"
          >
            Valor contrato <CiCircleAlert />
          </label>
          <CurrencyInput
            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
              formData.valorContrato ? "" : "border-red-500"
            }`}
            value={formData.valorContrato || 0}
            fieldName="valorContrato"
            onChange={handleCurrencyChange}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="valorCondominio"
            className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"
          >
            Valor condomínio
          </label>
          <CurrencyInput
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={formData.valorCondominio || 0}
            fieldName="valorCondominio"
            onChange={handleCurrencyChange}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="vencimentoAluguel"
            className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"
          >
            Dia de vencimento do aluguel <CiCircleAlert />
          </label>
          <input
            type="number"
            id="vencimentoAluguel"
            placeholder="1 a 30"
            min={1}
            max={30}
            value={formData.vencimentoAluguel || ""}
            onChange={(e) =>
              handleCurrencyChange(
                "vencimentoAluguel",
                parseInt(e.target.value, 10)
              )
            }
            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
              formData.vencimentoAluguel ? "" : "border-red-500"
            }`}
          />
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label
            htmlFor="inicioContrato"
            className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"
          >
            Início contrato <CiCircleAlert />
          </label>
          <DatePicker
            value={
              formData.inicioContrato ? new Date(formData.inicioContrato) : null
            }
            onChange={(date) => handleCurrencyChange("inicioContrato", date)}
            title="Início do contrato"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="tempoContrato"
            className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"
          >
            Prazo (meses) <CiCircleAlert />
          </label>
          <input
            type="number"
            id="tempoContrato"
            value={formData.tempoContrato || ""}
            onChange={(e) =>
              handleCurrencyChange(
                "tempoContrato",
                parseInt(e.target.value, 10)
              )
            }
            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
              formData.tempoContrato ? "" : "border-red-500"
            }`}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="fimContrato"
            className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"
          >
            Fim do Contrato <CiCircleAlert />
          </label>
          <DatePicker
            value={formData.fimContrato ? new Date(formData.fimContrato) : null}
            onChange={(date) => handleCurrencyChange("fimContrato", date)}
            title="Fim do contrato"
            disabled
          />
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label
            htmlFor="primeiroAluguel"
            className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"
          >
            Primeiro Aluguel <CiCircleAlert />
          </label>
          <DatePicker
            value={
              formData.primeiroAluguel
                ? new Date(formData.primeiroAluguel)
                : null
            }
            onChange={(date) => handleCurrencyChange("primeiroAluguel", date)}
            title="Primeiro pagamento"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="destinacaoContrato"
            className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"
          >
            Destinação do Contrato <CiCircleAlert />
          </label>
          <select
            id="destinacaoContrato"
            value={formData.destinacaoContrato || ""}
            onChange={(e) =>
              handleCurrencyChange("destinacaoContrato", e.target.value)
            }
            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition  ${
              formData.destinacaoContrato ? "" : "border-red-500"
            }`}
          >
            <option value="">Destinação</option>
            <option value="Residencial">Residencial</option>
            <option value="Não residencial">Não Residencial</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="statusContrato"
            className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"
          >
            Status do Contrato <CiCircleAlert />
          </label>
          <select
            id="statusContrato"
            value={formData.statusContrato}
            onChange={(e) =>
              handleCurrencyChange("statusContrato", e.target.value)
            }
            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
              formData.statusContrato ? "" : "border-red-500"
            }`}
          >
            <option value="">Selecione</option>
            <option value="Ativo">Ativo</option>
            <option value="Finalizado">Finalizado</option>
            <option value="Moderação">Moderação</option>
            <option value="Pendente">Pendente</option>
            <option value="Rescindido">Rescindido</option>
          </select>
        </div>
      </section>
    </main>
  );
};

export default MainData;
