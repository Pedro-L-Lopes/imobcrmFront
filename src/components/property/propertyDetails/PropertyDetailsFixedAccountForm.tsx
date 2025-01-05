import { FixedAccountType } from "../../../types/fixedAccount";
import AddFixedAccount from "../../fixedAccount/AddFixedAccount";
import FixedAccountCard from "../../fixedAccount/FixedAccountCard";
import DetailsSection from "../../utils/DetailsSection";

const PropertyDetailsFixedAccountForm = ({
  propertyId,
  fixedAccounts,
}: any) => {
  return (
    <main>
      <div className="mb-2">
        <AddFixedAccount imovelId={propertyId} />
      </div>
      <DetailsSection title="Contas fixas">
        <div className="grid  grid-cols-1 items-center justify-between">
          {fixedAccounts &&
            fixedAccounts.map((account: FixedAccountType) => (
              <FixedAccountCard account={account} key={account.tipoConta} />
            ))}
        </div>
      </DetailsSection>
    </main>
  );
};

export default PropertyDetailsFixedAccountForm;
