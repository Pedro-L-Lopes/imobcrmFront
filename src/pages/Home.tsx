import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center">
      <Link
        to="/clientes"
        className="bg-blue-500 p-2 m-2 rounded-md text-white"
      >
        Clientes
      </Link>
      <Link to="/imoveis" className="bg-blue-500 p-2 m-2 rounded-md text-white">
        Imóveis
      </Link>
      <Link
        to="/localizacoes"
        className="bg-blue-500 p-2 m-2 rounded-md text-white"
      >
        Localizações
      </Link>
    </div>
  );
};

export default Home;
