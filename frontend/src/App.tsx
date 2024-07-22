import React from "react";
import Header from "./components/navigation/header";
import Sidebar from "./components/navigation/sidebar";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Sidebar />
    </div>
  );
};

export default App;
