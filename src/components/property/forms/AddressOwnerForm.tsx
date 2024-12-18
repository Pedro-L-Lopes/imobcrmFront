import React from "react";
import { PropertyType } from "../../../types/property";
import ClientSearch from "../../client/ClientSearch";
import LocationSearch from "../../location/LocationSearch";

interface AddressOwnerProps {
  formData: PropertyType;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSelectLocation: (locationId: number) => void;
}

const AddressOwnerForm: React.FC<AddressOwnerProps> = ({
  formData,
  handleChange,
  onSelectLocation,
}) => (
  <div>
    <section className="flex items-center gap-4">
      <div>
        <label htmlFor="cep" className="block font-semibold mb-1">
          CEP
        </label>
        <input
          type="text"
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label htmlFor="rua" className="block font-semibold mb-1">
          Endereço
        </label>
        <input
          type="text"
          name="rua"
          value={formData.rua}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label htmlFor="numero" className="block font-semibold mb-1">
          Número
        </label>
        <input
          type="text"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <LocationSearch onlocationSelect={onSelectLocation} />
    </section>
  </div>
);

export default AddressOwnerForm;
