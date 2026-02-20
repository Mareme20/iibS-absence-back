import { Cours } from "../../entity/Cours";

export interface ICoursRepository {
  create(data: Partial<Cours>): Promise<Cours>;
  findAll(): Promise<Cours[]>;
  findById(id: number): Promise<Cours | null>;
  update(id: number, data: Partial<Cours>): Promise<Cours>;
  delete(id: number): Promise<void>;
  save(cours: Cours): Promise<Cours>;
}
