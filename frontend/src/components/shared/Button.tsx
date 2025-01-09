// src/components/shared/Button.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ButtonProps {
  icon: IconProp;
  onClick: () => void;
  label: string;
  className?: string;
  isExpanded?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  onClick,
  label,
  className = "",
  isExpanded,
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded ${className}`}
  >
    <FontAwesomeIcon icon={icon} />
    {isExpanded && <span>{label}</span>}
  </button>
);
