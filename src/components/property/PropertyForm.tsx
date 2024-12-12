import React from "react";

type PropertyFormProps = {
  property: any;
  onChange: (value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const PropertyForm = ({ property, onChange, onSubmit }: PropertyFormProps) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Verifica se o elemento é um checkbox
    const fieldValue =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value;

    onChange({
      ...property,
      [name]: fieldValue,
    });
    console.log(value);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="p-6 bg-gray-50 rounded-lg shadow-lg space-y-6">
        <h2 className="text-lg font-bold">Cadastro de Imóvel</h2>

        <div className="space-y-4">
          {/* Proprietário */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Proprietário:
            </label>
            <input
              type="text"
              name="proprietarioId"
              value={property.proprietarioId}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Destinação */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Destinação:
            </label>
            <select
              name="destinacao"
              value={property.destinacao}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecione</option>
              <option value="Residencial">Residencial</option>
              <option value="Comercial">Comercial</option>
            </select>
          </div>

          {/* Finalidade */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Finalidade:
            </label>
            <input
              type="text"
              name="finalidade"
              value={property.finalidade}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Valor */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Valor:
            </label>
            <input
              type="number"
              step="0.01" // Permite casas decimais
              name="valor"
              value={property.valor ?? ""}
              className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cadastrar Imóvel
          </button>
        </div>
      </div>
    </form>
  );
};

export default PropertyForm;
