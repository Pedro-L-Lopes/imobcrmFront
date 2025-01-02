import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

dayjs.locale("pt-br");

interface TimePickerProps {
  value: Date | null;
  onChange: (newValue: Date | null) => void;
}

export default function TimePicker({ value, onChange }: TimePickerProps) {
  const handleChange = (newValue: Dayjs | null) => {
    onChange(newValue ? newValue.toDate() : null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        className="bg-white"
        value={value ? dayjs(value) : null}
        onChange={handleChange}
        ampm={false}
        label="Data e Hora"
      />
    </LocalizationProvider>
  );
}
