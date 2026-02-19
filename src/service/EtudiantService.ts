import bcrypt from "bcryptjs";
import { UserRole } from "../entity/User";
import { IEtudiantRepository } from "../repository/interfaces/IEtudiantRepository";
import { IUserRepository } from "../repository/interfaces/IUserRepository";
import { IClasseRepository } from "../repository/interfaces/IClasseRepository";
import { IInscriptionRepository } from "../repository/interfaces/IInscriptionRepository";
import { IAbsenceRepository } from "../repository/interfaces/IAbsenceRepository"; // <--- Import du repo Absence

export class EtudiantService {
  constructor(
    private etudiantRepo: IEtudiantRepository,
    private userRepo: IUserRepository,
    private classeRepo: IClasseRepository,
    private inscriptionRepo: IInscriptionRepository,
    private absenceRepo: IAbsenceRepository // <--- Injecte le repo Absence ici
  ) {}

  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 1. Créer l'utilisateur d'abord
    const user = await this.userRepo.create({
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      password: hashedPassword,
      role: UserRole.ETUDIANT
    });

    // 2. Créer l'étudiant lié à l'utilisateur
    return await this.etudiantRepo.create({
      matricule: data.matricule,
      adresse: data.adresse,
      user: user
    });
  }

  async inscrire(etudiantId: number, classeId: number, annee: string) {
    const etudiant = await this.etudiantRepo.findById(etudiantId);
    const classe = await this.classeRepo.findById(classeId);

    if (!etudiant || !classe) {
      throw new Error("Etudiant or Classe not found");
    }

    return await this.inscriptionRepo.create({
      etudiant,
      classe,
      annee
    });
  }
  // Dans EtudiantService.ts
 async getMesAbsences(userId: number, date?: string) {
    // 1. On trouve l'étudiant via le UserID du token
    const etudiant = await this.etudiantRepo.findByUserId(userId);
    if (!etudiant) throw new Error("Profil étudiant non trouvé");

    // 2. On appelle le repo Absence pour récupérer les données (Règle l'erreur TS)
    return await this.absenceRepo.findByEtudiant(etudiant.id, date);
  }

}
