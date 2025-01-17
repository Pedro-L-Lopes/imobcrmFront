import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  getRentPayments,
  updatePayments,
  reset,
} from "../../slices/rentPaymentSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { RootState } from "../../store";
import { formatDate } from "../../utils/formats";
import { FaChevronDown } from "react-icons/fa";
import DatePicker from "../utils/DatePicker";
import Message from "../utils/Message";
import CurrencyInput from "../utils/CurrencyInput";

interface PaymentEdit {
  valorPago: number;
  dataPagamento: Date | null;
  statusPagamento: string;
}

const RentControlPayments: React.FC<{ contractId: string }> = ({
  contractId,
}) => {
  const dispatch = useAppDispatch();
  const { rentPayments, loading, error, success, message } = useSelector(
    (state: RootState) => state.rentPayment
  );

  const [expandedPayments, setExpandedPayments] = useState<Set<number>>(
    new Set()
  );
  const [editPayments, setEditPayments] = useState<Record<number, PaymentEdit>>(
    {}
  );

  useEffect(() => {
    dispatch(getRentPayments(contractId));
  }, [dispatch, contractId]);

  useEffect(() => {
    if (success && message === "Pagamento atualizado") {
      dispatch(reset());
    }
  }, [success, message, dispatch]);

  const togglePaymentExpansion = useCallback((index: number) => {
    setExpandedPayments((prev) => {
      const updated = new Set(prev);
      updated.has(index) ? updated.delete(index) : updated.add(index);
      return updated;
    });
  }, []);

  const handleInputChange = useCallback(
    (index: number, field: keyof PaymentEdit, value: any) => {
      setEditPayments((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          [field]: value,
        },
      }));
    },
    []
  );

  const savePaymentChanges = useCallback(
    (index: number, paymentId: string) => {
      const updatedData = editPayments[index];
      if (updatedData) {
        dispatch(
          updatePayments({ ...updatedData, pagamentoAluguelId: paymentId })
        );
        setEditPayments((prev) => {
          const updated = { ...prev };
          delete updated[index];
          return updated;
        });
      }
    },
    [dispatch, editPayments]
  );

  if (loading) return <p>Carregando pagamentos...</p>;
  if (error) return <p>Erro ao carregar os períodos de pagamento.</p>;

  return (
    <div className="p-4">
      {success && <Message text={message} type="success" />}
      <div className="border-t border-gray-300 py-2">
        {rentPayments.map((payment, index) => {
          const {
            statusPagamento,
            dataVencimentoAluguel,
            periodoInicio,
            periodoFim,
            referenciaPagamento,
            pagamentoAluguelId,
          } = payment;
          const isExpanded = expandedPayments.has(index);

          return (
            <div
              key={`${payment.contratoId}-${index}`}
              className="border-b py-2"
            >
              <div className="flex items-center justify-between w-full p-1 gap-2">
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    statusPagamento === "Em dia"
                      ? "bg-green-100 text-green-600"
                      : statusPagamento === "Em atraso"
                      ? "bg-red-100 text-red-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {statusPagamento}
                </span>

                <div className="text-center flex flex-col items-center">
                  <span className="text-sm opacity-80">Vencimento</span>
                  <span>{formatDate(dataVencimentoAluguel!.toString())}</span>
                </div>

                <div className="text-center flex flex-col items-center">
                  <span className="text-sm">Período</span>
                  <span className="text-sm">
                    {formatDate(periodoInicio!.toString())} a{" "}
                    {formatDate(periodoFim!.toString())}
                  </span>
                </div>

                <div className="text-center flex flex-col items-center">
                  <span className="text-sm opacity-80">Referência</span>
                  <span>{referenciaPagamento}</span>
                </div>

                <button
                  className="text-blue-500 text-sm hover:underline"
                  onClick={() => togglePaymentExpansion(index)}
                >
                  <FaChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {isExpanded && (
                <div className="p-2 bg-gray-50 rounded shadow">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Status
                      </label>
                      <select
                        className="w-full p-2 border rounded"
                        value={
                          editPayments[index]?.statusPagamento ??
                          statusPagamento
                        }
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "statusPagamento",
                            e.target.value
                          )
                        }
                      >
                        <option value="Em dia">Em dia</option>
                        <option value="Em atraso">Em atraso</option>
                        <option value="Pendente">Pendente</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium">
                        Valor Pago
                      </label>
                      <CurrencyInput
                        value={
                          editPayments[index]?.valorPago ??
                          payment.valorPago ??
                          0
                        }
                        fieldName="valorPago"
                        className="w-full p-2 border rounded"
                        onChange={(fieldName, value) =>
                          handleInputChange(
                            index,
                            fieldName as keyof PaymentEdit,
                            value
                          )
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">
                        Data Pagamento
                      </label>
                      <DatePicker
                        value={
                          editPayments[index]?.dataPagamento ??
                          new Date(payment.dataPagamento || new Date())
                        }
                        onChange={(newValue) =>
                          handleInputChange(index, "dataPagamento", newValue)
                        }
                        title="Selecione a data"
                      />
                    </div>

                    <button
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() =>
                        savePaymentChanges(index, pagamentoAluguelId!)
                      }
                    >
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RentControlPayments;
