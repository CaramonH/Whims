import React from "react";
import CreateCard from "../functional/createCard";
import "./navigation.css";

const Header = () => {
  return (
    <header className="header">
      <div className="create-card-container">
        <CreateCard />
      </div>
    </header>
  );
};

export default Header;
