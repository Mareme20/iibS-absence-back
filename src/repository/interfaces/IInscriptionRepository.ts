import { Inscription } from "../../entity/Inscription"

export interface IInscriptionRepository {
  create(data: Partial<Inscription>): Promise<Inscription>
}
