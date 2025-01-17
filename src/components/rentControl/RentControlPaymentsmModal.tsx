import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import RentControlPayments from "./RentControlPayments";
import { FaChevronDown } from "react-icons/fa";

interface props {
  contractId: string;
  buttonClass: string;
}

function RentControlPaymentsModal({ contractId, buttonClass }: props) {
  const [openModal, setOpenModal] = useState(false);
  const [isPaymentsExpanded, setIsPaymentsExpanded] = useState(true);

  return (
    <div>
      <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
        <Dialog.Trigger asChild>
          <button className={buttonClass}>Pagamentos</button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-full max-w-2xl overflow-scroll max-h-[700px]">
            <Dialog.Close className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
              ✕
            </Dialog.Close>
            <h2 className="text-lg font-semibold mb-4">Aluguéis</h2>
            <div className="flex flex-col gap-6">
              <section className="border rounded-lg p-4 shadow-md bg-white">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-semibold">Pagamentos</h3>
                  <button
                    className="flex items-center text-blue-500 text-sm hover:underline"
                    onClick={() => setIsPaymentsExpanded(!isPaymentsExpanded)}
                  >
                    <FaChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${
                        isPaymentsExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isPaymentsExpanded
                      ? "max-h-[300px] overflow-y-auto opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <RentControlPayments contractId={contractId} />
                </div>
              </section>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default RentControlPaymentsModal;
