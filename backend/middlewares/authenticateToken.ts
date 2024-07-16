import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Try to log in again",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({
        message: "Token has expired please try to log in again",
      });
    }

    req.body.user = user;
    next();
  });
};

export default authenticateToken;
