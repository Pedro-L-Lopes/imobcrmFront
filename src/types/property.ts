export interface PropertyType {
  imovelId?: string;
  codigo?: number;

  proprietarioId?: string;

  destinacao?: string;
  finalidade?: string;
  tipoImovel?: string;
  situacao?: string;
  valor?: number;
  siteCod?: string;

  valorCondominio?: number;
  area?: number;

  observacoes?: string;
  descricao?: string;

  quartos?: number;
  suites?: number;
  banheiros?: number;
  salasEstar?: number;
  salasJantar?: number;
  varanda?: number;
  garagem?: number;

  avaliacao?: boolean;
  avaliacaoValor?: number;
  dataAvaliacao?: Date | null;

  comPlaca?: Boolean;

  valorAutorizacao?: number;
  tipoAutorizacao?: string;
  dataAutorizacao?: Date | null;

  rua?: string;
  numero?: string;
  cep?: string;

  dataCriacao?: Date;

  localizacaoId?: number;

  bairro?: string;
  cidade?: string;
  estado?: string;

  proprietarioNome?: string;

  ultimaEdicao?: Date;
}
