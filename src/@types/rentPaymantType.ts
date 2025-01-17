export interface RentPaymentType {
  pagamentoAluguelId?: string;
  codigo?: number;
  contratoId?: string;
  periodoInicio?: Date | null;
  periodoFim?: Date | null;
  valorPago?: number;
  referenciaPagamento?: string;
  statusPagamento?: string;
  dataVencimentoAluguel?: Date | null;
  dataPagamento?: Date | null;
  ultimaEdicao?: Date | null;
}
