import React from "react";
import PropertySearch from "../../property/PropertySearch";
import { RentalContractType } from "../../../types/rentalContract";
import { CiCircleAlert } from "react-icons/ci";

interface PropertyFormProps {
  formData: RentalContractType;
  handleChange: (field: string, value: string) => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  formData,
  handleChange,
}) => (
  <main className="flex items-center justify-center">
    <div className="w-full">
      <label className="font-semibold mb-2 text-gray-700 flex items-center gap-1">
        Imóvel <CiCircleAlert />
      </label>
      <PropertySearch
        selectedPropertyId={formData.imovelId}
        selectOwnerId={formData.locadorId}
        initialPurpose="aluguel"
        onPropertySelect={(
          propertyId,
          ownerId,
          purpose,
          valorContrato,
          valorCondominio
        ) => {
          handleChange("imovelId", propertyId);
          handleChange("locadorId", ownerId);
          handleChange("valorContrato", valorContrato.toString());
          handleChange("valorCondominio", valorCondominio.toString());
        }}
      />
    </div>
  </main>
);

export default PropertyForm;
