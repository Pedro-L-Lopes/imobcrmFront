import { api, requestConfig } from "../lib/config";
import { LocationType } from "../types/location";

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
  getLocations,
  getLocationsByOneTerm,
};

export default locationService;
