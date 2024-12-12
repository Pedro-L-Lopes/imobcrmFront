import { PropertyType } from "../../types/property";
import { PiHouseLine } from "react-icons/pi";

interface PropertyCardProps {
  property: PropertyType;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="border bg-white flex flex-col lg:flex-row">
      {/* Espaço reservado para imagem */}
      <div className="w-full lg:w-14 h-48 bg-gradient-to-r from-blue-500 to-blue-300 rounded-sm flex items-center justify-center text-white">
        <span className="flex items-center justify-center">
          <PiHouseLine size={"50%"} />
        </span>
      </div>

      {/* Detalhes do imóvel */}
      <div className="w-full ml-5 mt-5 mr-5 space-y-2">
        {/* Informações principais */}
        <div className="flex justify-between items-center">
          <div className="text-md font-semibold">
            <p>
              Cód.: {property.codigo} | Cód. Site: {property.siteCod} |{" "}
              {property.finalidade?.toUpperCase()} |{" "}
              {property.tipoImovel?.toUpperCase()}
            </p>
            <p className="text-sm text-gray-600">
              {property.rua}, nº {property.numero}, {property.bairro},{" "}
              {property.cidade} - {property.estado}
            </p>
          </div>
          <select className="bg-gray-100 px-3 py-1 rounded focus:outline-none hover:bg-gray-200 cursor-pointer">
            <option>Ações</option>
            <option>Detalhes</option>
            <option>Editar</option>
            <option>Excluir</option>
          </select>
        </div>

        {/* Valores e área */}
        <div className="text-sm font-medium text-gray-700 flex flex-wrap gap-4">
          <p>
            Valor:{" "}
            {property.valor?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p>Área: {property.area}m²</p>
          <p>
            Valor/m²:{" "}
            {(property.valor! / property.area!).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>

        {/* Situações */}
        <div className="flex flex-wrap gap-2">
          <span
            className={`px-3 py-1 rounded text-white font-bold ${
              property.situacao?.toLowerCase() === "disponivel"
                ? "bg-green-600"
                : property.situacao?.toLowerCase() === "indisponivel"
                ? "bg-red-600"
                : "bg-yellow-600"
            }`}
          >
            {property.situacao?.toUpperCase()}
          </span>
          <span
            className={`px-3 py-1 rounded text-white font-bold ${
              property.avaliacao ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {property.avaliacao ? "COM AVALIAÇÃO" : "SEM AVALIAÇÃO"}
          </span>
          <span
            className={`px-3 py-1 rounded text-white font-bold ${
              property.tipoAutorizacao?.toLowerCase() === "sem autorizacao"
                ? "bg-red-600"
                : property.tipoAutorizacao?.toLowerCase() ===
                  "com exclusividade"
                ? "bg-green-600"
                : "bg-yellow-600"
            }`}
          >
            {property.tipoAutorizacao?.toUpperCase() || "NÃO DEFINIDO"}
          </span>
          <span
            className={`px-3 py-1 rounded text-white font-bold ${
              property.comPlaca ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {property.comPlaca ? "COM PLACA/ADESIVO" : "SEM PLACA/ADESIVO"}
          </span>
        </div>

        {/* Proprietário */}
        <p className="text-sm text-gray-600">
          Proprietário: {property.proprietarioNome || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
