import { rentControlType } from "../@types/rentControlType";
import { api, requestConfig } from "../lib/config";

const getRentControl = async (
  page: number,
  orderBy: string,
  sortDirection: string
) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(
      api +
        `ControleAluguel?PageNumber=${page}&PageSize=20&OrderBy=${orderBy}&SortDirection=${sortDirection}`,
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

const rentControlService = {
  getRentControl,
};

export default rentControlService;
