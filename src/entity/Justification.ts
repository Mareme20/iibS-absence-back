import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from "typeorm"
import { Absence } from "./Absence"

export enum StatutJustification {
  EN_ATTENTE = "EN_ATTENTE",
  ACCEPTEE = "ACCEPTEE",
  REFUSEE = "REFUSEE"
}

@Entity()
export class Justification {

  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: "date" })
  date!: Date

  @Column()
  motif!: string

  @Column({
    type: "enum",
    enum: StatutJustification,
    default: StatutJustification.EN_ATTENTE
  })
  statut!: StatutJustification

  @OneToOne(() => Absence)
  @JoinColumn()
  absence!: Absence
}
