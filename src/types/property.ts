export interface PropertyType {
  proprietarioid?: string;

  imovelid?: string;
  codigo?: number;

  finalidade?: string;
  destinacao?: string;
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

  valorAutorizacao?: number;
  tipoAutorizacao?: string;
  dataAutorizacao?: Date;

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
