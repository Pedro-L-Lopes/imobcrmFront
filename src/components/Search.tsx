import React, { useState } from "react";

interface SearchProps {
  onSearch: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex" style={{ width: "35%" }}>
      <input
        type="text"
        placeholder="Pesquisar clientes por código, nome, email ou cpf/cnpj"
        value={searchTerm}
        onChange={handleInputChange}
        className="px-4 py-2 w-5/6 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
      >
        Buscar
      </button>
    </div>
  );
};

export default Search;
