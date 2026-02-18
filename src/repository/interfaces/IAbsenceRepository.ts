import { Absence } from "../../entity/Absence";

export interface IAbsenceRepository {
  create(data: Partial<Absence>): Promise<Absence>;

  findById(id: number): Promise<Absence | null>;
  save(absence: Absence): Promise<Absence>;
}
