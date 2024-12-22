export interface visitType {
  visitaId?: string;
  codigo?: number;
  situacao: string;
  clienteNome?: string;
  clienteId: string;
  clienteDocumento?: string;
  clienteEmail?: string;
  clienteTelefone?: string;
  imovelId?: string;
  observacao?: string;
  dataHora?: Date;
  ultimaEdicao?: Date;
  cep?: string;
  rua?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  finalidadeVisita?: string;
  valorImovel?: number;
}
