import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany
} from "typeorm"
import { User } from "./User"
import { Inscription } from "./Inscription"

@Entity()
export class Etudiant {

  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  matricule!: string

  @Column()
  adresse!: string

  @OneToOne(() => User)
  @JoinColumn()
  user!: User

  @OneToMany(() => Inscription, (inscription) => inscription.etudiant)
  inscriptions!: Inscription[]
}
