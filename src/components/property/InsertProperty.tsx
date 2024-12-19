import React, { useState } from "react";
import StepProgress from "./StepProgress";
import AddressOwnerForm from "./forms/AddressOwnerForm";
import MainDetailsForm from "./forms/MainDetailsForm";
import AdditionalDetailsForm from "./forms/AdditionalDetailsForm";
import NotesDescriptionForm from "./forms/NotesDescriptionForm";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { insertProperty } from "../../slices/propertySlice";
import { PropertyType } from "../../types/property";
import { useSelector } from "react-redux";
import InsertHeader from "../InsertHeader";
import { area } from "motion/react-client";
import Message from "../utils/Message";
import { useNavigate } from "react-router-dom";

const InsertProperty: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { success, error, message } = useSelector(
    (state: any) => state.property
  );

  const [showError, setShowError] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PropertyType>({
    proprietarioId: "",

    rua: "",
    numero: "",
    cep: "",

    tipoImovel: "",
    finalidade: "",
    destinacao: "",
    situacao: "",

    valor: 0,
    valorCondominio: 0,

    area: 0,

    siteCod: "",

    observacoes: "",
    descricao: "",

    quartos: 0,
    suites: 0,
    banheiros: 0,
    salasEstar: 0,
    salasJantar: 0,
    varanda: 0,
    garagem: 0,

    avaliacao: false,
    avaliacaoValor: 0,
    dataAvaliacao: null,

    comPlaca: false,

    tipoAutorizacao: "sem autorizacao",
    valorAutorizacao: 0,
    dataAutorizacao: null,

    localizacaoId: 0,
  });

  console.log("AV " + formData.dataAvaliacao);
  console.log("AT " + formData.dataAutorizacao);

  // Validação de campos obrigatórios
  const validateStep = () => {
    const validations: Record<number, boolean> = {
      0: !!formData.localizacaoId,
      1:
        !!formData.finalidade &&
        !!formData.tipoImovel &&
        !!formData.destinacao &&
        !!formData.situacao &&
        !!formData.valor &&
        !!formData.area &&
        !!formData.descricao,
      3: !!formData.proprietarioId,
    };

    return validations[currentStep] ?? true;
  };

  const handleNext = () => {
    if (!validateStep()) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" && e.target instanceof HTMLInputElement
          ? e.target.checked
          : name === "avaliacao" || name === "comPlaca"
          ? value === "true"
          : [
              "valor",
              "valorCondominio",
              "area",
              "avaliacaoValor",
              "localizacaoId",
              "valorAutorizacao",
              "quartos",
              "suites",
              "banheiros",
              "salasEstar",
              "salasJantar",
              "varanda",
              "garagem",
            ].includes(name)
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.proprietarioId) {
      try {
        await dispatch(insertProperty(formData)).unwrap();
        setFormData({
          proprietarioId: "",
          rua: "",
          numero: "",
          finalidade: "",
          tipoImovel: "",
          valor: 0,
          quartos: 0,
          banheiros: 0,
          garagem: 0,
          area: 0,
          observacoes: "",
          descricao: "",
          localizacaoId: 0,
        });
        navigate("/imoveis");
      } catch (error) {
        console.error("Erro ao inserir o imóvel:", error);
      }
    }
  };

  console.log(message);
  console.log(success);
  return (
    <div className="w-full min-h-screen flex flex-col justify-start mt-4 p-4">
      {showError && (
        <Message
          text="Por favor, preencha todos os campos obrigatórios."
          type="error"
        />
      )}
      <Message type="error" text={error} />
      <InsertHeader
        title="Inserir Imóvel"
        paths={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Imóveis", url: "/imoveis" },
          { name: "Inserir Imóvel", url: "/novo-imovel" },
        ]}
      />

      <h1 className="text-2xl text-center font-bold mb-6">
        CADASTRO DE IMÓVEL
      </h1>

      <StepProgress currentStep={currentStep} />

      <form onSubmit={handleSubmit}>
        <div className="mt-6">
          {currentStep === 0 && (
            <AddressOwnerForm
              formData={formData}
              handleChange={handleChange}
              onSelectLocation={(locationId) =>
                setFormData({ ...formData, localizacaoId: locationId })
              }
            />
          )}
          {currentStep === 1 && (
            <MainDetailsForm formData={formData} handleChange={handleChange} />
          )}
          {currentStep === 2 && (
            <NotesDescriptionForm
              formData={formData}
              handleChange={handleChange}
            />
          )}
          {currentStep === 3 && (
            <AdditionalDetailsForm
              formData={formData}
              handleChange={handleChange}
              onSelectOwner={(clientId) =>
                setFormData({ ...formData, proprietarioId: clientId })
              }
            />
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handlePrev}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
            disabled={currentStep === 0}
          >
            Voltar
          </button>
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Avançar
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
              Finalizar Cadastro
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default InsertProperty;
