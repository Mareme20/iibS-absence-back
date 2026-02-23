import { Professeur } from "../../entity/Professeur"

export interface IProfesseurRepository {
  create(data: Partial<Professeur>): Promise<Professeur>
  findAll(): Promise<Professeur[]>
  findById(id: number): Promise<Professeur | null>
  findByUserId(userId: number): Promise<Professeur | null>
  update(id: number, data: Partial<Professeur>): Promise<Professeur>
  delete(id: number): Promise<void>
}
