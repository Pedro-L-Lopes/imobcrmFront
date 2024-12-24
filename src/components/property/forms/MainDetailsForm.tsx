import { filterOptions } from "../../../utils/propertyUtils";
import { PropertyType } from "../../../types/property";
import CurrencyInput from "../../utils/CurrencyInput";

interface MainDetailsProps {
  formData: PropertyType;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const MainDetailsForm: React.FC<MainDetailsProps> = ({
  formData,
  handleChange,
}) => {
  const handleCurrencyChange = (fieldName: string, value: number) => {
    handleChange({
      target: { name: fieldName, value },
    } as any);
  };

  return (
    <main className="p-2">
      <section className="p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-10 ">
          {/* Seção 1 - Finalidade, Tipo imóvel, Destinação e Situação*/}
          <section className="border p-2 rounded-md">
            <h1 className="text-xl font-bold mb-2">Informações Iniciais</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
              {/* Finalidade */}
              <div>
                <label
                  htmlFor="finalidade"
                  className="block font-semibold mb-1"
                >
                  Finalidade
                </label>
                <select
                  name="finalidade"
                  value={formData.finalidade}
                  className={`w-full border p-2 rounded ${
                    formData.finalidade
                      ? "border-green-500"
                      : "border-red-500 bg-red-50"
                  }`}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  {filterOptions
                    .find((option) => option.name === "purpose")
                    ?.options.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                </select>
              </div>

              {/* Tipo Imóvel */}
              <div>
                <label
                  htmlFor="tipoImovel"
                  className="block font-semibold mb-1"
                >
                  Tipo Imóvel
                </label>
                <select
                  name="tipoImovel"
                  value={formData.tipoImovel || ""}
                  className={`w-full border p-2 rounded ${
                    formData.tipoImovel
                      ? "border-green-500"
                      : "border-red-500 bg-red-50"
                  }`}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  {filterOptions
                    .find((option) => option.name === "typeProperty")
                    ?.options.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                </select>
              </div>

              {/* Destinação */}
              <div>
                <label
                  htmlFor="destinacao"
                  className="block font-semibold mb-1"
                >
                  Destinação
                </label>
                <select
                  name="destinacao"
                  value={formData.destinacao || ""}
                  className={`w-full border p-2 rounded ${
                    formData.destinacao
                      ? "border-green-500"
                      : "border-red-500 bg-red-50"
                  }`}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  <option value="Residencial">Residencial</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Residencial/Comercial">
                    Residencial/Comercial
                  </option>
                  <option value="Rural">Rural</option>
                </select>
              </div>

              {/* Situação */}
              <div>
                <label htmlFor="situacao" className="block font-semibold mb-1">
                  Situação
                </label>
                <select
                  name="situacao"
                  value={formData.situacao || ""}
                  className={`w-full border p-2 rounded ${
                    formData.situacao
                      ? "border-green-500"
                      : "border-red-500 bg-red-50"
                  }`}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  {filterOptions
                    .find((option) => option.name === "situation")
                    ?.options.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </section>

          {/* Seção 2 - Valor, Valor condomínio, Área m² e Código Site*/}
          <section className="border p-2 rounded-md">
            <h1 className="text-xl font-bold mb-2">Valor e medidas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
              {/* Valores */}
              <div>
                <label htmlFor="valor" className="block font-semibold mb-1">
                  Valor
                </label>
                <CurrencyInput
                  value={formData.valor!}
                  fieldName="valor"
                  onChange={handleCurrencyChange}
                  className={`w-full p-2 rounded ${
                    formData.valor
                      ? "border border-gray-400"
                      : "border border-red-500 bg-red-50"
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="valorCondominio"
                  className="block font-semibold mb-1"
                >
                  Valor do Condomínio
                </label>
                <CurrencyInput
                  value={formData.valorCondominio!}
                  fieldName="valorCondominio"
                  onChange={handleCurrencyChange}
                  className={"w-full border border-gray-400 p-2 rounded"}
                />
              </div>
              <div>
                <label htmlFor="area" className="block font-semibold mb-1">
                  Área em M²
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className={`w-full border p-2 rounded ${
                    formData.area! > 0
                      ? "border-green-500"
                      : "border-red-500 bg-red-50"
                  }`}
                />
              </div>
              <div>
                <label htmlFor="siteCod" className="block font-semibold mb-1">
                  Código site externo
                </label>
                <input
                  type="text"
                  name="siteCod"
                  value={formData.siteCod}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-2 rounded"
                />
              </div>
            </div>
          </section>

          {/* Seção 3 - Avaliação, Tipo de Autorização e Com/Sem Placa*/}
          <section className="border p-2 rounded-md">
            <h1 className="text-xl font-bold mb-2">Avaliação e autorização</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
              {/* Avaliação */}
              <section className="grid grid-cols-1 gap-2">
                <div>
                  <label
                    htmlFor="avaliacao"
                    className="block font-semibold mb-1"
                  >
                    Avaliação
                  </label>
                  <select
                    name="avaliacao"
                    value={String(formData.avaliacao)}
                    className="w-full border border-gray-400 p-2 rounded"
                    onChange={handleChange}
                  >
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>

                {formData.avaliacao && (
                  <>
                    <div>
                      <label
                        htmlFor="avaliacaoValor"
                        className="block font-semibold mb-1"
                      >
                        Valor Avaliação
                      </label>
                      <CurrencyInput
                        value={formData.avaliacaoValor!}
                        fieldName="avaliacaoValor"
                        onChange={handleCurrencyChange}
                        className={"w-full border border-gray-400 p-2 rounded"}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="dataAvaliacao"
                        className="block font-semibold mb-1"
                      >
                        Data Avaliação
                      </label>
                      <input
                        type="date"
                        name="dataAvaliacao"
                        value={
                          formData.dataAvaliacao instanceof Date
                            ? formData.dataAvaliacao.toISOString().split("T")[0]
                            : typeof formData.dataAvaliacao === "string"
                            ? formData.dataAvaliacao
                            : ""
                        }
                        onChange={handleChange}
                        className="w-full border border-gray-400 p-2 rounded"
                      />
                    </div>
                  </>
                )}
              </section>
              {/* Autorização */}
              <section className="grid grid-cols-1 gap-2">
                <div>
                  <label
                    htmlFor="tipoAutorizacao"
                    className="block font-semibold mb-1"
                  >
                    Tipo Autorização
                  </label>
                  <select
                    name="tipoAutorizacao"
                    value={formData.tipoAutorizacao}
                    className="w-full border border-gray-400 p-2 rounded"
                    onChange={handleChange}
                  >
                    {filterOptions
                      .find((option) => option.name === "autorizationType")
                      ?.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </select>
                </div>

                {formData.tipoAutorizacao !== "sem autorizacao" && (
                  <>
                    <div>
                      <label
                        htmlFor="valorAutorizacao"
                        className="block font-semibold mb-1"
                      >
                        Valor Autorização
                      </label>
                      <CurrencyInput
                        value={formData.avaliacaoValor!}
                        fieldName="avaliacaoAutorizacao"
                        onChange={handleCurrencyChange}
                        className={"w-full border border-gray-400 p-2 rounded"}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="dataAutorizacao"
                        className="block font-semibold mb-1"
                      >
                        Data Autorização
                      </label>
                      <input
                        type="date"
                        name="dataAutorizacao"
                        value={
                          formData.dataAutorizacao instanceof Date
                            ? formData.dataAutorizacao
                                .toISOString()
                                .split("T")[0]
                            : typeof formData.dataAutorizacao === "string"
                            ? formData.dataAutorizacao
                            : ""
                        }
                        onChange={handleChange}
                        className="w-full border border-gray-400 p-2 rounded"
                      />
                    </div>
                  </>
                )}
              </section>
              <div>
                <label htmlFor="comPlaca" className="block font-semibold mb-1">
                  Com Placa/Adesivo
                </label>
                <select
                  name="comPlaca"
                  value={String(formData.comPlaca)}
                  className="w-full border border-gray-400 p-2 rounded"
                  onChange={handleChange}
                >
                  {filterOptions
                    .find((option) => option.name === "withPlate")
                    ?.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </section>

          {/* Seção 4 - Descrição*/}
          <section className="border p-2 rounded-md">
            <h1 className="text-xl font-bold mb-2">Descrição</h1>
            {/* Descrição */}
            <label htmlFor="descricao" className="block font-semibold mb-1">
              Descrição do imóvel
            </label>
            <textarea
              name="descricao"
              value={formData.descricao || ""}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                formData.descricao
                  ? "border-green-500"
                  : "border-red-500 bg-red-50"
              }`}
            ></textarea>
            <p className="opacity-30">{formData.descricao?.length}/255</p>
          </section>

          {/* Seção 5 - Carcteristicas internas*/}
          <section className="border p-2 rounded-md">
            <h1 className="text-xl font-bold mb-2">Características Internas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
              {[
                { label: "Quartos", name: "quartos", value: formData.quartos },
                { label: "Suítes", name: "suites", value: formData.suites },
                {
                  label: "Banheiros",
                  name: "banheiros",
                  value: formData.banheiros,
                },
                {
                  label: "Salas de Estar",
                  name: "salasEstar",
                  value: formData.salasEstar,
                },
                {
                  label: "Salas de Jantar",
                  name: "salasJantar",
                  value: formData.salasJantar,
                },
                { label: "Varandas", name: "varanda", value: formData.varanda },
                { label: "Garagem", name: "garagem", value: formData.garagem },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block font-semibold mb-1"
                  >
                    {field.label}
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    value={field.value || ""}
                    onChange={handleChange}
                    min={0}
                    max={250}
                    className="w-full border border-gray-400 p-2 rounded"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default MainDetailsForm;
