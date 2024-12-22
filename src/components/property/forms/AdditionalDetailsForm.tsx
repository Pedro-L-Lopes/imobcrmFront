import React from "react";
import ClientSearch from "../../client/ClientSearch";
import { PropertyType } from "../../../types/property";

interface AdditionalDetailsProps {
  formData: PropertyType;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSelectOwner: (clientId: string) => void;
}

const AdditionalDetailsForm: React.FC<AdditionalDetailsProps> = ({
  formData,
  onSelectOwner,
  handleChange,
}) => (
  <div>
    <div>
      <label htmlFor="proprietarioId" className="block font-semibold mb-1">
        Proprietário
      </label>
      <ClientSearch
        onClientSelect={onSelectOwner}
        selectedClientId={formData.proprietarioId}
      />
    </div>
  </div>
);

export default AdditionalDetailsForm;
