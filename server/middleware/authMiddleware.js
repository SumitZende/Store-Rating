import jwt from 'jsonwebtoken';

//jwt token verification
export const protect = async (req,res,next)=>{
    try {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;

        if(!token){
            return res.status(401).json({ message: "Not authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}

//RBAC

export const authorize = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:"Forbidden"});
        }
        next()
    }
}
