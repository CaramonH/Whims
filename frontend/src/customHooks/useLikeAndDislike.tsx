import { useState, useEffect } from "react";
import { getLikesDislikes, updateLikeDislike } from "../firebaseService"; // Adjust the import according to your project structure

interface LikeDislikeResult {
  likeCount: number;
  dislikeCount: number;
  userChoice: "like" | "dislike" | null;
}

const useLikeDislike = (groupId: string, whimId: string) => {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [dislikeCount, setDislikeCount] = useState<number>(0);
  const [userChoice, setUserChoice] = useState<"like" | "dislike" | null>(null);

  useEffect(() => {
    const fetchLikeDislikeData = async () => {
      try {
        const result: LikeDislikeResult = await getLikesDislikes(groupId, whimId);
        setLikeCount(result.likeCount);
        setDislikeCount(result.dislikeCount);
        setUserChoice(result.userChoice);
      } catch (error) {
        console.error("Error fetching like/dislike data:", error);
      }
    };

    fetchLikeDislikeData();
  }, [groupId, whimId]);

  const handleLike = async () => {
    try {
      await updateLikeDislike(groupId, whimId, "like");
      setLikeCount((prev) => prev + 1);
      if (userChoice === "dislike") {
        setDislikeCount((prev) => prev - 1);
      }
      setUserChoice("like");
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleDislike = async () => {
    try {
      await updateLikeDislike(groupId, whimId, "dislike");
      setDislikeCount((prev) => prev + 1);
      if (userChoice === "like") {
        setLikeCount((prev) => prev - 1);
      }
      setUserChoice("dislike");
    } catch (error) {
      console.error("Error updating dislike:", error);
    }
  };

  return { likeCount, dislikeCount, handleLike, handleDislike, userChoice };
};

export default useLikeDislike;
