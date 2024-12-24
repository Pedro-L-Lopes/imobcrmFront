import { api, requestConfig } from "../lib/config";
import { visitType } from "../types/visit";

// Inserir visita
const insertVisit = async (visit: visitType) => {
  const config = requestConfig("POST", visit);

  try {
    const res = await fetch(api + `visita`, config);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erro ao processar a requisição.");
    }
    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Erro inesperado");
  }
};

// Listagem de visitas
const getVisits = async (
  page: number,
  orderBy: string,
  sortDirection: string,
  situacao: string,
  dataInicio: string,
  dataFim: string,
  searchTerm: string
) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(
      api +
        `visita?PageNumber=${page}&PageSize=6&OrderBy=${orderBy}&SortDirection=${sortDirection}&situacao=${situacao}&dataInicio=${dataInicio}&dataFim=${dataFim}`,
      config
    );

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

const visitService = {
  insertVisit,
  getVisits,
};

export default visitService;
