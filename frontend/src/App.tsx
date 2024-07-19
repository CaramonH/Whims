import React from "react";
import LikeDislike from "./components/functional/likeDislike";
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <h1>React Like/Dislike Example</h1>
      <LikeDislike />
    </div>
  );
};

export default App;
