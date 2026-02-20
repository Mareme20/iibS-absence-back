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

  // src/service/AuthService.ts (Backend)
// Côté Backend (Node.js)
async login(data: LoginDto) {
  const user = await this.userRepository.findByEmail(data.email);

  if (!user || !(await bcrypt.compare(data.password, user.password))) {
    throw new Error("Invalid credentials");
  }

  // On injecte bien le prenom et le role dans le payload du JWT
  const token = jwt.sign(
    { 
      id: user.id, 
      role: user.role, 
      prenom: user.prenom,
      email: user.email 
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  return { 
    token, 
    user: { 
      id: user.id, 
      nom: user.nom, 
      prenom: user.prenom, 
      role: user.role 
    } 
  };
}


}
