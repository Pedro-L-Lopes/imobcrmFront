<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-10">
  {/* Valores */}
  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
    <div>
      <label htmlFor="valor" className="block font-semibold mb-1">
        Valor
      </label>
      <input
        type="text"
        name="valor"
        value={valorFormatted}
        onChange={(e) => handleCurrencyChange(e, "valor", setValorFormatted)}
        className={`w-full border p-2 rounded ${
          formData.valor! > 0 ? "border-green-500" : "border-red-500 bg-red-50"
        }`}
      />
    </div>
    <div>
      <label htmlFor="valorCondominio" className="block font-semibold mb-1">
        Valor do Condomínio
      </label>
      <input
        type="text"
        name="valorCondominio"
        value={valorCondominioFormatted}
        onChange={(e) =>
          handleCurrencyChange(
            e,
            "valorCondominio",
            setValorCondominioFormatted
          )
        }
        className="w-full border border-gray-400 p-2 rounded"
      />
    </div>
  </section>
</div>;
