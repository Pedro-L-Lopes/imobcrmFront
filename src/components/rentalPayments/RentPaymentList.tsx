import { RentPaymentType } from "../../@types/rentPaymantType";
import DetailsSection from "../utils/DetailsSection";
import RentPaymentCard from "../rentalPayments/RentPaymentCard";

const RentPaymentList = ({ rentPayments }: any) => {
  return (
    <main>
      <DetailsSection title="Alugueis">
        <div className="grid  grid-cols-1 items-center justify-between">
          {rentPayments &&
            rentPayments.map((payments: RentPaymentType) => (
              <RentPaymentCard payment={payments} />
            ))}
        </div>
      </DetailsSection>
    </main>
  );
};

export default RentPaymentList;
