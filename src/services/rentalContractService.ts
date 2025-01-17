import { api, requestConfig } from "../lib/config";
import { RentalContractType } from "../@types/rentalContract";
import dayjs from "dayjs";

// Inserir contrato
const insertRentalContract = async (contract: RentalContractType) => {
  // Formatar as datas antes de enviar
  const formattedContract = {
    ...contract,
    inicioContrato: dayjs(contract.inicioContrato).toISOString(),
    fimContrato: dayjs(contract.fimContrato).toISOString(),
    primeiroAluguel: dayjs(contract.primeiroAluguel).toISOString(),
  };

  const config = requestConfig("POST", formattedContract);

  try {
    const res = await fetch(api + `contratoAluguel`, config);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erro ao processar a requisição.");
    }
    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Erro inesperado");
  }
};

// Listagem de contratos
const getRentalContracts = async (
  page: number,
  orderBy: string,
  sortDirection: string,
  status: string,
  startDate: string,
  endDate: string,
  searchTerm: string
) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(
      api +
        `contratoAluguel?PageNumber=${page}&PageSize=15&OrderBy=${orderBy}&SortDirection=${sortDirection}&StatusContrato=${status}&InicioContrato=${startDate}&FimContrato=${endDate}`,
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

const getRentalContractDetails = async (id: string) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(api + `contratoAluguel/${id}`, config);

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

const rentalContractService = {
  insertRentalContract,
  getRentalContracts,
  getRentalContractDetails,
};

export default rentalContractService;
