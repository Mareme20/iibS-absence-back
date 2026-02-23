import { Inscription } from "../../entity/Inscription"

export interface IInscriptionRepository {
  create(data: Partial<Inscription>): Promise<Inscription>
  findAll(): Promise<Inscription[]>
  findById(id: number): Promise<Inscription | null>
  findByEtudiantAndAnnee(etudiantId: number, annee: string): Promise<Inscription | null>
  delete(id: number): Promise<void>
}
