import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { RootState, AppDispatch } from "../store";
import { getLocations, reset } from "../slices/locationSlice";
import SearchLocation from "../components/location/SearchLocation";
import LocationList from "../components/location/LocationsList";
import LocationSearch from "../components/location/LocationSearch";

function Location() {
  const dispatch = useDispatch<AppDispatch>();

  const [term1, setTerm1] = useState("");
  const [term2, setTerm2] = useState("");

  const { locations, loading, error, message } = useSelector(
    (state: RootState) => state.location
  );

  // Atualiza a lista de localizações com debounce
  const debouncedSearch = useCallback(
    debounce((searchTerm1: any, searchTerm2: any) => {
      dispatch(getLocations({ searchTerm1, searchTerm2 }));
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(term1, term2);
    return debouncedSearch.cancel;
  }, [term1, term2, debouncedSearch]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start mt-8">
      <header className="text-3xl font-bold text-gray-800 ml-4 mt-2">
        Listagem de Localizações
      </header>

      <div className="mt-8">
        <SearchLocation
          term1={term1}
          setTerm1={setTerm1}
          term2={term2}
          setTerm2={setTerm2}
        />
        <LocationList
          locations={locations}
          loading={loading}
          error={error}
          message={message}
        />
      </div>
    </div>
  );
}

export default Location;
