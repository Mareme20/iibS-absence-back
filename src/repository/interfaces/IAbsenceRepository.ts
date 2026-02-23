import { Absence } from "../../entity/Absence";

export interface IAbsenceRepository {
  create(data: Partial<Absence>): Promise<Absence>;
  findAll(): Promise<Absence[]>;
  findById(id: number): Promise<Absence | null>;
  save(absence: Absence): Promise<Absence>;
  update(id: number, data: Partial<Absence>): Promise<Absence>;
  delete(id: number): Promise<void>;
  findByEtudiant(etudiantId: number, date?: string): Promise<Absence[]>;
}
