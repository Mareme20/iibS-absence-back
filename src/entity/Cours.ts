import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable
} from "typeorm"
import { User } from "./User"
import { Classe } from "./Classe"
import { Professeur } from "./Professeur";
@Entity()
export class Cours {

  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: "date" })
  date!: Date

  @Column()
  heureDebut!: string

  @Column()
  heureFin!: string

  @Column()
  semestre!: string

  @Column()
  module!: string

  @ManyToOne(() => Professeur)
 professeur!: Professeur

@ManyToMany(() => Classe, (classe) => classe.cours)
@JoinTable()
classes!: Classe[]
}
