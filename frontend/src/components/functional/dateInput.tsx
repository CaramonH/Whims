import React, { useState } from "react";
import Input from "../general/input";

interface DateInputProps {
  onChange: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ onChange }) => {
  const [date, setDate] = useState("");

  const handleDateChange = (value: string) => {
    // Remove any non-digit characters
    let cleaned = value.replace(/\D/g, "");

    // Limit the input to 6 digits
    cleaned = cleaned.slice(0, 6);

    // Format the date as mm/dd/yy
    let formatted = "";
    if (cleaned.length > 0) formatted += cleaned.substr(0, 2);
    if (cleaned.length > 2) formatted += "/" + cleaned.substr(2, 2);
    if (cleaned.length > 4) formatted += "/" + cleaned.substr(4, 2);

    // Validate the date
    if (isValidDate(formatted)) {
      setDate(formatted);
      onChange(formatted);
    }
  };

  const isValidDate = (dateString: string): boolean => {
    if (dateString.length !== 8) return false;
    const [month, day, year] = dateString.split("/").map(Number);
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    if (year < 0 || year > 99) return false;
    return true;
  };

  return (
    <Input
      type="text"
      placeholder="MM/DD/YY"
      value={date}
      onChange={handleDateChange}
      className="date-input"
    />
  );
};

export default DateInput;
