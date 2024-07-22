import React from "react";
import "./navigation.css";

interface HeaderProps {
  // Remove onCreateClick from HeaderProps
}

const Header: React.FC<HeaderProps> = () => {
  return <header className="header">{/* No button here */}</header>;
};

export default Header;
