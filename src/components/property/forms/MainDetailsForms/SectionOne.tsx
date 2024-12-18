import { useState } from "react";

interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  value,
  options,
  handleChange,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block font-semibold mb-1">
        {label}
      </label>
      <select
        name={name}
        value={value}
        className={`w-full border p-2 rounded ${
          value ? "border-green-500" : "border-red-500 bg-red-50"
        }`}
        onChange={handleChange}
      >
        <option value="">Selecione</option>
        {options.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const YourFormComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    finalidade: "",
    tipoImovel: "",
    destinacao: "",
    situacao: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const filterOptions = [
    {
      name: "purpose",
      options: [
        { value: "venda", label: "Venda" },
        { value: "aluguel", label: "Aluguel" },
      ],
    },
    {
      name: "typeProperty",
      options: [
        { value: "apartamento", label: "Apartamento" },
        { value: "casa", label: "Casa" },
      ],
    },
    {
      name: "situation",
      options: [
        { value: "disponivel", label: "Disponível" },
        { value: "indisponivel", label: "Indisponível" },
      ],
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
      <SelectInput
        label="Finalidade"
        name="finalidade"
        value={formData.finalidade}
        options={
          filterOptions.find((option) => option.name === "purpose")?.options ||
          []
        }
        handleChange={handleChange}
      />
      <SelectInput
        label="Tipo Imóvel"
        name="tipoImovel"
        value={formData.tipoImovel}
        options={
          filterOptions.find((option) => option.name === "typeProperty")
            ?.options || []
        }
        handleChange={handleChange}
      />
      <SelectInput
        label="Destinação"
        name="destinacao"
        value={formData.destinacao}
        options={[
          { value: "residencial", label: "Residencial" },
          { value: "comercial", label: "Comercial" },
          { value: "residencial/residencial", label: "Residencial/Comercial" },
          { value: "rural", label: "Rural" },
        ]}
        handleChange={handleChange}
      />
      <SelectInput
        label="Situação"
        name="situacao"
        value={formData.situacao}
        options={
          filterOptions.find((option) => option.name === "situation")
            ?.options || []
        }
        handleChange={handleChange}
      />
    </section>
  );
};
