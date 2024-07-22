import React from "react";
import Button from "../general/button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./navigation.css";

interface HeaderProps {
  onCreateClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateClick }) => {
  return (
    <header className="header">
      <h1>Dashboard</h1>
      <Button
        icon={faPlus}
        onClick={onCreateClick}
        className="create-button"
        label="Create New Event"
      />
    </header>
  );
};

export default Header;
