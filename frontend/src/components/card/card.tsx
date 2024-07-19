import React from "react";
import LikeDislike from "../functional/likeDislike";
import CardText from "./cardText";
import Comment from "../functional/comment";
import "./card.css";

const Card = () => {
  const handleSubmit = (text: string) => {
    console.log("Submitted comment:", text);
    // Here you would send the comment to your backend
  };

  const handleTextClick = () => {
    console.log("CardText clicked");
  };

  return (
    <div className="card">
      <div className="like-dislike-container">
        <LikeDislike />
      </div>
      <div className="card-text-container">
        <CardText
          // icon={} depends on what event it is
          text="This is the main card text This is the main card text This is the main card text This is the main card text"
          onClick={handleTextClick}
        />
      </div>
      <div className="comment-container">
        <Comment buttonText="Add a comment" onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Card;
