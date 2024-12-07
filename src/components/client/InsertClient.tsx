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
      <Message text={message} type={error ? "error" : "success"} />
      <Link
        to="/clientes"
        className="flex items-center justify-center gap-2 hover:opacity-70 transition-all w-10 h-10 mb-5 bg-gray-200 rounded-md hover:shadow-sm"
      >
        <MdArrowBack size={25} />
      </Link>
      <h2 className="text-lg font-bold mb-4">Inserir Cliente</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Formulário */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <label className="block font-medium">
              Pessoa Física ou Jurídica
            </label>
            <select
              value={tipoCliente}
              onChange={handleTipoClienteChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="Pessoa Fisica">Pessoa Física</option>
              <option value="Pessoa Juridica">Pessoa Jurídica</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block font-medium">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div className="flex-1">
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <label className="block font-medium">Telefone</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div className="flex-1">
            <label className="flex items-center gap-3 font-medium">
              {tipoCliente === "Pessoa Fisica" ? "CPF" : "CNPJ"}
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button>
                      <FaQuestionCircle />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      sideOffset={5}
                      side="top"
                      align="center"
                      className="bg-blue-500 rounded-md text-white p-2"
                    >
                      Você pode adicionar um CPF/CNPJ não existente, <br />
                      mas priorize adicionar um existente sempre que possível
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
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {tipoCliente === "Pessoa Fisica" && (
            <div className="flex-1">
              <label className="block font-medium">Sexo</label>
              <select
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="">Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outro</option>
              </select>
            </div>
          )}
        </div>

        {tipoCliente === "Pessoa Fisica" && (
          <div className="w-full md:w-1/3">
            <label className="block font-medium">Data de Nascimento</label>
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Inserir Cliente
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsertClient;
