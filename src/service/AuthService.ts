import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { IUserRepository } from "../repository/interfaces/IUserRepository"
import { RegisterDto, LoginDto } from "../dto/auth.dto"
import { User } from "../entity/User"

export class AuthService {

  constructor(private userRepository: IUserRepository) {}

  async register(data: RegisterDto): Promise<User> {

    const existingUser = await this.userRepository.findByEmail(data.email)

    if (existingUser) {
      throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword
    })

    return user
  }

  async login(data: LoginDto) {

    const user = await this.userRepository.findByEmail(data.email)

    if (!user) {
      throw new Error("Invalid credentials")
    }

    const isValid = await bcrypt.compare(data.password, user.password)

    if (!isValid) {
      throw new Error("Invalid credentials")
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    )

    return { token }
  }
}
