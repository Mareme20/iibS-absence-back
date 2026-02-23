import { Etudiant } from "../../entity/Etudiant";

export interface IEtudiantRepository {
  create(data: Partial<Etudiant>): Promise<Etudiant>;
  findAll(): Promise<Etudiant[]>;
  findById(id: number): Promise<Etudiant | null>;
  findByMatricule(matricule: string): Promise<Etudiant | null>;
  findByUserId(userId: number): Promise<Etudiant | null>;
  update(id: number, data: Partial<Etudiant>): Promise<Etudiant>;
  delete(id: number): Promise<void>;
}
