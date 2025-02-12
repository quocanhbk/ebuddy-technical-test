import { NextFunction, Request, Response } from "express";
import { auth } from "../config/firebaseConfig";

export interface AuthRequest extends Request {
  user?: {
    uid: string;
  };
  headers: Request["headers"];
  body: any;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const token = authHeader.split(" ").pop();
    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const decodedToken = await auth.verifyIdToken(token);

    req.user = {
      uid: decodedToken.uid,
    };

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};
