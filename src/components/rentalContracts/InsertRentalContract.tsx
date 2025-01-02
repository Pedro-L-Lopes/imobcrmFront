import { useEffect, useState } from "react";
import StepProgress from "../utils/StepProgress";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import InsertHeader from "../InsertHeader";
import Message from "../utils/Message";
import { useNavigate } from "react-router-dom";
import PropertyForm from "./forms/PropertyForm";
import { insertRentalContract } from "../../slices/rentalContractSlice";
import Tenant from "./forms/TenantForm";
import MainData from "./forms/MainDataForm";
import TaxesForm from "./forms/TaxesForm";
import GeneralNotesForm from "./forms/GeneralNotesForm";
import { CiCircleAlert } from "react-icons/ci";
import { changeStatus } from "../../slices/propertySlice";

const InsertRentalContract = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, success } = useSelector((state: any) => state.rentalContract);

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  const [formData, setFormData] = useState({
    imovelId: "",
    locadorId: "",
    locatarioId: "",
    valorContrato: 0,
    valorCondominio: 0,
    inicioContrato: new Date(),
    fimContrato: new Date(),
    vencimentoAluguel: 0,
    tempoContrato: 0,
    primeiroAluguel: new Date(),
    destinacaoContrato: "",
    statusContrato: "",
    locatarioSolidario: false,
    locatarioSolidarioId: "",
    taxaAdm: 0,
    taxaIntermediacao: 0,
    rescisao: "",
    semMultaApos: "",
    anotacoesGerais: "",
  });

  const validateStep = () => {
    const validations: Record<number, boolean> = {
      0: !!formData.imovelId,
      1: !!formData.locatarioId,
      2:
        !!formData.valorContrato &&
        !!formData.vencimentoAluguel &&
        !!formData.tempoContrato &&
        !!formData.destinacaoContrato &&
        !!formData.statusContrato,
    };
    return validations[currentStep] ?? true;
  };

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" && e.target instanceof HTMLInputElement
          ? e.target.checked
          : name === "locatarioSolidario"
          ? value === "true"
          : [
              "valorContrato",
              "valorCondominio",
              "taxaAdm",
              "taxaIntermediacao",
              "vencimentoAluguel",
              "tempoContrato",
            ].includes(name)
          ? Number(value)
          : value,
    }));
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

  useEffect(() => {
    if (currentStep == 4) {
      setTimeout(() => {
        setIsReadyToSubmit(true);
      }, 500);
    } else {
      setIsReadyToSubmit(false);
    }
  }, [currentStep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.imovelId && formData.locatarioId) {
      try {
        // Desempacota o ID retornado
        const contractId = await dispatch(
          insertRentalContract(formData)
        ).unwrap();

        // Atualiza o status do imóvel para "Alugado" após o contrato ser inserido
        dispatch(
          changeStatus({
            propertyId: formData.imovelId.toString(),
            status: "Alugado",
          })
        );

        setShowSuccess(true);

        setTimeout(() => {
          navigate(`/contrato-aluguel/detalhes/${contractId}`);
          setShowSuccess(false);
        }, 1000);
      } catch (error) {
        console.error("Erro ao inserir contrato:", error);
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start mt-4 p-4">
      {showError && (
        <Message text="Preencha todos os campos obrigatórios." type="error" />
      )}
      {showSuccess && (
        <Message
          text="Status do imóvel alterado para alugado!"
          type="success"
        />
      )}
      <Message type="error" text={error} />
      <InsertHeader
        title="Inserir Contrato de Aluguel"
        paths={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Contratos", url: "/contratos" },
          {
            name: "Inserir Contrato de Aluguel",
            url: "/novo-contrato-aluguel",
          },
        ]}
      />

      <h1 className="text-2xl text-center font-bold mb-6">
        CADASTRO CONTRATO DE ALUGUEL
      </h1>

      <StepProgress stepType="rentalContractType" currentStep={currentStep} />

      <h3 className="text-sm mt-2 flex items-center gap-2 text-red-500">
        Campos obrigatórios <CiCircleAlert />
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mt-1">
          {currentStep === 0 && (
            <PropertyForm
              formData={formData}
              handleChange={(field, value) => {
                setFormData((prev) => ({ ...prev, [field]: value }));
              }}
            />
          )}
          {currentStep === 1 && (
            <Tenant
              formData={formData}
              handleChange={(field, value) => {
                setFormData((prev) => ({ ...prev, [field]: value }));
              }}
            />
          )}
          {currentStep === 2 && (
            <MainData formData={formData} handleChange={handleChange} />
          )}
          {currentStep === 3 && (
            <TaxesForm formData={formData} handleChange={handleChange} />
          )}
          {currentStep === 4 && (
            <GeneralNotesForm formData={formData} handleChange={handleChange} />
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
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Avançar
            </button>
          ) : isReadyToSubmit ? (
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
              Finalizar Cadastro
            </button>
          ) : (
            <button
              type="submit"
              disabled
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Aguarde...
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default InsertRentalContract;
