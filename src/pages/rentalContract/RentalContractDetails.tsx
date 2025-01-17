import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getRentalContractDetails } from "../../slices/rentalContractSlice";
import { getRentPayments } from "../../slices/rentPaymentSlice";
import Message from "../../components/utils/Message";
import InsertHeader from "../../components/InsertHeader";
import RentalContractDetailForm from "../../components/rentalContracts/RentalContractDetailForm";
import RentPaymentList from "../../components/rentalPayments/RentPaymentList";

const RentalContractDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { rentalContract, error, loading, message } = useSelector(
    (state: any) => state.rentalContract
  );

  const { rentPayments } = useSelector((state: any) => state.rentPayment);

  const [step, setStep] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(getRentalContractDetails(id));
      dispatch(getRentPayments(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        Carregando detalhes do contrato...
      </div>
    );
  }

  if (!rentalContract) {
    return (
      <div className="text-center text-red-500 mt-10">
        Contrato não encontrado.
      </div>
    );
  }

  return (
    <main className="p-6 min-h-screen w-full">
      <InsertHeader
        title={`Detalhes do contrato ${rentalContract.codigo}`}
        paths={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Contratos", url: "/contratos" },
          {
            name: `Detalhes contrato aluguel ${rentalContract.codigo}`,
            url: `/contrato-aluguel/detalhes/${rentalContract.contratoId}`,
          },
        ]}
      />

      <div className="flex gap-2 justify-end mb-1">
        <button
          className={`border border-gray-300 rounded p-2 ${
            step === 0 ? "bg-gray-200" : ""
          }`}
          onClick={() => setStep(0)}
        >
          Detalhes contrato
        </button>
        <button
          className={`border border-gray-300 rounded p-2 ${
            step === 1 ? "bg-gray-200" : ""
          }`}
          onClick={() => setStep(1)}
        >
          Alugueis
        </button>
      </div>

      {error && <Message text={message} type="error" />}
      {step === 0 && (
        <RentalContractDetailForm rentalContract={rentalContract} />
      )}
      {step === 1 && <RentPaymentList rentPayments={rentPayments} />}
    </main>
  );
};

export default RentalContractDetail;
