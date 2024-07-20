import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface TextBoxProps {
  icon?: IconProp;
  onSubmit: (text: string) => void;
  className?: string;
  buttonText: string;
  initialValue?: string;
}

const Comment: React.FC<TextBoxProps> = ({
  icon,
  onSubmit,
  className,
  buttonText,
  initialValue = "",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (text.trim() !== "") {
      onSubmit(text);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <div className={`textbox-button ${className || ""}`} onClick={handleClick}>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <button className="textbox-display">
          {icon && <FontAwesomeIcon icon={icon} />}
          <span>{buttonText}</span>
        </button>
      )}
    </div>
  );
};

export default Comment;
