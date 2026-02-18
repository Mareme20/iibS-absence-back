import { Request, Response } from "express"
import { AuthService } from "../service/AuthService"
import { UserRepository } from "../repository/UserRepository"
import { registerSchema, loginSchema } from "../dto/auth.dto"

const userRepository = new UserRepository()
const authService = new AuthService(userRepository)

export class AuthController {

  static async register(req: Request, res: Response) {
    try {

      const data = registerSchema.parse(req.body)

      const user = await authService.register(data)

      return res.status(201).json({
        success: true,
        data: user
      })

    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }
  }

  static async login(req: Request, res: Response) {
    try {

      const data = loginSchema.parse(req.body)

      const result = await authService.login(data)

      return res.status(200).json({
        success: true,
        data: result
      })

    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }
  }
}
