import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Cours } from "./Cours"

@Entity()
export class Classe {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  libelle!: string

  @Column()
  filiere!: string

  @Column()
  niveau!: string

  @ManyToMany(() => Cours, (cours) => cours.classes)
  cours!: Cours[]
}
