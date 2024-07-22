import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ButtonProps {
  icon: IconProp;
  onClick: () => void;
  className?: string;
  label: string;
  disabled?: boolean;
  isExpanded?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  onClick,
  className,
  label,
  disabled,
  isExpanded
}) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      <FontAwesomeIcon icon={icon} />
      {isExpanded && <span className="label">{label}</span>}
    </button>
  );
};

export default Button;
