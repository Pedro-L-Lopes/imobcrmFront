// InsertClient.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { insertClient, reset } from "../../slices/clientSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import ClientForm from "./ClientForm";
import Message from "../utils/Message";
import { MdArrowBack } from "react-icons/md";
import InsertHeader from "../InsertHeader";

const InsertClient = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, success, message } = useSelector((state: any) => state.client);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      insertClient({
        tipoCliente,
        nome,
        cpfCnpj,
        ...(email && { email }),
        ...(telefone && { telefone }),
        ...(tipoCliente === "Pessoa Fisica" &&
          dataNascimento && { dataNascimento }),
        ...(tipoCliente === "Pessoa Fisica" && sexo && { sexo }),
      })
    );
    setFormSubmitted(true);
  };

  useEffect(() => {
    if (success && formSubmitted) {
      navigate("/clientes");
      dispatch(reset());
    }
  }, [success, formSubmitted, navigate, dispatch]);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  console.log(error);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start mt-4 p-4">
      {/* Mensagem de erro ou sucesso */}
      <Message text={message} type={error ? "error" : "success"} />

      <InsertHeader
        title="Inserir Cliente"
        paths={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Clientes", url: "/clientes" },
          { name: "Inserir Cliente", url: "/novo-cliente" },
        ]}
      />

      {/* Formulário */}
      <ClientForm
        tipoCliente={tipoCliente}
        nome={nome}
        email={email}
        telefone={telefone}
        cpfCnpj={cpfCnpj}
        dataNascimento={dataNascimento}
        sexo={sexo}
        onSubmit={handleSubmit}
        onChange={{
          setTipoCliente,
          setNome,
          setEmail,
          setTelefone,
          setCpfCnpj,
          setDataNascimento,
          setSexo,
        }}
      />
    </div>
  );
};

export default InsertClient;
