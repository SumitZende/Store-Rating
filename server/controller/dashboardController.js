import { db } from "../config/db.js";

//admin summary
export const adminDashboard = async (_req, res) => {
  try {
    const [users] = await db.execute(
      "SELECT COUNT(*) AS totalUsers FROM users WHERE (role = 'USER' OR role = 'STORE_OWNER')",
    );

    const [stores] = await db.execute(
      "SELECT COUNT(*) AS totalStores FROM stores",
    );

    const [ratings] = await db.execute(
      "SELECT COUNT(*) AS totalRatings FROM ratings",
    );

    res.json({
      totalUsers: users[0].totalUsers,
      totalStores: stores[0].totalStores,
      totalRatings: ratings[0].totalRatings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin users table data
export const getAllUsersForAdmin = async (req, res) => {
  try {
    const [users] = await db.execute(
      `
      SELECT id, name, email, address, role
      FROM users
      ORDER BY role ASC, name ASC
      `,
    );

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllStoresForAdmin = async (req, res) => {
  try {
    const [stores] = await db.execute(
      `
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,
        s.owner_id,
        IFNULL(u.name, 'Unassigned') AS owner_name,
        IFNULL(ROUND(AVG(r.rating), 1), 0) AS average_rating,
        COUNT(r.id) AS total_ratings
      FROM stores s
      LEFT JOIN users u ON s.owner_id = u.id
      LEFT JOIN ratings r ON r.store_id = s.id
      GROUP BY s.id, s.name, s.email, s.address, s.owner_id, u.name
      ORDER BY s.name ASC
      `,
    );

    res.json(stores);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Store owner dashboard
export const ownerdashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const [stores] = await db.execute(
      `
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,
        IFNULL(ROUND(AVG(r.rating), 1), 0) AS average_rating,
        COUNT(r.id) AS total_ratings
      FROM stores s
      LEFT JOIN ratings r ON r.store_id = s.id
      WHERE s.owner_id = ?
      GROUP BY s.id, s.name, s.email, s.address
      ORDER BY s.name ASC
      `,
      [ownerId],
    );

    if (stores.length === 0) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    const [ratedUsers] = await db.execute(
      `
      SELECT
        u.id,
        u.name,
        u.email,
        r.rating,
        s.name AS store_name
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      JOIN stores s ON r.store_id = s.id
      WHERE s.owner_id = ?
      ORDER BY s.name ASC, r.rating DESC, u.name ASC
      `,
      [ownerId],
    );

    const totalRatings = stores.reduce(
      (sum, store) => sum + Number(store.total_ratings || 0),
      0,
    );

    res.json({
      stores,
      ratedUsers,
      summary: {
        totalStores: stores.length,
        totalRatings,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
