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

const InsertProperty: React.FC = () => {
  const dispatch = useAppDispatch();

  const { success } = useSelector((state: any) => state.property);

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

    valorAutorizacao: 0,
    tipoAutorizacao: "",
    dataAutorizacao: null,

    localizacaoId: 0,
  });

  // Validação de campos obrigatórios
  const validateStep = () => {
    const validations: Record<number, boolean> = {
      0: !!formData.localizacaoId,
      1:
        !!formData.finalidade &&
        !!formData.tipoImovel &&
        !!formData.destinacao &&
        !!formData.situacao,
      2: !!formData.proprietarioId,
    };

    return validations[currentStep] ?? true;
  };

  console.log(formData.localizacaoId);

  const handleNext = () => {
    if (!validateStep()) {
      alert("Por favor, preencha todos os campos obrigatórios.");
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep()) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    dispatch(insertProperty(formData));

    if (success) {
      alert("Imóvel cadastrado com sucesso!");
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
      setCurrentStep(0);
    }
  };

  return (
    <div className="max-w-full mx-auto mt-10 p-6 bg-white rounded shadow">
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
            <AdditionalDetailsForm
              formData={formData}
              handleChange={handleChange}
              onSelectOwner={(clientId) =>
                setFormData({ ...formData, proprietarioId: clientId })
              }
            />
          )}
          {currentStep === 3 && (
            <NotesDescriptionForm
              formData={formData}
              handleChange={handleChange}
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
