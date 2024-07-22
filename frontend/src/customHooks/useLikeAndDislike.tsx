import { useState } from "react";

const useLikeDislike = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [userChoice, setUserChoice] = useState<"like" | "dislike" | null>(null);

  const handleLike = () => {
    if (userChoice === "like") return;

    setLikeCount(1);
    setDislikeCount(0);
    setUserChoice("like");
  };

  const handleDislike = () => {
    if (userChoice === "dislike") return;

    setLikeCount(0);
    setDislikeCount(1);
    setUserChoice("dislike");
  };

  return {
    likeCount,
    dislikeCount,
    handleLike,
    handleDislike,
    userChoice,
  };
};

export default useLikeDislike;
