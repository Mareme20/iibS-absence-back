import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique
} from "typeorm"
import { Etudiant } from "./Etudiant"
import { Classe } from "./Classe"

@Entity()
@Unique(["etudiant", "annee"])
export class Inscription {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  annee!: string

  @ManyToOne(() => Etudiant, (etudiant) => etudiant.inscriptions)
  etudiant!: Etudiant

  @ManyToOne(() => Classe)
  classe!: Classe
}
