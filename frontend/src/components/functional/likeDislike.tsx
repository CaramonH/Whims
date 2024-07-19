import React from "react";
import Button from "../general/button";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import useLikeDislike from "../../customHooks/useLikeAndDislike";

const App: React.FC = () => {
  const { likeCount, dislikeCount, handleLike, handleDislike } =
    useLikeDislike();

  return (
    <div>
      <Button
        icon={faThumbsUp}
        onClick={handleLike}
        className="like-button"
        label={`Like (${likeCount})`}
      />
      <Button
        icon={faThumbsDown}
        onClick={handleDislike}
        className="dislike-button"
        label={`Dislike (${dislikeCount})`}
      />
    </div>
  );
};

export default App;
