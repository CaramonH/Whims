import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ButtonProps {
  icon: IconProp;
  onClick: () => void;
  className?: string;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ icon, onClick, className, label }) => {
  return (
    <button onClick={onClick} className={className}>
      <FontAwesomeIcon icon={icon} />
      {label}
    </button>
  );
};

export default Button;
