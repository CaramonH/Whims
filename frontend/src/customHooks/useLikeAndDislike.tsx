import { useState } from "react";

const useLikeDislike = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  const handleDislike = () => {
    setDislikeCount(dislikeCount + 1);
  };

  return {
    likeCount,
    dislikeCount,
    handleLike,
    handleDislike,
  };
};

export default useLikeDislike;
