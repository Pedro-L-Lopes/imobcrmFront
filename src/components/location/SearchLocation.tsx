type SearchLocationProps = {
  term1: string;
  setTerm1: (value: string) => void;
  term2: string;
  setTerm2: (value: string) => void;
};

function SearchLocation({
  term1,
  setTerm1,
  term2,
  setTerm2,
}: SearchLocationProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="Busca por Bairro"
        value={term1}
        onChange={(e) => setTerm1(e.target.value)}
        className="border rounded-lg px-4 py-2 flex-1"
      />
      <input
        type="text"
        placeholder="Busca por Cidade"
        value={term2}
        onChange={(e) => setTerm2(e.target.value)}
        className="border rounded-lg px-4 py-2 flex-1"
      />
    </div>
  );
}

export default SearchLocation;
