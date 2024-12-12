// ClientForm.tsx
import React from "react";

type ClientFormProps = {
  tipoCliente: "Pessoa Fisica" | "Pessoa Juridica";
  nome: string;
  email: string;
  telefone: string;
  cpfCnpj: string;
  dataNascimento: string;
  sexo: string;
  onSubmit: (e: React.FormEvent) => void;
  onChange: {
    setTipoCliente: (value: "Pessoa Fisica" | "Pessoa Juridica") => void;
    setNome: (value: string) => void;
    setEmail: (value: string) => void;
    setTelefone: (value: string) => void;
    setCpfCnpj: (value: string) => void;
    setDataNascimento: (value: string) => void;
    setSexo: (value: string) => void;
  };
};

const ClientForm: React.FC<ClientFormProps> = ({
  tipoCliente,
  nome,
  email,
  telefone,
  cpfCnpj,
  dataNascimento,
  sexo,
  onSubmit,
  onChange,
}) => {
  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      (tipoCliente === "Pessoa Fisica" && value.length <= 11) ||
      (tipoCliente === "Pessoa Juridica" && value.length <= 14)
    ) {
      onChange.setCpfCnpj(value);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Primeira linha */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium mb-1">
            Pessoa Física ou Jurídica
          </label>
          <select
            value={tipoCliente}
            onChange={(e) =>
              onChange.setTipoCliente(
                e.target.value as "Pessoa Fisica" | "Pessoa Juridica"
              )
            }
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="Pessoa Fisica">Pessoa Física</option>
            <option value="Pessoa Juridica">Pessoa Jurídica</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => onChange.setNome(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => onChange.setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
      </div>

      {/* Segunda linha */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Telefone</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => onChange.setTelefone(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            {tipoCliente === "Pessoa Fisica" ? "CPF" : "CNPJ"}
          </label>
          <input
            type="text"
            value={cpfCnpj}
            onChange={handleCpfCnpjChange}
            maxLength={tipoCliente === "Pessoa Fisica" ? 11 : 14}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
      </div>

      {tipoCliente === "Pessoa Fisica" && (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Sexo</label>
            <select
              value={sexo}
              onChange={(e) => onChange.setSexo(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Selecione</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Data de Nascimento</label>
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => onChange.setDataNascimento(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          Inserir Cliente
        </button>
      </div>
    </form>
  );
};

export default ClientForm;