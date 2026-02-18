import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne
} from "typeorm"
import { Etudiant } from "./Etudiant"
import { Cours } from "./Cours"
import { Justification } from "./Justification"

@Entity()
export class Absence {

  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: "date" })
  date!: Date

  @Column()
  nombreHeures!: number

  @Column({ default: false })
  estJustifiee!: boolean

  @ManyToOne(() => Etudiant)
  etudiant!: Etudiant

  @ManyToOne(() => Cours)
  cours!: Cours

  @OneToOne(() => Justification, (justification) => justification.absence)
  justification!: Justification
}
