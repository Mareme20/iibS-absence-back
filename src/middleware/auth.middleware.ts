import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { UserRole } from "../entity/User"

export interface JwtUserPayload {
  id: number
  role: UserRole
  prenom?: string
  email?: string
}

export interface AuthRequest extends Request {
  user?: JwtUserPayload
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtUserPayload
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    })
  }
}
