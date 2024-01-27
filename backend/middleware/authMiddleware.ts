import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import { RequestWithUser } from "../types";

interface JwtPayload {
  id: string;
}

export const protect = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      // Get user from the token
      req.user = await User.findById(decoded.id);

      next();
    } catch (error: any) {
      console.log(error.message);
      return res.status(401).send("Unauthorized");
    }
  }

  if (!token) {
    return res.status(401).send("Unauthorized, no token");
  }
};
