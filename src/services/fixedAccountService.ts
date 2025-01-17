import { api, requestConfig } from "../lib/config";
import { FixedAccountType } from "../@types/fixedAccount";

const insertFixedAccount = async (client: FixedAccountType) => {
  const config = requestConfig("POST", client);

  try {
    const res = await fetch(api + `contaFixa`, config);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erro ao processar a requisição.");
    }
    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Erro inesperado");
  }
};

const getFixedAccountByPropertyId = async (propertyId: string) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(api + `contaFixa?propertyId=${propertyId}`, config);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erro ao processar a requisição.");
    }
    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Erro inesperado");
  }
};

const FixedAccountService = {
  insertFixedAccount,
  getFixedAccountByPropertyId,
};

export default FixedAccountService;
