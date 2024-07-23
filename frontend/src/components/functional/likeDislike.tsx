import React from "react";
import Button from "../general/button";
import { faThumbsDown as thumbSolidDown, faThumbsUp as thumbSolidUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown as thumbRegularDown, faThumbsUp as thumbRegularUp } from "@fortawesome/free-regular-svg-icons";

import useLikeDislike from "../../customHooks/useLikeAndDislike";

const likeDislike: React.FC = () => {
  const { likeCount, dislikeCount, handleLike, handleDislike, userChoice } = useLikeDislike();

  return (
    <div>
      <Button
        icon={userChoice === "like" ? thumbSolidUp : thumbRegularUp}
        onClick={handleLike}
        className={`like-button ${userChoice === "like" ? "selected" : ""}`}
        label={` (${likeCount})`}
        disabled={false}
      />
      <Button
        icon={userChoice === "dislike" ? thumbSolidDown : thumbRegularDown}
        onClick={handleDislike}
        className={`dislike-button ${userChoice === "dislike" ? "selected" : ""}`}
        label={` (${dislikeCount})`}
        disabled={false}
      />
    </div>
  );
};

export default likeDislike;
