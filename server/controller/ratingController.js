import { db } from "../config/db.js";
import crypto from "crypto";


export const submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;

    const userId = req.user.id;
    const normalizedRating = Number(rating);

    if (!storeId || Number.isNaN(normalizedRating)) {
      return res.status(400).json({
        message: "Store ID and rating required",
      });
    }
    if (normalizedRating < 1 || normalizedRating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }
    // check existing rating
    const [existing] = await db.execute(
      "SELECT * FROM ratings WHERE user_id = ? AND store_id = ?",
      [userId, storeId],
    );

    // UPDATE existing rating
    if (existing.length > 0) {
      await db.execute(
        "UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?",
        [normalizedRating, userId, storeId],
      );

      return res.json({
        message: "Rating updated successfully",
      });
    }

    // CREATE new rating
    const id = crypto.randomUUID();

    await db.execute(
      "INSERT INTO ratings (id, rating, user_id, store_id) VALUES (?, ?, ?, ?)",
      [id, normalizedRating, userId, storeId],
    );

    res.json({
      message: "Rating submitted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

