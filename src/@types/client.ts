export interface ClientType {
  clienteId?: string;
  codigo?: number;
  tipoCliente: string;
  nome: string;
  email?: string;
  telefone?: string;
  cpfCnpj: string;
  sexo?: string;
  dataNascimento?: string | null;
}
