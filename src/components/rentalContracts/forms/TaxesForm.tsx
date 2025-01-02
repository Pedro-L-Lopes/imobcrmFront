import { RentalContractType } from "../../../types/rentalContract";

interface TaxesFormProps {
  formData: RentalContractType;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const TaxesForm = ({ formData, handleChange }: TaxesFormProps) => {
  const handleCurrencyChange = (fieldName: string, value: any) => {
    handleChange({
      target: { name: fieldName, value },
    } as any);
  };

  const calculatePercentage = (percentage: number | undefined, total: number) =>
    percentage ? ((percentage / 100) * total).toFixed(2) : "0.00";

  return (
    <main className="p-6 bg-gray-50">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Taxa de Administração */}
        <div className="flex flex-col">
          <label
            htmlFor="taxaAdm"
            className="text-sm font-semibold text-gray-700 mb-2"
          >
            Taxa de administração (%)
          </label>
          <input
            type="number"
            id="taxaAdm"
            placeholder="0 a 100"
            min={0}
            max={100}
            value={formData.taxaAdm}
            onChange={(e) =>
              handleCurrencyChange("taxaAdm", parseInt(e.target.value, 10))
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2">
            Valor
          </label>
          <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100">
            R$ {calculatePercentage(formData.taxaAdm, formData.valorContrato!)}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Taxa de Intermediação */}
        <div className="flex flex-col">
          <label
            htmlFor="taxaIntermediacao"
            className="text-sm font-semibold text-gray-700 mb-2"
          >
            Taxa intermediação (%)
          </label>
          <input
            type="number"
            id="taxaIntermediacao"
            placeholder="0 a 100"
            min={0}
            max={100}
            value={formData.taxaIntermediacao}
            onChange={(e) =>
              handleCurrencyChange(
                "taxaIntermediacao",
                parseInt(e.target.value, 10)
              )
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2">
            Valor
          </label>
          <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100">
            R${" "}
            {calculatePercentage(
              formData.taxaIntermediacao,
              formData.valorContrato!
            )}
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Rescisão */}
        <div className="flex flex-col">
          <label
            htmlFor="rescisao"
            className="text-sm font-semibold text-gray-700 mb-2"
          >
            Rescisão
          </label>
          <input
            type="text"
            id="rescisao"
            placeholder="ex: 3 meses de aluguel"
            value={formData.rescisao}
            onChange={(e) => handleCurrencyChange("rescisao", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        {/* Sem Multa após */}
        <div className="flex flex-col">
          <label
            htmlFor="semMultaApos"
            className="text-sm font-semibold text-gray-700 mb-2"
          >
            Sem Multa Após
          </label>
          <input
            type="text"
            id="semMultaApos"
            placeholder="ex: 12 meses"
            value={formData.semMultaApos}
            onChange={(e) =>
              handleCurrencyChange("semMultaApos", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </section>
    </main>
  );
};

export default TaxesForm;
