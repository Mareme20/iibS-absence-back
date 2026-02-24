import { Inscription } from "../../entity/Inscription"

export interface IInscriptionRepository {
  create(data: Partial<Inscription>): Promise<Inscription>
  findAll(): Promise<Inscription[]>
  findById(id: number): Promise<Inscription | null>
  findByEtudiant(etudiantId: number): Promise<Inscription[]>
  findByClasse(classeId: number, annee?: string): Promise<Inscription[]>
  findByEtudiantAndAnnee(etudiantId: number, annee: string): Promise<Inscription | null>
  delete(id: number): Promise<void>
}
