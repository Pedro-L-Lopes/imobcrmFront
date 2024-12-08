import { api, requestConfig } from "../lib/config";
//import { PropertyType } from "../types/property";

// Listagem de imóveis
const getPropertys = async (
  page: number,
  purpose: string,
  typeProperty: string,
  situation: string,
  avaliation: string,
  withPlate: string,
  autorizationType: string,
  orderBy: string,
  sortDirection: string,
  searchTerm: string
) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(
      api +
        `imovel?PageNumber=${page}&PageSize=15&Finalidade=${purpose}&TipoImovel=${typeProperty}&Situacao=${situation}&avaliacao=${avaliation}&ComPlaca=${withPlate}&TipoAutorizacao=${autorizationType}&OrderBy=${orderBy}&SortDirection=${sortDirection}`,
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

const propertyService = {
  getPropertys,
};

export default propertyService;
