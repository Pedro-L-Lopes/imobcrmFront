import * as Select from "@radix-ui/react-select";
import { FaChevronDown, FaCheck } from "react-icons/fa";

interface Option {
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

interface DynamicSelectProps {
  options: Option[];
  placeholder?: string;
}

const DynamicSelect = ({
  options,
  placeholder = "Ações",
}: DynamicSelectProps) => {
  const handleSelect = (value: string) => {
    const selectedOption = options.find((option) => option.label === value);
    selectedOption?.action();
  };

  return (
    <Select.Root onValueChange={handleSelect}>
      <Select.Trigger
        className="flex items-center justify-between px-4 py-2 border rounded-md shadow-sm text-sm bg-white hover:bg-gray-50"
        aria-label="Ações"
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <FaChevronDown className="w-4 h-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="rounded-md shadow-lg bg-white border p-2 w-56">
          <Select.ScrollUpButton className="flex items-center justify-center text-gray-500">
            <FaChevronDown className="w-4 h-4" />
          </Select.ScrollUpButton>
          <Select.Viewport>
            {options.map((option, index) => (
              <Select.Item
                key={index}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                value={option.label}
              >
                {option.icon}
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <FaCheck className="w-4 h-4 text-green-500" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center text-gray-500">
            <FaChevronDown className="w-4 h-4" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default DynamicSelect;
