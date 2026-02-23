import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { IUserRepository } from "../repository/interfaces/IUserRepository"
import { RegisterDto, LoginDto } from "../dto/auth.dto"
import { User, UserRole } from "../entity/User"
import { AppDataSource } from "../config/data-source"
import { Etudiant } from "../entity/Etudiant"
import { generateUniqueMatricule } from "../utils/matricule"

export class AuthService {

  constructor(private userRepository: IUserRepository) {}

  async register(data: RegisterDto): Promise<User> {

    const existingUser = await this.userRepository.findByEmail(data.email)

    if (existingUser) {
      throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await AppDataSource.transaction(async (manager) => {
      const userRepo = manager.getRepository(User)
      const etudiantRepo = manager.getRepository(Etudiant)

      const createdUser = userRepo.create({
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        password: hashedPassword,
        role: data.role
      })

      const savedUser = await userRepo.save(createdUser)

      if (data.role === UserRole.ETUDIANT) {
        const matricule = await generateUniqueMatricule(async (candidate) => {
          const existing = await etudiantRepo.findOne({ where: { matricule: candidate } })
          return !!existing
        })

        const etudiant = etudiantRepo.create({
          matricule,
          adresse: data.adresse!,
          user: savedUser
        })
        await etudiantRepo.save(etudiant)
      }

      return savedUser
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
  success: true,
  data: {
    token,
    user: {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      role: user.role
    }
  }
};

}


}
