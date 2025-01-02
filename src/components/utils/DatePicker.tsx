import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

dayjs.locale("pt-br");

interface PickerProps {
  value: Date | null;
  onChange: (newValue: Date | null) => void;
  title: string;
  disabled?: boolean;
}

export default function Picker({
  value,
  onChange,
  title,
  disabled,
}: PickerProps) {
  const handleChange = (newValue: Dayjs | null) => {
    onChange(newValue ? newValue.toDate() : null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className="bg-white"
        value={value ? dayjs(value) : null}
        onChange={handleChange}
        label={title}
        disabled={disabled}
        format="DD/MM/YYYY"
      />
    </LocalizationProvider>
  );
}
