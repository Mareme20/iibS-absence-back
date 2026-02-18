import { Classe } from "../../entity/Classe"

export interface IClasseRepository {
  create(data: Partial<Classe>): Promise<Classe>
  findAll(): Promise<Classe[]>
}
