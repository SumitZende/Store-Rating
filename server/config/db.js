import mysql2 from 'mysql2';

const connection = mysql2.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

export const db = connection.promise();

export const connectDB = async()=>{
    try {
        await db.query("SELECT 1");
        console.log("Connected to MySQL");
    } catch (error) {
        console.error("DB connection failed:", error.message);
    }
}
