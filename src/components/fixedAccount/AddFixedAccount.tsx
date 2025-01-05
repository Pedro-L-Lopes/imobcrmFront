import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { insertFixedAccount, reset } from "../../slices/fixedAccountSlice";
import { useSelector } from "react-redux";
import Message from "../utils/Message";
import { BsPlus, BsX } from "react-icons/bs";

const AddFixedAccount = ({ imovelId }: any) => {
  const dispatch = useAppDispatch();
  const { success, error, message } = useSelector(
    (state: any) => state.fixedAccount
  );

  const [open, setOpen] = useState(false);

  const [tipoConta, setTipoConta] = useState("");
  const [codigoConsulta, setCodigoConsulta] = useState("");
  const [status, setStatus] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(imovelId);
    const newAccount = {
      tipoConta,
      codigoConsulta,
      status,
      descricao,
      ultimaEdicao: null,
      dataCriacao: new Date(),
      imovelId,
    };

    dispatch(insertFixedAccount(newAccount));
  };

  useEffect(() => {
    setTipoConta("");
    setCodigoConsulta("");
    setStatus("");
    setDescricao("");

    setOpen(false);
  }, [success]);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        <BsPlus size={25} /> Adicionar Conta Fixa
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0" />
        <Dialog.Content className="bg-white rounded-md shadow-lg p-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Adicionar Conta Fixa
          </Dialog.Title>

          {error && <Message text={message} type="error" />}
          {success && <Message text={message} type="success" />}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo de Conta
              </label>
              <select
                value={tipoConta}
                onChange={(e) => setTipoConta(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                required
              >
                <option value="" disabled>
                  Selecione o tipo de conta
                </option>

                <option value="Água">Água</option>
                <option value="Energia">Energia</option>
                <option value="IPTU">IPTU</option>
                <option value="Gás">Gás</option>
                <option value="Internet">Internet</option>
                <option value="Condomínio">Condomínio</option>
                <option value="Seguro">Seguro</option>
                <option value="Taxas administrativas">
                  Taxas administrativas
                </option>
                <option value="Outros I">Outros I</option>
                <option value="Outros II">Outros II</option>
                <option value="Outros III">Outros III</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Código de Consulta
              </label>
              <input
                type="text"
                value={codigoConsulta}
                onChange={(e) => setCodigoConsulta(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Ex: Código de referência"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                required
              >
                <option value="" disabled>
                  Selecione o status
                </option>
                <option value="Em dia">Em dia</option>
                <option value="Em atraso">Em atraso</option>
                <option value="Pendente">Pendente</option>
                <option value="Pago parcialmente">Pago parcialmente</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                rows={3}
                placeholder="Descrição da conta"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Adicionar
            </button>
          </form>

          <Dialog.Close asChild>
            <button className="absolute top-6 right-2 text-gray-500 hover:text-gray-700">
              <BsX size={30} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddFixedAccount;
