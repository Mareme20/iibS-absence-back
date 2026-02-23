import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export enum UserRole {
  RP = "RP",
  PROF = "PROF",
  ATTACHE = "ATTACHE",
  ETUDIANT = "ETUDIANT"
}

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  nom!: string

  @Column()
  prenom!: string

  @Column({ unique: true })
  email!: string

  @Column()
  password!: string

  @Column({
    type: "enum",
    enum: UserRole
  })
  role!: UserRole
}
