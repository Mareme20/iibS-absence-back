import { Justification, StatutJustification } from "../../entity/Justification";

export interface IJustificationRepository {
  create(data: Partial<Justification>): Promise<Justification>;
  save(justification: Justification): Promise<Justification>;
  findAll(): Promise<Justification[]>;
  findById(id: number): Promise<Justification | null>;
  update(id: number, data: Partial<Justification>): Promise<Justification>;
  delete(id: number): Promise<void>;
  findByEtudiant(etudiantId: number): Promise<Justification[]>;
  findByEtudiantAndFilters(
    etudiantId: number, 
    dateDebut?: Date, 
    dateFin?: Date, 
    statut?: string
  ): Promise<Justification[]>;
}
