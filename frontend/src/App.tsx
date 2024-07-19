import React from "react";
import Card from "./components/card/card";
import CreateCard from "./components/functional/createCard";

const App = () => {
  return (
    <div className="app">
      <Card />
      <CreateCard />
    </div>
  );
};

export default App;
