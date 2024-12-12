import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

type InsertHeaderProps = {
  url: string;
  title: string;
};

const InsertHeader = ({ url, title }: InsertHeaderProps) => {
  return (
    <div>
      {/* Botão de voltar */}
      <Link
        to={url}
        className="flex items-center justify-center gap-2 w-10 h-10 mb-5 bg-gray-200 rounded-full hover:bg-gray-300 transition-shadow shadow-sm"
        title="Voltar"
      >
        <MdArrowBack size={24} />
      </Link>

      {/* Título */}
      <h2 className="text-lg font-bold mb-6">{title}</h2>
    </div>
  );
};

export default InsertHeader;
