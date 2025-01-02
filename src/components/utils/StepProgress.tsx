import { motion } from "framer-motion";
import { BsHouse, BsPaperclip } from "react-icons/bs";
import { FaPercentage } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { IoMdCheckboxOutline, IoMdPaper } from "react-icons/io";
import {
  MdFormatAlignLeft,
  MdPersonAdd,
  MdPersonOutline,
} from "react-icons/md";
import { PiHouse } from "react-icons/pi";
import { TbPercentage, TbTax } from "react-icons/tb";

interface Step {
  label: string;
  icon: JSX.Element;
}

interface StepProgressProps {
  currentStep: number;
  stepType: string;
}

const stepsMap: Record<string, Step[]> = {
  propertyType: [
    { label: "ENDEREÇO", icon: <IoMdCheckboxOutline size={30} /> },
    { label: "DADOS PRINCIPAIS", icon: <IoMdPaper size={30} /> },
    { label: "ANOTAÇÕES", icon: <MdFormatAlignLeft size={30} /> },
    { label: "RELACIONAMENTOS", icon: <MdPersonOutline size={30} /> },
  ],
  rentalContractType: [
    { label: "IMÓVEL", icon: <PiHouse size={30} /> },
    { label: "LOCATÁRIO", icon: <MdPersonOutline size={30} /> },
    { label: "DADOS PRINCIPAIS", icon: <IoMdPaper size={30} /> },
    { label: "TAXAS", icon: <TbPercentage size={30} /> },
    { label: "ANOTAÇÕES", icon: <BsPaperclip size={30} /> },
  ],
};

const StepProgress = ({ currentStep, stepType }: StepProgressProps) => {
  const steps = stepsMap[stepType];

  return (
    <div className="relative flex items-center justify-between space-x-4 bg-gray-200 p-2">
      {/* Linha de progresso (parte preenchida) */}
      <motion.div
        className="absolute top-6 left-8 h-1 bg-green-500"
        initial={{ width: 0 }}
        animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="relative z-10 flex flex-col items-center border w-full"
          initial={{ scale: 1 }}
          animate={{ scale: index === currentStep ? 1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Círculos para os passos */}
          <motion.div
            className={`w-12 h-12 flex items-center justify-center rounded-full ${
              index <= currentStep
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
            initial={{ rotate: 0 }}
            animate={{ rotate: index === currentStep ? 360 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {step.icon}
          </motion.div>
          {/* Rótulos dos passos */}
          <motion.span
            className={`mt-2 ${
              index <= currentStep ? "text-black" : "text-gray-500"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {step.label}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
};

export default StepProgress;
