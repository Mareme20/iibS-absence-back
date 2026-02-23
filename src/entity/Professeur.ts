import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class Professeur {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  specialite!: string;

  @Column()
  grade!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;
}
