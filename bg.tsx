import React from "react";
import { filterOptions } from "../../../utils/propertyUtils";
import { PropertyType } from "../../../types/property";

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
}) => (
  <div className="p-4 bg-white shadow-md rounded-md space-y-6">
    {/* Campos principais */}
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div>
        <label htmlFor="finalidade" className="block font-semibold mb-1">
          Finalidade
        </label>
        <select
          name="finalidade"
          value={formData.finalidade || ""}
          className="w-full border p-2 rounded"
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

      <div>
        <label htmlFor="tipoImovel" className="block font-semibold mb-1">
          Tipo Imóvel
        </label>
        <select
          name="tipoImovel"
          value={formData.tipoImovel || ""}
          className="w-full border p-2 rounded"
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

      <div>
        <label htmlFor="destinacao" className="block font-semibold mb-1">
          Destinação
        </label>
        <select
          name="destinacao"
          value={formData.destinacao || ""}
          className="w-full border p-2 rounded"
          onChange={handleChange}
        >
          <option value="">Selecione</option>
          <option value="residencial">Residencial</option>
          <option value="comercial">Comercial</option>
          <option value="rural">Rural</option>
        </select>
      </div>

      <div>
        <label htmlFor="situacao" className="block font-semibold mb-1">
          Situação
        </label>
        <select
          name="situacao"
          value={formData.situacao || ""}
          className="w-full border p-2 rounded"
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

    {/* Informações adicionais */}
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[
        { label: "Quartos", name: "quartos", value: formData.quartos },
        { label: "Suítes", name: "suites", value: formData.suites },
        { label: "Banheiros", name: "banheiros", value: formData.banheiros },
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
          <label htmlFor={field.name} className="block font-semibold mb-1">
            {field.label}
          </label>
          <input
            type="number"
            name={field.name}
            value={field.value || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}
    </section>

    {/* Avaliação e autorização */}
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label htmlFor="avaliacao" className="block font-semibold mb-1">
          Avaliação
        </label>
        <select
          name="avaliacao"
          value={formData.avaliacao ? "true" : "false"}
          className="w-full border p-2 rounded"
          onChange={handleChange}
        >
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </div>

      <div>
        <label htmlFor="avaliacaoValor" className="block font-semibold mb-1">
          Valor Avaliação
        </label>
        <input
          type="number"
          name="avaliacaoValor"
          value={formData.avaliacaoValor}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="dataAvaliacao" className="block font-semibold mb-1">
          Data Avaliação
        </label>
        <input
          type="date"
          name="dataAvaliacao"
          value={
            formData.dataAvaliacao
              ? formData.dataAvaliacao.toISOString().split("T")[0]
              : ""
          }
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="valorAutorizacao" className="block font-semibold mb-1">
          Valor Autorização
        </label>
        <input
          type="number"
          name="valorAutorizacao"
          value={formData.valorAutorizacao || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label htmlFor="tipoAutorizacao" className="block font-semibold mb-1">
          Tipo Autorização
        </label>
        <input
          type="number"
          name="tipoAutorizacao"
          value={formData.tipoAutorizacao || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label htmlFor="dataAutorizacao" className="block font-semibold mb-1">
          Data Autorização
        </label>
        <input
          type="number"
          name="dataAutorizacao"
          value={
            formData.dataAutorizacao
              ? formData.dataAutorizacao.toISOString().split("T")[0]
              : ""
          }
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label htmlFor="comPlaca" className="block font-semibold mb-1">
          Placa/adesivo
        </label>
        <select
          name="comPlaca"
          className="w-full border p-2 rounded"
          value={formData.avaliacao ? "true" : "false"}
          onChange={handleChange}
        >
          <option value="true">Com placa/adesivo</option>
          <option value="false">Sem placa/adesivo</option>
        </select>
      </div>
      <div>
        <label htmlFor="avaliacao" className="block font-semibold mb-1">
          Avaliação
        </label>
        <select
          name="avaliacao"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        >
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </div>
    </section>

    {/* Descrição */}
    <section>
      <div>
        <label htmlFor="descricao" className="block font-semibold mb-1">
          Descrição
        </label>
        <textarea
          name="descricao"
          value={formData.descricao || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        ></textarea>
      </div>
    </section>
  </div>
);

export default MainDetailsForm;
