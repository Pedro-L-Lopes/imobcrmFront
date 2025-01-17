export interface FixedAccountType {
  contaFixaId?: string;

  tipoConta?: string;
  codigo?: number;
  codigoConsulta?: string;
  status?: string;
  descricao?: string;

  ultimaEdicao?: Date | null;
  dataCriacao?: Date | null;

  imovelId?: string;
}
