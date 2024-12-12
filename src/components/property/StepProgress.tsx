import React from "react";

interface StepProgressProps {
  currentStep: number;
}

const steps = [
  { label: "ENDEREÇO", icon: "✅" },
  { label: "DADOS PRINCIPAIS", icon: "📄" },
  { label: "RELACIONAMENTOS", icon: "👥" },
  { label: "ANOTAÇÕES", icon: "📝" },
];

const StepProgress: React.FC<StepProgressProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between space-x-4">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          {/* Circles for steps */}
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full ${
              index <= currentStep
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            {step.icon}
          </div>
          {/* Step labels */}
          <span
            className={`mt-2 ${
              index <= currentStep ? "text-black" : "text-gray-500"
            }`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StepProgress;
