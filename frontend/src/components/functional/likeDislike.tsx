import React from "react";
import Button from "../general/button";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import useLikeDislike from "../../customHooks/useLikeAndDislike";

const likeDislike: React.FC = () => {
  const { likeCount, dislikeCount, handleLike, handleDislike, hasInteracted } =
    useLikeDislike();

  return (
    <div>
      <Button
        icon={faThumbsUp}
        onClick={handleLike}
        className={`like-button ${hasInteracted ? "disabled" : ""}`}
        label={`Like (${likeCount})`}
        disabled={hasInteracted}
      />
      <Button
        icon={faThumbsDown}
        onClick={handleDislike}
        className={`dislike-button ${hasInteracted ? "disabled" : ""}`}
        label={`Dislike (${dislikeCount})`}
        disabled={hasInteracted}
      />
    </div>
  );
};

export default likeDislike;
