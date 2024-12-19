import { Link } from "react-router-dom";

type InsertHeaderProps = {
  paths: { name: string; url: string }[];
  title: string;
};

const InsertHeader = ({ paths, title }: InsertHeaderProps) => {
  return (
    <div className="mb-8">
      {/* Título */}
      <h2 className="text-lg font-bold mb-6">{title}</h2>

      <div className="text-sm flex gap-1 ml-4 -mt-5 opacity-80">
        {paths.map((path, index) => (
          <div key={index} className="flex items-center gap-1">
            <Link to={path.url}>{path.name}</Link>
            {index < paths.length - 1 && <p>{">"}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsertHeader;
