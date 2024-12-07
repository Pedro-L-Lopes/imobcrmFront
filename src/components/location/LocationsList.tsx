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
    <table className="min-w-full text-sm text-gray-700 table-fixed">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="px-6 py-3 border-x w-20">Código</th>
          <th className="px-6 py-3 border-x w-48">Bairro</th>
          <th className="px-6 py-3 border-x w-48">Cidade</th>
          <th className="px-6 py-3 border-x w-36">Estado</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((loc) => (
          <tr key={loc.localizacaoId} className="hover:bg-gray-100 border-b">
            <td className="px-6 py-4 border-x text-center">{loc.codigo}</td>
            <td className="px-6 py-4 border-x truncate">
              {loc.bairro || "Não informado"}
            </td>
            <td className="px-6 py-4 border-x truncate">{loc.cidade}</td>
            <td className="px-6 py-4 border-x text-center">{loc.estado}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="text-center text-gray-500">
      Nenhuma localização encontrada.
    </div>
  );
}

export default LocationList;
