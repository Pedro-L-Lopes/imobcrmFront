import React, { useState } from "react";
import { filterOptions } from "../../../utils/propertyUtils";
import { PropertyType } from "../../../types/property";

// Função utilitária para formatar o valor em formato monetário
const formatCurrency = (value: number | string) => {
  if (!value) return "";
  const numberValue = Number(value);
  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

// Função para desformatar a string do input para um número puro
const parseCurrency = (value: string) => {
  const cleanValue = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  return Number(cleanValue) / 100; // Divide por 100 para adicionar as casas decimais
};

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
  // Estados locais para valor e valorCondominio (formatados)
  const [valorFormatted, setValorFormatted] = useState(
    formatCurrency(formData.valor!)
  );
  const [valorCondominioFormatted, setValorCondominioFormatted] = useState(
    formatCurrency(formData.valorCondominio!)
  );

  const [valorAvaliacaoFormatted, setValorAvaliacaoFormatted] = useState(
    formatCurrency(formData.avaliacaoValor!)
  );

  const [valorAutorizacaoFormatted, setValorAutorizacaoFormatted] = useState(
    formatCurrency(formData.avaliacaoValor!)
  );

  // Função para manipular mudança de valor
  const handleCurrencyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    setFormatted: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { value } = e.target;
    const numericValue = parseCurrency(value);
    setFormatted(formatCurrency(numericValue));

    // Atualiza o valor numérico no estado pai
    handleChange({
      target: { name: fieldName, value: numericValue },
    } as any);
  };

  return (
    <main className="p-2 shadow-md rounded-md">
      <main className="p-2 shadow-md rounded-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-10">
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
            {/* Finalidade */}
            <div>
              <label htmlFor="finalidade" className="block font-semibold mb-1">
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
              <label htmlFor="tipoImovel" className="block font-semibold mb-1">
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
              <label htmlFor="destinacao" className="block font-semibold mb-1">
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
                <option value="residencial">Residencial</option>
                <option value="comercial">Comercial</option>
                <option value="residencial/residencial">
                  Residencial/Comercial
                </option>
                <option value="rural">Rural</option>
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
          </section>

          {/* Valores */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
            <div>
              <label htmlFor="valor" className="block font-semibold mb-1">
                Valor
              </label>
              <input
                type="text"
                name="valor"
                value={valorFormatted}
                onChange={(e) =>
                  handleCurrencyChange(e, "valor", setValorFormatted)
                }
                className={`w-full border p-2 rounded ${
                  formData.valor! > 0
                    ? "border-green-500"
                    : "border-red-500 bg-red-50"
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
              <input
                type="text"
                name="valorCondominio"
                value={valorCondominioFormatted}
                onChange={(e) =>
                  handleCurrencyChange(
                    e,
                    "valorCondominio",
                    setValorCondominioFormatted
                  )
                }
                className="w-full border border-gray-400 p-2 rounded"
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
          </section>

          {/* Avaliação */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
            <section className="grid grid-cols-1 gap-2">
              <div>
                <label htmlFor="avaliacao" className="block font-semibold mb-1">
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
                    <input
                      type="text"
                      name="avaliacaoValor"
                      value={valorAvaliacaoFormatted}
                      onChange={(e) =>
                        handleCurrencyChange(
                          e,
                          "valorCondominio",
                          setValorAvaliacaoFormatted
                        )
                      }
                      className="w-full border border-gray-400 p-2 rounded"
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
                        formData.dataAvaliacao &&
                        formData.dataAvaliacao instanceof Date
                          ? formData.dataAvaliacao.toISOString().split("T")[0]
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
                    <input
                      type="text"
                      name="valorAutorizacao"
                      value={valorAutorizacaoFormatted}
                      onChange={(e) =>
                        handleCurrencyChange(
                          e,
                          "valorCondominio",
                          setValorAutorizacaoFormatted
                        )
                      }
                      className="w-full border border-gray-400 p-2 rounded"
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
                      name="dataAvaliacao"
                      value={
                        formData.dataAvaliacao &&
                        formData.dataAvaliacao instanceof Date
                          ? formData.dataAvaliacao.toISOString().split("T")[0]
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
          </section>

          {/* Descrição */}
          <section>
            <label htmlFor="descricao" className="block font-semibold mt-2">
              Descrição
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

          {/* Campos numéricos */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
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
                  type="text"
                  name={field.name}
                  value={field.value || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-2 rounded"
                />
              </div>
            ))}
          </section>
        </div>
      </main>
    </main>
  );
};

export default MainDetailsForm;
