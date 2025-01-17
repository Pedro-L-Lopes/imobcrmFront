export interface rentControlType {
  contratoAluguelId: string;

  imovelId: string;
  codigoImovel: number;
  enderecoImovel: string;

  codigoLocador: number;
  nomeLocador: string;

  codigoLocatario: number;
  nomeLocatario: string;

  statusPagamento: string;
  periodo: string;
  diaVencimento: number;
  valorAluguel: number;

  codigoLuz?: number;
  codigoConsultaLuz?: string;
  statusLuz?: string;

  codigoAgua?: number;
  codigoConsultaAgua?: string;
  statusAgua?: string;

  codigoIptu?: number;
  codigoConsultaIptu?: string;
  statusIptu?: string;

  codigoCondominio?: number;
  statusCondominio?: string;
}
