import { useState, useEffect } from "react";
import { getLikesDislikes, toggleLikeDislike } from "../firebaseService";

// interface LikeDislikeResult {
//   likeCount: number;
//   dislikeCount: number;
//   userChoice: "like" | "dislike" | null;
// }

const useLikeDislike = (groupId: string, whimId: string, userId: string) => {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [dislikeCount, setDislikeCount] = useState<number>(0);
  const [userChoice, setUserChoice] = useState<"like" | "dislike" | null>(null);

  const fetchLikeDislikeData = async () => {
    try {
      const result = await getLikesDislikes(groupId, whimId);
      setLikeCount(result.likeCount);
      setDislikeCount(result.dislikeCount);
      setUserChoice(
        result.likes.includes(userId) ? "like" :
        result.dislikes.includes(userId) ? "dislike" :
        null
      );
    } catch (error) {
      console.error("Error fetching like/dislike data:", error);
    }
  };

  useEffect(() => {
    fetchLikeDislikeData();
  }, [groupId, whimId, userId]);

  const handleLike = async () => {
    try {
      await toggleLikeDislike(groupId, whimId, userId, true);
      await fetchLikeDislikeData(); // Fetch updated data
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleDislike = async () => {
    try {
      await toggleLikeDislike(groupId, whimId, userId, false);
      await fetchLikeDislikeData(); // Fetch updated data
    } catch (error) {
      console.error("Error updating dislike:", error);
    }
  };

  return { likeCount, dislikeCount, handleLike, handleDislike, userChoice };
};

export default useLikeDislike;