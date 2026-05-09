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

