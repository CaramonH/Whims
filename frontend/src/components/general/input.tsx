import React, { useState, ChangeEvent } from "react";

interface InputProps {
  placeholder?: string;
  type?: string;
  value?: string; //keep an eye on this and remove if neccessary
  onChange?: (value: string) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder = "",
  type = "text",
  onChange,
  className = "",
}) => {
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`input ${className}`}
    />
  );
};

export default Input;
