import bcrypt from "bcryptjs";
import { UserRole } from "../entity/User";
import { IProfesseurRepository } from "../repository/interfaces/IProfesseurRepository";
import { IUserRepository } from "../repository/interfaces/IUserRepository";

export class ProfesseurService {
  // Le service dépend uniquement des interfaces (Contrats)
  constructor(
    private professeurRepository: IProfesseurRepository,
    private userRepository: IUserRepository
  ) {}

  async create(data: any) {
    // 1. Vérifier si l'email existe via le UserRepository
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 2. Créer l'utilisateur via le repository
    const user = await this.userRepository.create({
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      password: hashedPassword,
      role: UserRole.PROF
    });

    // 3. Créer le professeur lié via le repository
    return await this.professeurRepository.create({
      specialite: data.specialite,
      grade: data.grade,
      user: user // On passe l'objet user créé
    });
  }

  async findAll() {
    return await this.professeurRepository.findAll();
  }
}
