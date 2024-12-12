import { api, requestConfig } from "../lib/config";
import { ClientType } from "../types/client";

// Inserir cliente
const insertClient = async (client: ClientType) => {
  const config = requestConfig("POST", client);

  try {
    const res = await fetch(api + `cliente`, config);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erro ao processar a requisição.");
    }
    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Erro inesperado");
  }
};

// Listagem de clientes
const getClients = async (
  page: number,
  orderBy: string,
  sortDirection: string,
  searchTerm: string
) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(
      api +
        `Cliente?PageNumber=${page}&PageSize=20&OrderBy=${orderBy}&SortDirection=${sortDirection}&searchTerm=${searchTerm}`,
      config
    );

    // Verifica se a resposta foi bem-sucedida
    if (!res.ok) {
      const errorData = await res.json();
      throw {
        status: res.status,
        message: errorData?.message || "Erro na API.",
      };
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    return {
      error: true,
      status: error?.status || 500,
      message: error?.message || "Erro desconhecido.",
    };
  }
};

// Listar clientes por nome e cpf/cnpj
const getClientsByNameAndDocument = async (term: string) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(api + `cliente/search?term=${term}`, config);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erro ao processar a requisição.");
    }
    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Erro inesperado");
  }
};

const clientService = {
  getClients,
  insertClient,
  getClientsByNameAndDocument,
};

export default clientService;
