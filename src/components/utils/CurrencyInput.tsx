import React, { useState } from "react";

// Função utilitária para formatar o valor em formato monetário
const formatCurrency = (value: number | string) => {
  if (!value) return "";
  const numberValue = Number(value);
  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

// Função para desformatar a string do input para um número puro
const parseCurrency = (value: string) => {
  const cleanValue = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  return Number(cleanValue) / 100; // Divide por 100 para adicionar as casas decimais
};

interface CurrencyInputProps {
  value: number | string;
  fieldName: string;
  className: string;
  onChange: (fieldName: string, value: number) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  fieldName,
  className,
  onChange,
}) => {
  const [formattedValue, setFormattedValue] = useState(formatCurrency(value));

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = parseCurrency(value);
    setFormattedValue(formatCurrency(numericValue));

    // Atualiza o valor numérico no estado pai
    onChange(fieldName, numericValue);
  };

  return (
    <input
      type="text"
      value={formattedValue}
      onChange={handleCurrencyChange}
      placeholder="R$ 0,00"
      className={className}
    />
  );
};

export default CurrencyInput;
