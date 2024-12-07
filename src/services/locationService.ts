import { api, requestConfig } from "../lib/config";
import { LocationType } from "../types/location";

// Buscar localizações
const getLocations = async (searchTerm1: string, searchTerm2: string) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(
      api + `localizacao/search?term=${searchTerm1}-${searchTerm2}`,
      config
    ).then((res) => res.json().catch((err) => err));
    return res;
  } catch (error) {
    console.log(error);
  }
};

const locationService = {
  getLocations,
};

export default locationService;
