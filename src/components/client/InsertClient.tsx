import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { insertClient, reset } from "../../slices/clientSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import Message from "../utils/Message";
import { RootState } from "../../store";
import { MdArrowBack } from "react-icons/md";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FaQuestionCircle } from "react-icons/fa";

const InsertClient = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { error, success, message } = useSelector(
    (state: RootState) => state.client
  );

  // Controle para saber se o formulário foi enviado
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [tipoCliente, setTipoCliente] = useState<
    "Pessoa Fisica" | "Pessoa Juridica"
  >("Pessoa Fisica");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [sexo, setSexo] = useState("");

  const handleTipoClienteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoCliente(e.target.value as "Pessoa Fisica" | "Pessoa Juridica");
    setCpfCnpj("");
  };

  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (tipoCliente === "Pessoa Fisica" && value.length <= 11) {
      setCpfCnpj(value);
    } else if (tipoCliente === "Pessoa Juridica" && value.length <= 14) {
      setCpfCnpj(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cliente = {
      tipoCliente,
      nome,
      cpfCnpj,
      ...(email && { email }),
      ...(telefone && { telefone }),
      ...(tipoCliente === "Pessoa Fisica" &&
        dataNascimento && { dataNascimento }),
      ...(tipoCliente === "Pessoa Fisica" && sexo && { sexo }),
    };

    dispatch(insertClient(cliente));
    setFormSubmitted(true);
  };

  useEffect(() => {
    if (success && formSubmitted) {
      setNome("");
      setEmail("");
      setTelefone("");
      setCpfCnpj("");
      setDataNascimento("");
      setSexo("");

      navigate("/clientes");

      dispatch(reset());
    }
  }, [success, formSubmitted, navigate, dispatch]);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      {/* Mensagem de erro ou sucesso */}
      <Message text={message} type={error ? "error" : "success"} />

      {/* Botão de voltar */}
      <Link
        to="/clientes"
        className="flex items-center justify-center gap-2 w-10 h-10 mb-5 bg-gray-200 rounded-full hover:bg-gray-300 transition-shadow shadow-sm"
        title="Voltar"
      >
        <MdArrowBack size={24} />
      </Link>

      {/* Título */}
      <h2 className="text-lg font-bold mb-6">Inserir Cliente</h2>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Primeira linha: Tipo de cliente, Nome, e Email */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1">
              Pessoa Física ou Jurídica
            </label>
            <select
              value={tipoCliente}
              onChange={handleTipoClienteChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Segunda linha: Telefone e CPF/CNPJ */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Telefone</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 flex items-center gap-2">
              {tipoCliente === "Pessoa Fisica" ? "CPF" : "CNPJ"}
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      type="button"
                      className="text-blue-500 hover:text-blue-600 focus:outline-none"
                    >
                      <FaQuestionCircle />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      sideOffset={5}
                      side="top"
                      align="center"
                      className="bg-blue-500 rounded-md text-white p-2 text-sm shadow-lg"
                    >
                      Adicione um CPF/CNPJ válido, sempre que possível.
                      <Tooltip.Arrow className="fill-blue-500" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </label>
            <input
              type="text"
              value={cpfCnpj}
              onChange={handleCpfCnpjChange}
              maxLength={tipoCliente === "Pessoa Fisica" ? 11 : 14}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Condicional: Campos específicos para Pessoa Física */}
        {tipoCliente === "Pessoa Fisica" && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Sexo</label>
              <select
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">
                Data de Nascimento
              </label>
              <input
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Botão de submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-bold hover:bg-blue-700 transition"
          >
            Inserir Cliente
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsertClient;
