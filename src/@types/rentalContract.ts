export type RentalContractType = {
  contratoId?: string;
  imovelId?: string;
  codigo?: number;

  locadorId?: string;
  locadorNome?: string;
  codigoLocador?: string;

  locatarioId?: string;
  locatarioNome?: string;
  codigoLocatario?: string;

  valorContrato?: number;
  valorCondominio?: number;

  inicioContrato?: Date;
  fimContrato?: Date;

  vencimentoAluguel?: number;
  primeiroAluguel?: Date;

  statusContrato?: string;
  ultimaRenovacao?: string;

  tempoContrato?: number;
  ultimaEdicao?: string;
  dataCriacao?: string;

  destinacaoContrato?: string;

  taxaAdm?: number;
  taxaIntermediacao?: number;

  rescisao?: string;
  semMultaApos?: string;

  anotacoesGerais?: string;

  locatarioSolidario?: boolean;
  locatarioSolidarioId?: string;

  // Endereço
  rua?: string;
  numero?: string;
  cep?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  codigoImovel?: number;
  tipoImovel?: string;
};
