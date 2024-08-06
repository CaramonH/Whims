import React, { useState } from "react";
import Input from "../general/input";

interface DateInputProps {
  onChange: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ onChange }) => {
  const [date, setDate] = useState("");

  const handleDateChange = (value: string) => {
    // Remove any non-digit characters
    // Remove any non-digit characters
    let cleaned = value.replace(/\D/g, "");

    // Prepend "0" if the cleaned length is 5
    if (cleaned.length === 5) {
      cleaned = "0" + cleaned;
    }
    // Format the date as mm/dd/yy
    let formatted = "";
    if (cleaned.length > 0) formatted += cleaned.substr(0, 2);
    if (cleaned.length > 2) formatted += "/" + cleaned.substr(2, 2);
    if (cleaned.length > 4) formatted += "/" + cleaned.substr(4, 2);

    setDate(formatted);
    onChange(formatted);
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
