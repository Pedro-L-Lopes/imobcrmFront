import { LocationType } from "../../types/location";

type LocationListProps = {
  locations: LocationType[];
  loading: boolean;
  error: boolean;
  message: string | null;
};

function LocationList({
  locations,
  loading,
  error,
  message,
}: LocationListProps) {
  if (loading) {
    return <div className="text-center text-gray-500">Carregando...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Erro: {message || "Erro ao carregar localizações"}
      </div>
    );
  }

  return locations && locations.length > 0 ? (
    <table className="min-w-full table-fixed border-collapse border border-gray-300 text-sm text-gray-700 rounded-lg overflow-hidden">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 border-x border-blue-700 text-center"
            style={{ width: "5%" }}
          >
            Código
          </th>
          <th
            scope="col"
            className="px-6 py-3 border-x border-blue-700 w-48 text-left"
          >
            Bairro
          </th>
          <th
            scope="col"
            className="px-6 py-3 border-x border-blue-700 w-48 text-left"
          >
            Cidade
          </th>
          <th
            scope="col"
            className="px-6 py-3 border-x border-blue-700 w-36 text-center"
            style={{ width: "5%" }}
          >
            Estado
          </th>
        </tr>
      </thead>
      <tbody>
        {locations.length > 0 ? (
          locations.map((loc) => (
            <tr
              key={loc.localizacaoId}
              className="hover:bg-gray-100 even:bg-gray-10 border-b"
            >
              <td className="px-6 py-4 border-x text-center font-medium text-gray-900 ">
                {loc.codigo}
              </td>
              <td className="px-6 py-4 border-x truncate">
                {loc.bairro || "Não informado"}
              </td>
              <td className="px-6 py-4 border-x truncate">{loc.cidade}</td>
              <td className="px-6 py-4 border-x text-center">{loc.estado}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={4}
              className="px-6 py-4 text-center text-gray-500 italic border-x"
            >
              Nenhuma localização encontrada.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  ) : (
    <div className="text-center text-gray-500">
      Nenhuma localização encontrada.
    </div>
  );
}

export default LocationList;
