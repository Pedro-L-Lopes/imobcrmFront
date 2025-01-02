import { RentalContractType } from "../../../types/rentalContract";

interface GeneralNotesFormProps {
  formData: RentalContractType;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const GeneralNotesForm = ({
  formData,
  handleChange,
}: GeneralNotesFormProps) => {
  const handleCurrencyChange = (fieldName: string, value: any) => {
    handleChange({
      target: { name: fieldName, value },
    } as any);
  };

  return (
    <main className="p-6 bg-gray-50">
      <section className="">
        {/* Anotações Gerais */}
        <div className="flex flex-col h-52">
          <label
            htmlFor="taxaAdm"
            className="text-sm font-semibold text-gray-700 mb-2"
          >
            Anotações Gerais
          </label>
          <textarea
            name=""
            id=""
            cols={5}
            rows={10}
            value={formData.anotacoesGerais}
            maxLength={1000}
            onChange={(e) =>
              handleCurrencyChange("anotacoesGerais", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          ></textarea>
        </div>
      </section>
    </main>
  );
};

export default GeneralNotesForm;
