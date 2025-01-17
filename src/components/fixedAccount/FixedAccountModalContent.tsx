import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFixedAccountByPropertyId } from "../../slices/fixedAccountSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { RootState } from "../../store";
import { FixedAccountType } from "../../@types/fixedAccount";
import { FaChevronDown } from "react-icons/fa";

const FixedAccountModalContent: React.FC<{ propertyId: string }> = ({
  propertyId,
}) => {
  const dispatch = useAppDispatch();
  const { fixedAccounts, loading, error } = useSelector(
    (state: RootState) => state.fixedAccount
  );

  const [expandedAccounts, setExpandedAccounts] = useState<string[]>([]);
  const [editAccounts, setEditAccounts] = useState<FixedAccountType[]>([]);

  useEffect(() => {
    dispatch(getFixedAccountByPropertyId(propertyId));
  }, [dispatch, propertyId]);

  useEffect(() => {
    if (fixedAccounts.length > 0) {
      setEditAccounts(fixedAccounts);
    }
  }, [fixedAccounts]);

  const toggleAccountExpansion = (id: string) => {
    setExpandedAccounts((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleInputChange = (
    id: string,
    field: keyof FixedAccountType,
    value: string | number | Date | null
  ) => {
    setEditAccounts((prev) =>
      prev.map((account) =>
        account.contaFixaId === id ? { ...account, [field]: value } : account
      )
    );
  };

  if (loading) return <p>Carregando contas fixas...</p>;
  if (error) return <p>Erro ao carregar contas fixas.</p>;

  return (
    <div className="p-4">
      <div className="border-t border-gray-300 py-2">
        {editAccounts.map((account) => {
          const isExpanded = expandedAccounts.includes(account.contaFixaId!);

          return (
            <div key={account.contaFixaId} className="border-b py-2">
              <div className="flex items-center justify-between w-full p-1 gap-2">
                <div className="grid grid-cols-1 md:grid-cols-4 items-center justify-between w-full gap-5">
                  <span
                    className={`px-2 py-1 text-sm rounded text-center ${
                      account.status === "Em dia"
                        ? "bg-green-100 text-green-600"
                        : account.status === "Em atraso"
                        ? "bg-red-100 text-red-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {account.status}
                  </span>
                  <span className="">{account.tipoConta}</span>

                  <span>{account.codigoConsulta}</span>
                </div>
                <button
                  className="flex items-center text-blue-500 text-sm hover:underline"
                  onClick={() => toggleAccountExpansion(account.contaFixaId!)}
                >
                  <FaChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              <div
                className={`transition-[max-height] duration-300 ease-in-out overflow-hidden bg-gray-50 rounded shadow ${
                  isExpanded ? "max-h-[500px] p-4" : "max-h-0 p-0"
                }`}
              >
                {isExpanded && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">
                          Código Consulta
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={account.codigoConsulta || ""}
                          onChange={(e) =>
                            handleInputChange(
                              account.contaFixaId!,
                              "codigoConsulta",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">
                          Status
                        </label>
                        <select
                          className="w-full p-2 border rounded"
                          value={account.status || ""}
                          onChange={(e) =>
                            handleInputChange(
                              account.contaFixaId!,
                              "status",
                              e.target.value
                            )
                          }
                        >
                          <option value="Em dia">Em dia</option>
                          <option value="Em atraso">Em atraso</option>
                          <option value="Pendente">Pendente</option>
                          <option value="Pago parcialmente">
                            Pago parcialmente
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full text-end mt-4">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        // onClick={() =>
                        //   savePaymentChanges(index, payment.pagamentoAluguelId)
                        // }
                      >
                        Salvar Alterações
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FixedAccountModalContent;
