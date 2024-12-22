import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { RootState, AppDispatch } from "../store";
import { getLocations, reset } from "../slices/locationSlice";
import SearchLocation from "../components/location/SearchLocation";
import LocationList from "../components/location/LocationsList";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../components/utils/Button";
import InsertLocationModal from "../components/location/InsertLocationModal";
import { useAppDispatch } from "../hooks/useAppDispatch";

// Components
import * as Tooltip from "@radix-ui/react-tooltip";
import { TbRefresh } from "react-icons/tb";

function Location() {
  const dispatch = useAppDispatch();

  const [term1, setTerm1] = useState("");
  const [term2, setTerm2] = useState("");

  const [refreshClicked, setRefreshClicked] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { locations, loading, error, message } = useSelector(
    (state: RootState) => state.location
  );

  // Atualiza a lista de localizações com debounce
  const debouncedSearch = useCallback(
    debounce((searchTerm1: any, searchTerm2: any) => {
      dispatch(getLocations({ searchTerm1, searchTerm2 }));
    }, 500),
    [dispatch, refreshClicked]
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

  const handleRefreshClick = () => {
    setRefreshClicked(!refreshClicked);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start mt-8">
      <section className="flex items-center justify-between">
        <header className="flex items-center  gap-3 text-3xl font-bold text-gray-800 ml-4 mt-2">
          Listagem de Localizações
          <div>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button onClick={handleRefreshClick}>
                    <TbRefresh size={30} className="bg-blue-500 text-white rounded-md"/>
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    sideOffset={5}
                    side="top"
                    align="center"
                    className="bg-blue-500 text-white rounded-sm p-2"
                  >
                    Clique para atualizar a lista de localizações
                    <Tooltip.Arrow className="fill-blue-500" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        </header>
        <Button
          onClick={() => setIsModalOpen(true)}
          icon={<AiOutlinePlus size={20} className="mr-1" />}
          title="Inserir Localização"
        />

        <InsertLocationModal
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
        />
      </section>

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
