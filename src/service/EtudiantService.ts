import bcrypt from "bcryptjs";
import { UserRole } from "../entity/User";
import { IEtudiantRepository } from "../repository/interfaces/IEtudiantRepository";
import { IUserRepository } from "../repository/interfaces/IUserRepository";
import { IClasseRepository } from "../repository/interfaces/IClasseRepository";
import { IInscriptionRepository } from "../repository/interfaces/IInscriptionRepository";
import { IAbsenceRepository } from "../repository/interfaces/IAbsenceRepository"; // <--- Import du repo Absence
import { ICoursRepository } from "../repository/interfaces/ICoursRepository";
import { generateUniqueMatricule } from "../utils/matricule";

export class EtudiantService {
  constructor(
    private etudiantRepo: IEtudiantRepository,
    private userRepo: IUserRepository,
    private classeRepo: IClasseRepository,
    private inscriptionRepo: IInscriptionRepository,
    private absenceRepo: IAbsenceRepository, // <--- Injecte le repo Absence ici
    private coursRepo: ICoursRepository
  ) {}

  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const matricule = await generateUniqueMatricule(async (candidate) => {
      const existing = await this.etudiantRepo.findByMatricule(candidate);
      return !!existing;
    });

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
      matricule,
      adresse: data.adresse,
      user: user
    });
  }

  async findAll() {
    return await this.etudiantRepo.findAll();
  }

  async findById(id: number) {
    return await this.etudiantRepo.findById(id);
  }

  async update(id: number, data: any) {
    const etudiant = await this.etudiantRepo.findById(id);
    if (!etudiant) {
      throw new Error("Étudiant non trouvé");
    }

    const payload = { ...data };

    if (!payload.matricule) {
      delete payload.matricule;
    }

    if (!payload.adresse) {
      delete payload.adresse;
    }

    if (payload.matricule) {
      const existing = await this.etudiantRepo.findByMatricule(payload.matricule);
      if (existing && existing.id !== id) {
        throw new Error("Matricule déjà utilisé");
      }
    }

    if (Object.keys(payload).length === 0) {
      return etudiant;
    }

    return await this.etudiantRepo.update(id, payload);
  }

  async delete(id: number) {
    const etudiant = await this.etudiantRepo.findById(id);
    if (!etudiant) {
      throw new Error("Étudiant non trouvé");
    }
    return await this.etudiantRepo.delete(id);
  }

  async inscrire(etudiantId: number, classeId: number, annee: string) {
    this.assertInscriptionPeriodOpen();

    const etudiant = await this.etudiantRepo.findById(etudiantId);
    const classe = await this.classeRepo.findById(classeId);

    if (!etudiant || !classe) {
      throw new Error("Etudiant or Classe not found");
    }

    const existingInscription = await this.inscriptionRepo.findByEtudiantAndAnnee(etudiantId, annee);
    if (existingInscription) {
      throw new Error("Cet étudiant est déjà inscrit pour cette année académique");
    }

    try {
      return await this.inscriptionRepo.create({
        etudiant,
        classe,
        annee
      });
    } catch (error: any) {
      if (error?.code === "23505") {
        throw new Error("Cet étudiant est déjà inscrit pour cette année académique");
      }
      throw error;
    }
  }
  // Dans EtudiantService.ts
 async getMesAbsences(userId: number, date?: string) {
    // 1. On trouve l'étudiant via le UserID du token
    const etudiant = await this.etudiantRepo.findByUserId(userId);
    if (!etudiant) throw new Error("Profil étudiant non trouvé");

    // 2. On appelle le repo Absence pour récupérer les données (Règle l'erreur TS)
    return await this.absenceRepo.findByEtudiant(etudiant.id, date);
  }

  async getMesCours(userId: number, dateDebut?: string, dateFin?: string) {
    const etudiant = await this.etudiantRepo.findByUserId(userId);
    if (!etudiant) {
      throw new Error("Profil étudiant non trouvé");
    }

    const inscriptions = await this.inscriptionRepo.findByEtudiant(etudiant.id);
    const classeIds = new Set(inscriptions.map((inscription) => inscription.classe.id));
    if (classeIds.size === 0) {
      return [];
    }

    const cours = await this.coursRepo.findAll();
    const filtered = cours.filter((c) =>
      (c.classes || []).some((classe) => classeIds.has(classe.id))
    );

    if (!dateDebut && !dateFin) {
      return filtered;
    }

    const start = dateDebut ? new Date(dateDebut) : undefined;
    const end = dateFin ? new Date(dateFin) : undefined;
    return filtered.filter((c) => {
      const d = new Date(c.date);
      if (start && d < start) return false;
      if (end && d > end) return false;
      return true;
    });
  }

  private assertInscriptionPeriodOpen() {
    const startRaw = process.env.INSCRIPTION_START_DATE;
    const endRaw = process.env.INSCRIPTION_END_DATE;

    // If no period is configured, keep legacy behavior.
    if (!startRaw || !endRaw) {
      return;
    }

    const start = new Date(startRaw);
    const end = new Date(endRaw);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new Error("Configuration période d'inscription invalide (INSCRIPTION_START_DATE / INSCRIPTION_END_DATE)");
    }

    const now = new Date();
    if (now < start || now > end) {
      throw new Error("La période d'inscription est fermée");
    }
  }

}
