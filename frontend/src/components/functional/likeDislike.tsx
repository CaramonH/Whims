import React, { useState, useEffect } from "react";
import Button from "../general/button";
import { faThumbsDown as thumbSolidDown, faThumbsUp as thumbSolidUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown as thumbRegularDown, faThumbsUp as thumbRegularUp } from "@fortawesome/free-regular-svg-icons";
import useLikeDislike from "../../customHooks/useLikeAndDislike";

interface LikeDislikeProps {
  groupId: string;
  whimId: string;
}

const LikeDislike: React.FC<LikeDislikeProps> = ({ groupId, whimId }) => {
  const { likeCount, dislikeCount, handleLike, handleDislike, userChoice } = useLikeDislike(groupId, whimId);
  const [totalCount, setTotalCount] = useState<number>(likeCount - dislikeCount);

  useEffect(() => {
    setTotalCount((likeCount ?? 0) - (dislikeCount ?? 0));
  }, [likeCount, dislikeCount]);

  const handleLikeClick = () => {
    if (userChoice === "dislike") {
      handleDislike(); // Remove dislike
      handleLike(); // Add like
      setTotalCount(totalCount + 2);
    } else if (userChoice !== "like") {
      handleLike();
      setTotalCount(totalCount + 1);
    }
  };

  const handleDislikeClick = () => {
    if (userChoice === "like") {
      handleLike(); // Remove like
      handleDislike(); // Add dislike
      setTotalCount(totalCount - 2);
    } else if (userChoice !== "dislike") {
      handleDislike();
      setTotalCount(totalCount - 1);
    }
  };

  return (
    <div>
      <Button
        icon={userChoice === "like" ? thumbSolidUp : thumbRegularUp}
        onClick={handleLikeClick}
        className={`like-button ${userChoice === "like" ? "selected" : ""}`}
        label={`(${likeCount ?? 0})`}
        disabled={false}
      />
      <span className="total-count">{totalCount ?? 0}</span>
      <Button
        icon={userChoice === "dislike" ? thumbSolidDown : thumbRegularDown}
        onClick={handleDislikeClick}
        className={`dislike-button ${userChoice === "dislike" ? "selected" : ""}`}
        label={`(${dislikeCount ?? 0})`}
        disabled={false}
      />
    </div>
  );
};

export default LikeDislike;
