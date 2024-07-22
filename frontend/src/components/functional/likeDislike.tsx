import React from "react";
import Button from "../general/button";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import useLikeDislike from "../../customHooks/useLikeAndDislike";

const likeDislike: React.FC = () => {
  const { likeCount, dislikeCount, handleLike, handleDislike, userChoice } =
    useLikeDislike();

  return (
    <div>
      <Button
        icon={faThumbsUp}
        onClick={handleLike}
        className={`like-button ${userChoice === "like" ? "selected" : ""}`}
        label={` (${likeCount})`}
        disabled={false}
      />
      <Button
        icon={faThumbsDown}
        onClick={handleDislike}
        className={`dislike-button ${
          userChoice === "dislike" ? "selected" : ""
        }`}
        label={` (${dislikeCount})`}
        disabled={false}
      />
    </div>
  );
};

export default likeDislike;
