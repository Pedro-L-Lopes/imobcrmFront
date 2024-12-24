import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { GiPaperClip } from "react-icons/gi";

interface ReportProps {
  destinacao: string;
  nome: string;
  cpf: string;
  telefone: string;
  procedimento: string;
  endereco: string;
  data: string;
  horario: string;
}

const Report = ({
  destinacao,
  nome,
  cpf,
  telefone,
  procedimento,
  endereco,
  data,
  horario,
}: ReportProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const reportTextLines = [
    "ℹ️ INFORMAÇÕES NECESSÁRIAS PARA ABRIR ATENDIMENTO",
    "",
    `📋 Procedimento: Visita para possível ${procedimento.toUpperCase()}`,
    "",
    `🙍 Nome Completo: ${nome}`,
    `🆔 CPF: ${cpf}`,
    `📞 Telefone: ${telefone}`,
    "",
    `🏠 Imóvel: ${destinacao}`,
    `📍 Endereço: ${endereco}`,
    `📅 Data: ${data}`,
    `⏰ Horário: ${horario}`,
  ];

  const reportText = reportTextLines.join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex items-center justify-end w-15 text-blue-500 rounded-md hover:text-blue-600">
          <GiPaperClip size={30} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-md w-11/12 max-w-lg">
          <Dialog.Title className="text-lg font-bold text-gray-800 mb-4">
            Relatório
          </Dialog.Title>
          <pre className="bg-gray-100 p-4 rounded-md text-sm whitespace-pre-wrap">
            {reportText}
          </pre>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handleCopy}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              <FiCopy className="mr-2" />
              {isCopied ? "Copiado!" : "Copiar"}
            </button>
            <Dialog.Close asChild>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
                Fechar
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Report;
