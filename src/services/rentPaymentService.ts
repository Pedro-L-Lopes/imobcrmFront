import { RentPaymentType } from "../@types/rentPaymantType";
import { api, requestConfig } from "../lib/config";

const generatePayments = async (contractId: string) => {
  const config = requestConfig("POST", null);

  try {
    const res = await fetch(
      api + `pagamentoAluguel/gerar?contractId=${contractId}&extraMonths=0`,
      config
    );
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erro ao processar a requisição.");
    }
    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Erro inesperado");
  }
};

const getRentPayments = async (contractId: string) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(
      api + `pagamentoAluguel?contractId=${contractId}`,
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

const updatePayments = async (data: RentPaymentType) => {
  const config = requestConfig("PATCH", data);

  try {
    const res = await fetch(api + `pagamentoAluguel/atualizar`, config);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erro ao processar a requisição.");
    }
    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Erro inesperado");
  }
};

const rentPaymenService = {
  generatePayments,
  getRentPayments,
  updatePayments,
};

export default rentPaymenService;
