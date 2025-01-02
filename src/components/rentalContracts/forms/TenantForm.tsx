import { CiCircleAlert } from "react-icons/ci";
import { RentalContractType } from "../../../types/rentalContract";
import ClientSearch from "../../client/ClientSearch";

interface TenantFormProps {
  formData: RentalContractType;
  handleChange: (field: string, value: string) => void;
}

const Tenant = ({ formData, handleChange }: TenantFormProps) => {
  return (
    <main>
      <div>
        <label className="font-semibold mb-2 text-gray-700 flex items-center gap-1">
          Cliente <CiCircleAlert />
        </label>
        <ClientSearch
          onClientSelect={(locatarioId) => {
            handleChange("locatarioId", locatarioId);
          }}
          selectedClientId={formData.locatarioId}
        />
      </div>
    </main>
  );
};

export default Tenant;
