import React from "react";

type VisitCardProps = {
  situacao: string;
  clienteId: string;
  imovelId: string;
  dataHora: Date;
  observacao: string;
};

const VisitCard = ({
  situacao,
  clienteId,
  imovelId,
  dataHora,
  observacao,
}: VisitCardProps) => {
  const formatDateTime = (date: Date) => {
    return `${date.toLocaleDateString()} às ${date.toLocaleTimeString()}`;
  };

  const reportText = `
Relatório da Visita:
- Situação: ${situacao}
- Cliente (ID): ${clienteId}
- Imóvel (ID): ${imovelId}
- Data e Hora: ${formatDateTime(dataHora)}
- Observação: ${observacao}
  `.trim();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reportText).then(() => {
      alert("Relatório copiado para a área de transferência!");
    });
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h3 className="text-lg font-semibold">Detalhes da Visita</h3>
      <div className="mt-2 space-y-2">
        <p>
          <strong>Situação:</strong> {situacao}
        </p>
        <p>
          <strong>Cliente (ID):</strong> {clienteId}
        </p>
        <p>
          <strong>Imóvel (ID):</strong> {imovelId}
        </p>
        <p>
          <strong>Data e Hora:</strong> {formatDateTime(dataHora)}
        </p>
        <p>
          <strong>Observação:</strong> {observacao}
        </p>
      </div>
      <button
        onClick={copyToClipboard}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Copiar Relatório
      </button>
    </div>
  );
};

export default VisitCard;
