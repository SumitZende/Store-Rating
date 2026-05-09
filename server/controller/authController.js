import {db} from '../config/db.js';
import crypto from "crypto";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";


//signup
export const signup = async(req,res)=>{
    try {
        const { name, email, address, password, role, Role } = req.body;
        const normalizedRole = role || Role || "USER";

        //validation basic
        if (!name || !email || !address || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        //checking existing user
        const [existing] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (existing.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //hased password
        const hashedPassword = await bcrypt.hash(password, 10);

        //unique id
        const id = crypto.randomUUID();

        await db.execute(
            "INSERT INTO users (id, name, email, password, address, role) VALUES (?, ?, ?, ?, ?, ?)",
            [id, name, email, hashedPassword, address, normalizedRole]
        );

        res.status(201).json({ message: "User registration successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

//signin
export const signin = async (req,res)=>{
    try {
     const { email , password}= req.body;
     
     if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
     }

     const [users] =await db.execute(
        "SELECT * FROM users WHERE email = ?", [email]
     );

     if (users.length === 0) {
         return res.status(400).json({ message: "Invalid credentials" });
     }

     const user = users[0];

     const isMatch  = await bcrypt.compare(password, user.password);

     if (!isMatch) {
         return res.status(400).json({ message: "Invalid credentials" });
     }

     //token generation
     const token = generateToken(user);

     res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            role: user.role,
        }
     });
    } catch (error) {
         console.log(error);
        res.status(500).json({ message: "Server error" });
    }
} 

//modify-password

export const modifyPassword = async (req,res)=>{
    try {
        const userId = req.user.id;
        const {oldPassword , newPassword} = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //get user
        const [user] = await db.execute(
            "SELECT password FROM users WHERE id = ?", [userId]
        );

        if (user.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }
        
        //compare old password
        const isMatch = await bcrypt.compare(oldPassword, user[0].password);

        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }


        //hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await db.execute("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, userId]);
        res.json({ message: "Password updated successfully" });
    } catch (error) {
         console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}
