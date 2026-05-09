import { useState } from "react";
import toast from "react-hot-toast";
import api from "../configs/axios";

const useUserRatings = (ratingDrafts, refreshUserData) => {
  const [ratingLoadingId, setRatingLoadingId] = useState(null);

  // RATE STORE

  const handleRateStore = async (storeId) => {
    const ratingValue = Number(ratingDrafts[storeId]);

    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      toast.error("Rating must be between 1-5");

      return;
    }

    try {
      setRatingLoadingId(storeId);

      const { data } = await api.post("/store/ratings", {
        storeId,
        rating: ratingValue,
      });

      toast.success(data?.message || "Rating saved");

      await refreshUserData();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setRatingLoadingId(null);
    }
  };

  return {
    ratingLoadingId,

    handleRateStore,
  };
};

export default useUserRatings;
