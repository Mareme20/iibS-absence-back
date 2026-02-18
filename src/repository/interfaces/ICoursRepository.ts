import { Cours } from "../../entity/Cours"

export interface ICoursRepository {
  create(data: Partial<Cours>): Promise<Cours>
  findAll(): Promise<Cours[]>
}
