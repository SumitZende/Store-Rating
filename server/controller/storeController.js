import crypto from "crypto";
import { db } from "../config/db.js";



//creatinng store -> System Administrator
export const createStrore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    if (!name || !email || !address || !ownerId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const id = crypto.randomUUID();

    await db.execute(
      "INSERT INTO stores (id,name,email,address,owner_id) values (?,?,?,?,?)",
      [id, name, email, address, ownerId],
    );

    res.json({ message: "store created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

//fetching all stores Normal user
export const getAllStores = async (req, res) => {
  try {
    const { search } = req.query;
    const userId = req.user?.id || null;

    // Include average rating for each store and current user's own rating (if any)
    let query = `
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,
        s.owner_id,
        IFNULL(ROUND(AVG(r.rating), 1), 0) AS average_rating,
        MAX(ur.rating) AS user_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      LEFT JOIN ratings ur ON ur.store_id = s.id AND ur.user_id = ?
    `;

    const values = [userId];

    if (search) {
      query += " WHERE s.name LIKE ? OR s.address LIKE ? OR s.email LIKE ?";
      values.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += " GROUP BY s.id, s.name, s.email, s.address, s.owner_id ORDER BY s.name ASC";

    const [stores] = await db.execute(query, values);

    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};