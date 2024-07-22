import React from "react";
import CreateCard from "../functional/createCard";
import "./navigation.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Whims</h1>
      <div className="create-card-container">
        <CreateCard />
      </div>
    </header>
  );
};

export default Header;
