// src/components/shared/Modal.tsx
import React, { useRef, useEffect } from "react";
import { Button } from "./Button";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  children,
  className = "",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Modal component that displays a pop-up window with a title and children components
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-lg p-6 max-w-md w-full ${className}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Button
            icon={faTimes}
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full p-2"
            label="Close"
          />
        </div>
        {children}
      </div>
    </div>
  );
};
