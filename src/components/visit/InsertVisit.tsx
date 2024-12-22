// InsertVisit.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { insertVisit, reset } from "../../slices/visitSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import Message from "../utils/Message";
import InsertHeader from "../InsertHeader";
import VisitForm from "./VisitForm";
import VisitReport from "./VisitReport";

const InsertVisit = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { error, success, message } = useSelector((state: any) => state.visit);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [situacao, setSituacao] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [imovelId, setImovelId] = useState("");
  const [dataHora, setDataHora] = useState<Date>();
  const [observacao, setObservacao] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      insertVisit({
        situacao,
        clienteId,
        imovelId,
        dataHora,
        observacao,
      })
    );
    setFormSubmitted(true);
  };

  useEffect(() => {
    if (success && formSubmitted) {
      navigate("/visitas");
      dispatch(reset());
    }
  }, [success, formSubmitted, navigate, dispatch]);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start mt-4 p-4">
      {/* Mensagem de erro ou sucesso */}
      {message && <Message text={message} type={error ? "error" : "success"} />}

      <InsertHeader
        title="Adicionar Visita"
        paths={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Visitas", url: "/visitas" },
          { name: "Adicionar Visita", url: "/nova-visita" },
        ]}
      />

      {/* Formulário */}
      <VisitForm
        situacao={situacao}
        clienteId={clienteId}
        imovelId={imovelId}
        dataHora={dataHora!}
        observacao={observacao}
        onSubmit={handleSubmit}
        onChange={{
          setSituacao,
          setClienteId,
          setImovelId,
          setDataHora,
          setObservacao,
        }}
      />

      {/* Relatório */}
      {situacao && clienteId && imovelId && dataHora && (
        <VisitReport
          situacao={situacao}
          clienteId={clienteId}
          imovelId={imovelId}
          dataHora={dataHora}
          observacao={observacao}
        />
      )}
    </div>
  );
};

export default InsertVisit;
