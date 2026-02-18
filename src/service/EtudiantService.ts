import bcrypt from "bcryptjs"
import { AppDataSource } from "../config/data-source"
import { User, UserRole } from "../entity/User"
import { Classe } from "../entity/Classe"
import { Etudiant } from "../entity/Etudiant"
import { Inscription } from "../entity/Inscription"
import { createEtudiantSchema } from "../dto/etudiant.dto"

export class EtudiantService {

  async create(data: any) {

    const userRepo = AppDataSource.getRepository(User)
    const etudiantRepo = AppDataSource.getRepository(Etudiant)

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = userRepo.create({
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      password: hashedPassword,
      role: UserRole.ETUDIANT
    })

    await userRepo.save(user)

    const etudiant = etudiantRepo.create({
      matricule: data.matricule,
      adresse: data.adresse,
      user
    })

    return await etudiantRepo.save(etudiant)
  }

  async inscrire(etudiantId: number, classeId: number, annee: string) {

    const etudiantRepo = AppDataSource.getRepository(Etudiant)
    const classeRepo = AppDataSource.getRepository(Classe)
    const inscriptionRepo = AppDataSource.getRepository(Inscription)

    const etudiant = await etudiantRepo.findOne({ where: { id: etudiantId } })
    const classe = await classeRepo.findOne({ where: { id: classeId } })

    if (!etudiant || !classe) {
      throw new Error("Etudiant or Classe not found")
    }

    const inscription = inscriptionRepo.create({
      etudiant,
      classe,
      annee
    })

    return await inscriptionRepo.save(inscription)
  }
}
