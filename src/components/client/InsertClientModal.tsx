import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { insertClient, reset } from "../../slices/clientSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

// Components
import * as Tooltip from "@radix-ui/react-tooltip";
import { FaRegCircleQuestion } from "react-icons/fa6";

type InsertClientModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

const InsertClientModal: React.FC<InsertClientModalProps> = ({
  onClose,
  isOpen,
}) => {
  const dispatch = useAppDispatch();
  const { error, success, message } = useSelector((state: any) => state.client);

  const [tipoCliente, setTipoCliente] = useState<
    "Pessoa Fisica" | "Pessoa Juridica"
  >("Pessoa Fisica");
  const [nome, setNome] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !cpfCnpj) return;

    dispatch(
      insertClient({
        tipoCliente,
        nome,
        cpfCnpj,
        ...(telefone && { telefone }),
        ...(email && { email }),
      })
    );
  };

  useEffect(() => {
    if (success) {
      onClose(); // Fecha o modal após sucesso
      dispatch(reset());
    }
  }, [success, onClose, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Inserir Cliente</h2>

        {message && (
          <div
            className={`p-4 mb-4 rounded-sm text-white ${
              error ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Pessoa</label>
            <select
              value={tipoCliente}
              onChange={(e) =>
                setTipoCliente(
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
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 font-medium mb-1">
              {tipoCliente === "Pessoa Fisica" ? "CPF" : "CNPJ"}
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button>
                      <FaRegCircleQuestion />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      sideOffset={5}
                      side="top"
                      align="center"
                      className="bg-blue-500 text-white rounded-sm p-2 z-10"
                    >
                      Sempre que possível adicione um CPF/CNPJ verdadeiro
                      <Tooltip.Arrow className="fill-blue-500" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </label>
            <input
              type="text"
              value={cpfCnpj}
              onChange={(e) => setCpfCnpj(e.target.value)}
              required
              maxLength={tipoCliente === "Pessoa Fisica" ? 11 : 14}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Telefone</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              Inserir Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InsertClientModal;
