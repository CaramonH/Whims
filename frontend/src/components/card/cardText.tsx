import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// This component is a text element for the card
interface CardTextProps {
  icon?: IconProp;
  className?: string;
  text: string;
  onClick?: () => void;
}

const CardText: React.FC<CardTextProps> = ({
  icon,
  className,
  text,
  onClick,
}) => {
  return (
    <div className={`card-text ${className || ""}`} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} />}
      <span>{text}</span>
    </div>
  );
};

export default CardText;
