import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FaChevronDown } from "react-icons/fa";
import FixedAccountModalContent from "./FixedAccountModalContent";

interface props {
  propertyId: string;
  buttonClass: string;
}

function FixedAccountsModal({ propertyId, buttonClass }: props) {
  const [openModal, setOpenModal] = useState(false);
  const [isAccountsExpanded, setIsAccountsExpanded] = useState(true);

  return (
    <div>
      <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
        <Dialog.Trigger asChild>
          <button className={buttonClass}>Contas fixas</button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-full max-w-2xl overflow-scroll max-h-[700px]">
            <Dialog.Close className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
              ✕
            </Dialog.Close>
            <h2 className="text-lg font-semibold mb-4">Contas Fixas</h2>
            <section className="border rounded-lg p-4 shadow-md bg-white">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold">Contas Fixas</h3>
                <button
                  className="flex items-center text-blue-500 text-sm hover:underline"
                  onClick={() => setIsAccountsExpanded(!isAccountsExpanded)}
                >
                  <FaChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${
                      isAccountsExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isAccountsExpanded
                    ? "max-h-[300px] overflow-y-auto opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <FixedAccountModalContent propertyId={propertyId} />
              </div>
            </section>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default FixedAccountsModal;
