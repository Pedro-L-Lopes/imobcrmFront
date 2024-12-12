import React, { useEffect, useState } from "react";
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

  const { error, success, message } = useSelector(
    (state: any) => state.property
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PropertyType>({
    proprietarioId: "",
    rua: "",
    numero: "",
    finalidade: "",
    tipoImovel: "",
    valor: 0,
    quartos: 0,
    banheiros: 0,
    garagem: 0,
    area: 100,
    observacoes: "",
    descricao: "",
    localizacaoId: 0,
  });

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

    dispatch(insertProperty(formData));

    if (!formData.localizacaoId) {
      alert("Por favor, selecione uma localização válida.");
      return;
    }
    if (!formData.proprietarioId) {
      alert("Por favor, selecione um proprietário válido.");
      return;
    }

    if (success) {
      alert("Imóvel cadastrado com sucesso!");
      setFormData({
        proprietarioId: "",
        finalidade: "",
        tipoImovel: "",
        destinacao: "",
        descricao: "",
        situacao: "",
        rua: "",
        observacoes: "",
        numero: "",
        valor: 0,
        localizacaoId: 0,
      });
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  useEffect(() => {
    console.log(formData.localizacaoId);
    console.log(formData.proprietarioId);
  }, [formData.localizacaoId, formData.proprietarioId]);

  return (
    <div className="max-w-full mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl text-center font-bold mb-6">
        CADASTRO DE IMÓVEL
      </h1>

      {/* Componente de progresso */}
      <StepProgress currentStep={currentStep} />

      <form onSubmit={handleSubmit}>
        {/* Renderiza os formulários com base na etapa */}
        <div className="mt-6">
          {currentStep === 0 && (
            <AddressOwnerForm
              formData={formData}
              handleChange={handleChange}
              onSelectLocation={(locationIdId) =>
                setFormData({ ...formData, localizacaoId: locationIdId })
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

        {/* Navegação entre etapas */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
            disabled={currentStep === 0}
          >
            Voltar
          </button>
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
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
