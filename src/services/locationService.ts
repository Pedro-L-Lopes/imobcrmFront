import { api, requestConfig } from "../lib/config";
import { LocationType } from "../types/location";

// Inserir localização
const insertLocation = async (location: LocationType) => {
  const config = requestConfig("POST", location);

  try {
    const res = await fetch(api + `localizacao`, config);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erro ao processar a requisição.");
    }
    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Erro inesperado");
  }
};

// Buscar localizações com uma termo
const getLocationsByOneTerm = async (searchTerm: string) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(
      api + `localizacao/search1?term=${searchTerm}`,
      config
    ).then((res) => res.json().catch((err) => err));
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Buscar localizações
const getLocations = async (searchTerm1: string, searchTerm2: string) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(
      api + `localizacao/search2?term=${searchTerm1}-${searchTerm2}`,
      config
    ).then((res) => res.json().catch((err) => err));
    return res;
  } catch (error) {
    console.log(error);
  }
};

const locationService = {
  insertLocation,
  getLocations,
  getLocationsByOneTerm,
};

export default locationService;
