// Components
import * as Tooltip from "@radix-ui/react-tooltip";
import { FaRegCircleQuestion } from "react-icons/fa6";

interface InfoTooltipProps {
  message: string;
  className?: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ message, className }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className={`text-sm ${className || ""}`}>
            <FaRegCircleQuestion />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={5}
            side="top"
            align="center"
            className="bg-blue-500 text-white rounded-sm p-2 text-sm"
          >
            {message}
            <Tooltip.Arrow className="fill-blue-500" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default InfoTooltip;
