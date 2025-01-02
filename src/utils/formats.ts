export const formatCurrency = (value: number | string) => {
  if (!value) return "";
  const numberValue = Number(value);
  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatCpfCnpj = (value: string): string => {
  // Verifica se é CPF (11 dígitos) ou CNPJ (14 dígitos)
  if (value.length === 11) {
    // Formata CPF: 123.456.789-00
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (value.length === 14) {
    // Formata CNPJ: 12.345.678/0001-00
    return value.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }

  // Retorna o valor original se não for CPF ou CNPJ
  return value;
};
