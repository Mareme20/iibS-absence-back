import { Cours } from "../../entity/Cours";

export interface ICoursRepository {
  create(data: Partial<Cours>): Promise<Cours>;
  findAll(): Promise<Cours[]>;
  findById(id: number): Promise<Cours | null>;
  findByProfesseur(professeurId: number): Promise<Cours[]>;
  findByProfesseurAndDateRange(professeurId: number, dateDebut: Date, dateFin: Date): Promise<Cours[]>;
  update(id: number, data: Partial<Cours>): Promise<Cours>;
  delete(id: number): Promise<void>;
  save(cours: Cours): Promise<Cours>;
}
