import { useState } from "react";

const useLikeDislike = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleLike = () => {
    if (!hasInteracted) {
      setLikeCount(1);
      setHasInteracted(true);
    }
  };

  const handleDislike = () => {
    if (!hasInteracted) {
      setDislikeCount(1);
      setHasInteracted(true);
    }
  };

  return {
    likeCount,
    dislikeCount,
    handleLike,
    handleDislike,
    hasInteracted,
  };
};

export default useLikeDislike;
