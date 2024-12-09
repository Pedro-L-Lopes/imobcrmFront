export const ordinations = [
  {
    name: "ultimaedicao",
    label: "Ultima Edição",
  },
  {
    name: "valor",
    label: "Valor",
  },
  {
    name: "area",
    label: "Área",
  },
  {
    name: "bairro",
    label: "Bairro",
  },
  {
    name: "codigo",
    label: "Código",
  },
];

export const filterOptions = [
  {
    name: "purpose",
    label: "Finalidade",
    options: [
      { value: "venda", label: "Venda" },
      { value: "aluguel", label: "Aluguel" },
    ],
  },
  {
    name: "typeProperty",
    label: "Tipo",
    options: [
      { value: "apartamento", label: "Apartamento" },
      { value: "casa", label: "Casa" },
      { value: "comercial", label: "Comercial" },
      { value: "terreno", label: "Terreno" },
    ],
  },
  {
    name: "situation",
    label: "Situação",
    options: [
      { value: "disponivel", label: "Disponível" },
      { value: "moderacao", label: "Moderação" },
      { value: "alugado", label: "Alugado" },
      { value: "alugado/disponivelvenda", label: "Alugado/Disponível Venda" },
      { value: "vendido", label: "Vendido" },
    ],
  },
  {
    name: "avaliation",
    label: "Avaliação",
    options: [
      { value: "true", label: "Com Avaliação" },
      { value: "false", label: "Sem Avaliação" },
    ],
  },
  {
    name: "withPlate",
    label: "Placa/Adesivo",
    options: [
      { value: "true", label: "Com Placa/adesivo" },
      { value: "false", label: "Sem Placa/adesivo" },
    ],
  },
  {
    name: "autorizationType",
    label: "Autorização",
    options: [
      { value: "com exclusividade", label: "Com Exclusividade" },
      { value: "sem exclusividade", label: "Sem Exclusividade" },
      { value: "sem autorizacao", label: "Sem Autorização" },
    ],
  },
];
