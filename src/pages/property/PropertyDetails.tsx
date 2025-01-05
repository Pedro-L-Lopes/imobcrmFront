import { useNavigate, useParams } from "react-router-dom";
import PropertyDetailsForm from "../../components/property/PropertyDetailsForm";
import { FaCheckCircle, FaLock, FaPencilAlt, FaTrash } from "react-icons/fa";
import DynamicSelect from "../../components/utils/DynamicSelect";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPropertyById } from "../../slices/propertySlice";
import Message from "../../components/utils/Message";
import InsertHeader from "../../components/InsertHeader";
import AddFixedAccount from "../../components/fixedAccount/AddFixedAccount";
import { getFixedAccountByPropertyId } from "../../slices/fixedAccountSlice";
import PropertyDetailsFixedAccountForm from "../../components/property/propertyDetails/PropertyDetailsFixedAccountForm";

const PropertyDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { property, error, loading, message } = useSelector(
    (state: any) => state.property
  );

  const { fixedAccounts } = useSelector((state: any) => state.fixedAccount);

  const [step, setStep] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(getPropertyById(id));
      dispatch(getFixedAccountByPropertyId(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        Carregando detalhes do imóvel...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center text-red-500 mt-10">
        Imóvel não encontrado.
      </div>
    );
  }

  // const options = [
  //   {
  //     label: "Editar",
  //     icon: <FaPencilAlt className="w-5 h-5 text-blue-500" />,
  //     action: () => navigate(`/imovel/Editar/${property.imovelId}`),
  //   },
  //   {
  //     label: "Contas fixas",
  //     icon: <FaPencilAlt className="w-5 h-5 text-blue-500" />,
  //     action: () => setFixedAccountModalOpen(true),
  //   },
  //   {
  //     label: "Avaliação",
  //     icon: <FaCheckCircle className="w-5 h-5 text-green-500" />,
  //     action: () => alert("Abrindo modal de avaliação"),
  //   },
  //   {
  //     label: "Autorização",
  //     icon: <FaLock className="w-5 h-5 text-yellow-500" />,
  //     action: () => alert("Abrindo modal de autorização"),
  //   },
  //   {
  //     label: "Excluir",
  //     icon: <FaTrash className="w-5 h-5 text-red-500" />,
  //     action: () => alert("Abrindo modal de exclusão"),
  //   },
  // ];

  return (
    <div className="p-6 w-full">
      {error && <Message text={message} type="error" />}

      <InsertHeader
        title={`Detalhes do imóvel ${property.codigo}`}
        paths={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Imóveis", url: "/imoveis" },
          {
            name: `Detalhes imóvel ${property.codigo}`,
            url: `/imovel/detalhes/${property.imovelId}`,
          },
        ]}
      />

      <div className="flex gap-2 justify-end mb-1">
        <button
          className={`border border-gray-300 rounded p-2 ${
            step === 0 ? "bg-gray-200" : ""
          }`}
          onClick={() => setStep(0)}
        >
          Detalhes do Imóvel
        </button>
        <button
          className={`border border-gray-300 rounded p-2 ${
            step === 1 ? "bg-gray-200" : ""
          }`}
          onClick={() => setStep(1)}
        >
          Contas Fixas
        </button>
      </div>

      {step === 0 && <PropertyDetailsForm property={property} />}
      {step === 1 && (
        <PropertyDetailsFixedAccountForm
          propertyId={property.imovelId}
          fixedAccounts={fixedAccounts}
        />
      )}
    </div>
  );
};

export default PropertyDetails;

{
  /* <section className="flex justify-end mb-1">
        <DynamicSelect options={options} />
      </section> */
}
